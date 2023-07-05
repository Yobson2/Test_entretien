const express=require('express');
const session=require('express-session');
const routers=require('./Controlllers/route');
require('dotenv').config()
const port=process.env.PORT;
const bodyParser=require('body-parser');


///init application
const app= express();

// View engine setup
app.set('view engine', 'ejs');

/* */
app.use('/static', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }))


/* Without middleware */

//test page app
app.use('/',routers)


//Port de lecture

app.listen(port, ()=> console.log(`server listening on ${port}`))