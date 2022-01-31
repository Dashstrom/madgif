
from PIL import Image
from flask import Flask

from .utils import pil

app = Flask(__name__)


@app.route("/")
def main():
    return {'test': 2}


@app.route("/img")
def img():
    img = Image.new("RGB", (128, 128), "red")
    return pil(img, "image/png", "png")


if __name__ == "__main__":
    app.run(debug=True)