const express = require ('express');
const path = require ('path');
const morgan = require('morgan');
const mysql = require('mysql');
const myConnection = require('express-myconnection');

const app = express();

// **********BOT***********
// const bodyParser = require('body-parser');
// const { request } = require('http');
// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended:true }));



// app.post('/inbound', function(request,response){
//     console.log(request.body.text)
//     response.send('ok')

//     const accountSid = 'AC1bcbc4111b7dae03a59d57750c6c94a8';
//     const authToken = '5f7a9668cff667b9c181f879d964bbf7';
//     const client = require('twilio')(accountSid, authToken);   

//      client.messages
//     .create({
//         body: request.body.text,
//         from: '+17203403778',
//         to: '+50688789564'
//     })
// })

// app.post('/status', function(request,response){
//     console.log(request.body.text)
//     response.send('ok')
// })

// app.listen(3000)

// importing routes  **********
const indexRoutes = require('./routes/index');
const productRoutes = require('./routes/product');
const sizesRoutes = require('./routes/sizes');
const typeRoutes = require('./routes/type')
const insertProductRoutes = require('./routes/insertProduct')
const catalogueRoutes = require('./routes/catalogue')
const messageRoutes = require('./routes/message')
const insertCatalogueRoutes = require('./routes/insertCatalogue')

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
app.use('/insertProduct',insertProductRoutes)
app.use('/catalogue',catalogueRoutes)
app.use('/message',messageRoutes)
app.use('/insertCatalogue',insertCatalogueRoutes)

// static files  **********
app.use(express.static(path.join(__dirname, 'public')));


// starting the server
app.listen(app.get('port'), ()=>{
    console.log('Server on port');
});