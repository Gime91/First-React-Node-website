const express = require('express');
const app = express();
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

const connection = mysql.createConnection({
    host: 'localhost', // Az adatbázis szerver helye (localhost, ha helyben fut)
    user: 'root', // Az adatbázis felhasználóneve
    password: '', // Az adatbázis jelszava
    database: 'users_db' // Az adatbázis neve
  });

function checkIfUserExists(username, email, callback) {
    // Lekérdezés az adatbázisból a felhasználónév és az email alapján
    const query = `SELECT * FROM users WHERE user_name = '${username}' OR email = '${email}'`;
  
    // Futtatjuk a lekérdezést
    connection.query(query, (err, rows) => {
      if (err) {
        console.log('Hiba történt a lekérdezés során:', err);
        return callback(err, null);
      }
  
      // Ellenőrizzük, hogy van-e eredmény a lekérdezésben
      if (rows.length > 0) {
        return callback(null, true);
      } else {
        return callback(null, false);
      }
    });
}

  
app.post('/register', (req, res) => {
  const username = req.body.username;
  const email = req.body.email;
  const password = req.body.password;
  const sqlInsert = `INSERT INTO users (user_name, email, password) VALUES ('${username}','${email}','${password}');`

  checkIfUserExists(username, email, (err, userExists) => {
    if (err) {
      console.log('Hiba történt a regisztráció során.', err);
      return res.status(500).json({ error: 'Hiba történt a regisztráció során.' });
    }

    if (userExists) {
      console.log('A felhasználónév vagy az email már foglalt!', err);
      return res.status(400).json({ error: 'A felhasználónév vagy az email már foglalt!' });
    }

    connection.query(sqlInsert, (err, result) => {
      if (err) {
        console.log('Hiba történt a regisztráció során:', err);
        return res.status(500).json({ error: 'Hiba történt a regisztráció során.' });
      }

      res.status(200).json({ message: 'Successful registration!' });
    });
  });
});

app.post('/login', (req,res) =>{
    const username = req.body.username;
    const password = req.body.password;

    const sqlCheck = `SELECT * FROM users WHERE user_name = '${username}' AND password = '${password}';`

    connection.query(sqlCheck, (err, result) => {
      if (err) {
        console.log('Hiba történt a lekérdezés során:', err);
        return res.status(500).json({ error: 'Hiba történt a lekérdezés során:' });
      }
      if (result.length === 0) {
        console.log('Hibás felhasználónév vagy jelszó.', err);
        return res.status(400).json({ error: 'Hibás felhasználónév vagy jelszó.' });
      }
      // Sikeres bejelentkezés
      res.status(200).json({ message: 'Sikeres bejelentkezés!' });
    })
})

app.listen(port, () => {
  console.log(`A szerver fut a http://localhost:3001 címen.`);
});