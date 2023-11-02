const controller = {};

controller.all = (req, res) =>{
    let p;
    let pr;
    let count;
    req.getConnection((err, conn)=> {
        conn.query('SELECT id FROM product', (err, products) =>{
            if(err){
                res.json(err);
            }else{
                p = products
                console.log(p[1].id + "  ->  Numero del id");
                console.log(p);
                // res.render('index', {
                //     data: products
                // });
                conn.query("SELECT COUNT(id) AS 'Counts' FROM product", (err, counts) =>{
                    if(err){
                        res.json(err);
                    }else{
                        count = counts[0].Counts
                        console.log(count + "  ->  Count desde la base de datos");
                    }
                });


                // for(var i = 0;i<count;i++){
                    conn.query("SELECT product.id AS 'id_product', url, name, description, price FROM img INNER JOIN product ON img.id_product = product.id WHERE product.id = ? LIMIT 1",[1], (err, products) =>{
                        if(err){
                            res.json(err);
                        }else{
                            console.log(products);
                            // pr[i]=products;
                            // console.log(pr);  
                        }   
                        res.render('index', {
                            data: products
                        });
                    });
                // }



            }
        });
    });
};



module.exports = controller;