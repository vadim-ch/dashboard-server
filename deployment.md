##Установка зависимостей на удалённую тачку
```
sudo apt-get update
sudo apt-get install nginx git build-essential libssl-dev curl vim python2.7 python-pip
curl -sL https://raw.githubusercontent.com/creationix/nvm/v0.31.0/install.sh -o install_nvm.sh
bash install_nvm.sh
nvm install stable
npm install pm2 -g
```

####Установка БД
https://www.digitalocean.com/community/tutorials/postgresql-ubuntu-16-04-ru

####Установка node.js
https://www.digitalocean.com/community/tutorials/node-js-ubuntu-16-04-ru

После установки заходиим в папку с проектом и вводим:
```
npm install
npm run start
```

Проект развёрнётся на 0.0.0.0:3000


Облачная база
https://customer.elephantsql.com/instance

Генерация секрета
node -e "console.log(require('crypto').randomBytes(256).toString('base64'));"
