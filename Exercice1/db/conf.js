const mysql = require('mysql');

const connexion=mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_test_user'
    
})

connexion.connect((err)=>{
    if (err) {
        return console.error('error: ' + err.message);
      }
    
      console.log('Connected to the MySQL server.');
})

module.exports=connexion