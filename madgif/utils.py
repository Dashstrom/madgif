from io import BytesIO
from typing import Any, Optional
from PIL import Image
from flask import send_file


def pil(
    pil_img: Image.Image,  
    mime: str,
    format: Optional[str] = ...,
    **params: Any
):
    """Serve a Image file."""
    img_io = BytesIO()
    pil_img.save(img_io, format, **params)
    img_io.seek(0)
    return send_file(img_io, mimetype=mime)
