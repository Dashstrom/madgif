import io
import PIL.Image


TYPES = {
    "gif": "image/gif",
    "png": "image/png",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg"
}


def img2io(img: PIL.Image.Image, ext: str = "png"):
    img_io = io.BytesIO()
    img.save(img_io, ext)
    img_io.seek(0)
    return img_io


def b2img(data: bytes) -> PIL.Image.Image:
    img_io = io.BytesIO(data)
    return PIL.Image.open(img_io)


def extension(filename: str) -> str:
    if '.' not in filename:
        return ""
    return filename.rsplit('.', 1)[1].lower()


def allowed_file(filename: str) -> bool:
    return extension(filename) in TYPES


def filename_to_minetype(filename: str) -> str:
    return TYPES.get(extension(filename), "image/png")
