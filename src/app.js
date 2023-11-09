const express = require ('express');
const path = require ('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// importing routes  **********
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/product');
const sizesRoutes = require('./routes/sizes');
const typeRoutes = require('./routes/type')
const insertProduct = require('./routes/insertProduct')
const catalogue = require('./routes/catalogue')


// setting
app.set('port', process.env.PORT || 3000);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname,'views'));

// middlewares
app.use(morgan('dev'));
app.use(myConnection(mysql,{
    host: 'localhost',
    user: 'root',
    password: 'root123',
    port: 3306,
    database: 'graysports'
}, 'single'));
app.use(express.urlencoded({extended: false}));


// routes  **********
app.use('/',indexRoutes);
app.use('/product',productRoutes)
app.use('/sizes',sizesRoutes)
app.use('/type',typeRoutes)
app.use('/insertProduct',insertProduct)
app.use('/catalogue',catalogue)


// static files  **********
app.use(express.static(path.join(__dirname, 'public')));


// starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port');
});