
## Run
Download project
```sh
git clone https://github.com/Dashstrom/madgif.git
cd madgif
```

## Commands
- `export FLASK_ENV=development`: Set debug mod
- `flask run`: Run the api
- `ng serve`: Run the frontend

## Install MySQL
```sh
sudo apt update
sudo apt install mysql-server php*-mysql

mysql --version
sudo /etc/init.d/mysql restart
sudo mysql_secure_installation
sudo mysql

CREATE USER 'madgif'@'localhost' IDENTIFIED BY 'madgif';
CREATE DATABASE madgif;
GRANT ALL PRIVILEGES ON madgif.* TO 'madgif'@'localhost';
FLUSH PRIVILEGES;
\q

mysql -u madgif -pmadgif -h localhost -P 3306 -D madgif

SELECT USER();
\q

make install
```
