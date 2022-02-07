from io import BytesIO
import requests
from PIL import Image


URL = "http://127.0.0.1:5000/"
with requests.Session() as s:
    s.post(URL + "auth/register", json={
        "password": "admin",
        "username": "admin"
    })

    res = s.post(URL + "auth/login", json={
        "password": "admin",
        "username": "admin"
    })
    print(res.text)
    token = res.json()["token"]
    s.headers.update({"x-access-tokens": token})

    res = s.get(URL + "images")
    print(res.text)

    img = Image.new("RGBA", (128, 128), "red")
    img_io = BytesIO()
    img.save(img_io, "png")
    img_io.seek(0)
    res = s.post(
        url=URL + "images",
        files={"file": ("test.png", img_io.read(), "image/png")}
    )
    print(res.text)
    iid = res.json()['public_id']

    res = s.get(URL + "images/" + iid)
    print(res.text)

    res = s.delete(URL + "images/" + iid)
    print(res.text)
