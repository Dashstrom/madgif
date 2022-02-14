
## Run
Download project
```sh
git clone https://github.com/Dashstrom/madgif.git
cd madgif
```

## Commands
- `sudo npm install --save @angular/material@7 @angular/cdk@7 @angular/animations@7`
- `export FLASK_ENV=development`: Set debug mod
- `flask run`: Run the api
- `flask db init`: init database
- `flask db migrate`: Create migration
- `flask db upgrade`: Apply migration
- `npm rebuild node-sass`: In case of `Node Sass does not yet support your current environment`
- `export NODE_OPTIONS=--openssl-legacy-provider`: In case of `Error: error:0308010C:digital envelope routines::unsupported`
- `ng serve`: Run the frontend

## Install MySQL
```sh
sudo apt update
sudo apt install mysql-server libmysqlclient-dev
# sudo apt install mysql-server libmariadbclient-dev

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

mysql -u madgif -pmadgif -h localhost -P 3306 -D madgif < madgif/static/schema.sql

make install
```
