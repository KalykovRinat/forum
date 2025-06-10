const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'kalykov0755',
  database: 'minecraft_forum'
});

db.connect(err => {
  if (err) {
    console.error('Ошибка подключения к БД:', err);
  } else {
    console.log('База данных подключена');
  }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  db.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      return res.status(500).json({ message: 'Ошибка сервера' });
    }
    if (results.length > 0) {
      res.json({ message: 'Успешный вход' });
    } else {
      res.status(401).json({ message: 'Неверный логин или пароль' });
    }
  });
});

app.listen(port, () => {
  console.log(`Сервер запущен: http://localhost:${port}`);
});
