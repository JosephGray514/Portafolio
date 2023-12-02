const controller = {};

// const accountSid = 'AC1bcbc4111b7dae03a59d57750c6c94a8';
//     const authToken = '5f7a9668cff667b9c181f879d964bbf7';
//     const client = require('twilio')(accountSid, authToken);    
var i = 0;
controller.send = (req, res) =>{

    console.log('sdadsda')
    
    // if (i < 1) {
    //     res.redirect('/message');
    //     i++;
    // }
    
    // client.messages
    // .create({
    //     body: 'TEST X FROM TWILIO WEBSITE',
    //     from: '+17203403778',
    //     to: '+50688789564'
    // })
    // .then(message => console.log(message.sid))
    // .done();

};
  

    


module.exports = controller;