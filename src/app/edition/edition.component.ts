import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  QueryList,
  SecurityContext,
  ViewChild,
  ViewChildren,
} from "@angular/core";
import { DomSanitizer, SafeUrl } from "@angular/platform-browser";
import { ActivatedRoute } from "@angular/router";
import { Observable } from "rxjs";
import { flatMap, map } from "rxjs/operators";
import { ImagesService } from "../services/images.service";
import { saveAs } from "file-saver";

const NOTHING = 0;
const ROTATE = 1;
const MOVE = 2;
const CROP_NW = 3;
const CROP_SE = 4;

@Component({
  selector: "app-edition",
  templateUrl: "./edition.component.html",
  styleUrls: ["./edition.component.scss"],
})
export class EditionComponent implements OnInit {
  iid: string | null;
  src: SafeUrl | undefined;

  @ViewChild("canvas") canvas: ElementRef;
  @ViewChildren("target") imgs: QueryList<ElementRef>;
  img: ElementRef;

  pressed: boolean = false;
  px: number;
  py: number;

  cropX: number = 0;
  cropY: number = 0;
  cropW: number = undefined;
  cropH: number = undefined;
  x: number = 40;
  y: number = 40;
  w: number = undefined;
  h: number = undefined;
  zoom: number = 1.0;
  rotate: number = 0.0;

  keyState: number = NOTHING;

  private uploadObservable(): Observable<any> {
    if (!this.iid)
      return new Observable((o) => {
        o.error({ status: 404, msg: "idd missing" });
        o.complete();
      });
    return this.images
      .editImage(this.iid, {
        w: +this.w,
        h: +this.h,
        rotate: +this.rotate,
        cropX: +this.cropX,
        cropY: +this.cropY,
        cropH: +this.cropH,
        cropW: +this.cropW,
      })
      .pipe(
        flatMap(() => {
          return this.images.urlRawImageById(this.iid);
        }),
        map((url) => {
          this.src = url;
          this.x += +this.cropX;
          this.y += +this.cropY;
          this.w = +this.cropW;
          this.h = +this.cropH;
          this.cropX = 0;
          this.cropY = 0;
          this.rotate = 0;
          return url;
        })
      );
  }

  upload(): void {
    this.uploadObservable().subscribe();
  }

  download() {
    if (!this.iid) return;
    this.uploadObservable().subscribe((url) => {
      this.images.getImageById(this.iid).subscribe((res) => {
        const src = this.sanitizer.sanitize(SecurityContext.URL, url);
        saveAs(src, res["name"]);
      }, console.error);
    }, console.error);
  }

  constructor(
    private route: ActivatedRoute,
    public images: ImagesService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.params["id"];
    if (id) {
      this.iid = id;
      this.images.urlRawImageById(this.iid).subscribe((url) => {
        this.src = url;
        this.imgs.changes.subscribe((imgs: QueryList<ElementRef>) => {
          this.img = imgs.first;
          console.log(this.img);
          setTimeout(() => this.onImg(), 250); // TODO: find a beter way
        });
      }, console.error);
    }
  }

  onImg() {
    this.cropW = this.w = this.img.nativeElement.width;
    this.cropH = this.h = this.img.nativeElement.height;
    this.px = this.img.nativeElement.pageX;
    this.py = this.img.nativeElement.pageY;
  }

  onMouseWheel(event: WheelEvent) {
    const delta = (event.deltaY + event.deltaX + event.deltaZ) / 100;
    const multi = delta < 0 ? 4 / 3 : delta == 0 ? 1 : 3 / 4;
    const w = this.w * this.zoom;
    const h = this.h * this.zoom;
    this.x = Math.round(this.x - (w * multi - w) / 2);
    this.y = Math.round(this.y - (h * multi - h) / 2);
    this.zoom = this.zoom * multi;
    event.stopImmediatePropagation();
  }

  @HostListener("document:mousemove", ["$event"])
  onMouseMoveCanvas(event: MouseEvent | PointerEvent) {
    if (!this.pressed) return;

    const dx = event.pageX - this.px;
    const dy = event.pageY - this.py;
    const dxz = dx / this.zoom;
    const dyz = dy / this.zoom;
    const img = this.img.nativeElement;

    switch (this.keyState) {
      case MOVE: {
        this.x += dx;
        this.y += dy;
        break;
      }
      case CROP_NW: {
        this.cropX += dxz;
        this.cropY += dyz;
        this.cropW -= dxz;
        this.cropH -= dyz;
        // overflow
        if (this.cropW < 0) {
          this.cropX += this.cropW;
          this.cropW = 0;
        }
        if (this.cropH < 0) {
          this.cropY += this.cropH;
          this.cropH = 0;
        }
        break;
      }
      case CROP_SE: {
        this.cropW += dxz;
        this.cropH += dyz;
        // overflow
        if (this.cropW < 0) this.cropW = 0;
        if (this.cropH < 0) this.cropH = 0;
        break;
      }
      case ROTATE: {
        const { x, y } = this.getPosition();
        const centerX = x + img.width / 2;
        const centerY = y + img.height / 2;
        const dxc = event.pageX - centerX;
        const dyc = event.pageY - centerY;
        let thetaCorner =
          Math.atan2(img.height / 2, img.width / 2) * (180 / Math.PI);
        let theta = -(Math.atan2(dyc, dxc) * (180 / Math.PI) + thetaCorner);
        if (theta < 0) theta += 360;
        this.rotate = Math.round(theta);
        break;
      }
    }

    this.px = event.pageX;
    this.py = event.pageY;
    this.rotate = Math.round(this.rotate);
    this.cropX = Math.round(this.cropX);
    this.cropY = Math.round(this.cropY);
    this.cropW = Math.round(this.cropW);
    this.cropH = Math.round(this.cropH);
  }

  onMouseUp(event: MouseEvent) {
    this.pressed = false;
  }

  onMouseDownCanvas(event: MouseEvent) {
    this.down(event, MOVE);
  }

  private down(event: MouseEvent, keyState: number = NOTHING) {
    this.pressed = true;
    this.px = event.pageX;
    this.py = event.pageY;
    this.keyState = keyState;
    event.stopImmediatePropagation();
  }

  nwCrop(event: MouseEvent) {
    this.down(event, CROP_NW);
  }

  seCrop(event: MouseEvent) {
    this.down(event, CROP_SE);
  }

  onRotate(event: MouseEvent) {
    this.down(event, ROTATE);
  }

  getPosition() {
    let offsetLeft = 0;
    let offsetTop = 0;
    let el = this.img.nativeElement;
    while (el) {
      offsetLeft += el.offsetLeft;
      offsetTop += el.offsetTop;
      el = el.offsetParent;
    }
    return { x: offsetLeft, y: offsetTop };
  }
}
