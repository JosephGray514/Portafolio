const controller = {};

controller.insert = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO type set ?', [data], (err, types) => {
            if(err){
                res.json(err);
            }else{
                console.log("Respuesta del INSERT \n"+ types);
                console.log(types);
                res.redirect('/type');
            }
        });
    });
};

controller.select = (req, res)=>{
    let s;
    let t;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM type', (err, types) =>{
            if(err){
                res.json(err);
            }
            t = types
            console.log(t);
            res.render('type', {
                data: t
            })
        });
    });
};

module.exports = controller;