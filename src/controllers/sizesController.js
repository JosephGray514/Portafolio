const controller = {};

controller.insert = (req, res) => {
    const data = req.body;
    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO sizes set ?', [req.body], (err, sizes) => {
            if(err){
                res.json(err);
            }else{
                console.log(sizes);
                res.redirect('/sizes');
            }
        });
    });
};

controller.select = (req, res)=>{
    let s;
    let t;
    req.getConnection((err, conn)=>{
        conn.query('SELECT sizes.id, size, name FROM sizes INNER JOIN type ON sizes.id_type = type.id', (err, sizes) =>{
            if(err){
                res.json(err);
            }
            s = sizes
            console.log(s);
            // res.render('sizes', {
            //     data: sizes
            // })
        });

        conn.query('SELECT id, name FROM type', (err, types) =>{
            if(err){
                res.json(err);
            }
            t = types
            console.log(t);
            res.render('sizes', {
                data: {
                    s: s,
                    t: t
                }
            })
        });
    });
};

module.exports = controller;