const express=require('express');
const db=require('../db/conf')

const routers=express.Router();

// rooters pages
routers.get('/',(req,res)=>res.render('home'))
routers.get('/connexion',(req,res)=>res.render('connexion'))
routers.get('/inscription',(req,res)=>res.render('inscription',{ result:{} }))

// routers.get('/listesUsers',(req,res)=>res.render('vueUsers'))


// Mes operations

routers.post('/inscription',(req,res)=>{
    console.log(req.body)
    const sql='INSERT INTO users SET ?'
      db.query(sql,req.body,(err,rs)=>{
          if (err) {
              return console.error('error: ' + err.message);
            }     
            console.log('Succed ');
            res.redirect('/')
      })
  })
  
  routers.get('/listesUsers',(req,res)=>{
    const sql='SELECT * FROM users';

    db.query(sql,[],(err,rs)=>{
        // console.log(rs,'reponse')
        if (err) {
            return console.error('error: ' + err.message);
          }     
        //   console.log('all data returned');
          res.render('vueUsers',{ data:rs});
    })
})


// test de connection
routers.post('/connexion', (req, res) => {
    const tel = req.body.Telephone;
    let telAllUser = [];

    const sql = 'SELECT * FROM users';
    db.query(sql, [], (err, rs) => {
        if (err) {
            console.log(err);
            return res.status(500).send('Erreur de base de données');
        }

        telAllUser = rs.filter(user => user.Telephone === tel);
        console.log('telAllUser', telAllUser);

        if (telAllUser.length > 0) {
            // Le numéro de téléphone correspond à un utilisateur dans la base de données
            res.redirect(`/users/${telAllUser[0].id_user}`);
            console.log('Connexion réussie !!!!!!!!!');
        } else {
            console.log('Erreur de connexion');
            res.status(401).send('Erreur de connexion');
        }
    });
});
routers.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const sql = 'SELECT * FROM users WHERE id_user = ?';

    db.query(sql, [id], (err, rs) => {
        if (err) {
            return console.error('error: ' + err.message);
        }
        res.render('espaceUser', { data: rs });
    });
});



routers.get('/users/delete/:id', (req, res) => {
    const reqSql = 'DELETE FROM users WHERE id_user = ?';
    const userId = req.params.id;
    
    console.log('ide 22',userId)
    db.query(reqSql, [userId], (err, result) => {
      if (err) {
        console.error('Error: ' + err.message);
      } else {
        console.log('Data deleted successfully');
        res.redirect('/');
      }
    });
  });

  routers.get('/users/edite/:id', (req, res) => {
    const reqSql = 'SELECT * FROM users WHERE id_user = ?';
    const userId = req.params.id;
    db.query(reqSql, [userId], (err, result) => {
      if (err) {
        console.error('Error: ' + err.message);
      } else {
        console.log('Data retrieved successfully');
        res.render('inscription', { result: result[0] });
      }
    });
  });
  routers.post('/users/edite/:id', (req, res) => {
    const reqSql = 'UPDATE users SET ? WHERE id_user = ?';
    const params = [
      req.body,
      req.params.id
    ];
    db.query(reqSql, params, (err, result) => {
      if (err) {
        console.error('Error: ' + err.message);
      } else {
        console.log('Update successful');
        res.redirect(`/users/${params[1]}`);
      }
    });
  });

module.exports=routers