import requests


res = requests.post("http://127.0.0.1:5000//auth/register", data={
    "password": "admin",
    "username": "admin"
})

print(res.headers)
print(res.text)
