const controller = {};

controller.select = (req, res) =>{
    req.getConnection((err, conn)=> {
        conn.query('SELECT * FROM catalogue', (err, catalogue) =>{
            if(err){
                res.json(err);
            }else{
                res.render('insertCatalogue', {
                    data: catalogue
                });
            }
        });
    });
};

controller.insert = (req, res) =>{
    console.log('Catalogue')

    image = req.file.buffer.toString('base64')
    name = req.body.name

    console.log(name)
    console.log(image)

    req.getConnection((err, conn)=> {
        conn.query('INSERT INTO catalogue (name,imgURL) VALUES(?,?)', [name,image], (err, catalogue) =>{
            
            if(err){
                res.json(err);
            }else{
                
                res.redirect('/insertCatalogue')
            
            }
        });
    });
};


module.exports = controller;