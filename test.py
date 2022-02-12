from io import BytesIO
from typing import Any
from pprint import pprint
import requests
from PIL import Image


URL = "http://127.0.0.1:5000/"


def post_image(s: requests.Session, img: Image.Image, name: str) -> str:
    img = Image.new("RGBA", (128, 128), "red")
    img_io = BytesIO()
    img.save(img_io, "png")
    img_io.seek(0)
    res = s.post(
        url=URL + "images",
        files={"file": (name, img_io.read(), "image/png")}
    )
    iid = res.json()['public_id']
    return iid


def register(s: requests.Session, username: str, password: str) -> None:
    s.post(URL + "auth/register", json={
        "password": password,
        "username": username
    })


def login(s: requests.Session, username: str, password: str) -> str:
    res = s.post(URL + "auth/login", json={
        "password": username,
        "username": password
    })
    token = res.json()["token"]
    s.headers.update({"x-access-tokens": token})
    return token


def get_images(s: requests.Session) -> dict[str, Any]:
    res = s.get(URL + "images")
    return res.json()


def get_image(s: requests.Session, iid: str) -> dict[str, Any]:
    res = s.get(URL + "images/" + iid)
    return res.json()


def delete_image(s: requests.Session, iid: str) -> dict[str, Any]:
    res = s.delete(URL + "images/" + iid)
    return res.json()


def main() -> None:
    with requests.Session() as s:
        register(s, "admin", "admin")
        pprint(login(s, "admin", "admin"))
        pprint(get_images(s))
        iid = post_image(s, Image.new("RGBA", (128, 128), "red"), "test.png")
        pprint(get_image(s, iid))
        pprint(delete_image(s, iid))


if __name__ == "__main__":
    main()
