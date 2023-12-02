const controller = {};

controller.info = (req, res) =>{
    const id = req.params.id;
    let p;
    let i;
    let s;
    let rp;
    req.getConnection((err, conn)=> {
        conn.query('SELECT * FROM product WHERE id = ?',[id], (err, products) =>{
            if(err){
                res.json(err);
            }else{
                p = products;
                console.log(p);
                // res.render('product', {
                //     data: products
                // });
            }
        });

        conn.query('SELECT url FROM img WHERE id_product = ?',[id], (err, imgs) =>{
            if(err){
                res.json(err);
            }else{
                i = imgs
                console.log(i);
            }
        });

        conn.query('SELECT sizes.size FROM product INNER JOIN product_sizes ON product.id = product_sizes.id_product INNER JOIN sizes ON product_sizes.id_sizes = sizes.id WHERE product.id = ?',[id], (err, sizes) =>{
            if(err){
                res.json(err);
            }else{
                s = sizes
                console.log(s);
            }
        });
        
        conn.query('SELECT p.id, name, description, price, MAX(url) AS url FROM product AS p INNER JOIN img AS i ON p.id = i.id_product GROUP BY p.id, name, description, price ORDER BY RAND() LIMIT 8;', (err, randProducts) =>{
            if(err){
                res.json(err);
            }else{
                rp = randProducts
                console.log(rp);
                res.render('product', {
                    data: {
                        p: p,
                        i: i,
                        s: s,
                        rp: rp
                    }
                });
            }
        });
    });
};

module.exports = controller;