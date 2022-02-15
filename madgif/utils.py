import io
from typing import Any
import PIL.Image


TYPES = {
    "gif": "image/gif",
    "png": "image/png",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg"
}

TYPES_ALIAS = {
    "jpg": "jpeg"
}


def img2io(frames: list[PIL.Image.Image], ext: str = "png", info: dict = None):
    info = info or {}
    info.pop("format", None)
    info.pop("save_all", None)
    info.pop("append_images", None)
    img_io = io.BytesIO()
    frames[0].save(
        img_io,
        ext,
        save_all=True,
        append_images=frames[1:],
        **info
    )
    img_io.seek(0)
    return img_io


def b2img(data: bytes) -> PIL.Image.Image:
    img_io = io.BytesIO(data)
    return PIL.Image.open(img_io)


def extension(filename: str) -> str:
    if '.' not in filename:
        return ""
    ext = filename.rsplit('.', 1)[1].lower()
    return TYPES_ALIAS.get(ext, ext)


def allowed_file(filename: str) -> bool:
    return extension(filename) in TYPES


def filename_to_minetype(filename: str) -> str:
    return TYPES.get(extension(filename), "image/png")
