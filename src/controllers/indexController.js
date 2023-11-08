const controller = {};

controller.all = (req, res) =>{
    let p;
    let pr;
    let count;
    req.getConnection((err, conn)=> {
        conn.query('SELECT * FROM product', (err, products) =>{
            if(err){
                res.json(err);
            }else{
                console.log(products)

                res.render('index', {
                    data: products
                });
            }
        });
    });
};


module.exports = controller;