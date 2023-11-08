const controller = {};

controller.all = (req, res) =>{
    let p;
    let pr;
    let count;

    req.getConnection((err, conn)=> {
        conn.query('SELECT * FROM catalogue', (err, catalogues) =>{
            
            if(err){
                res.json(err);
            }else{
                var products = [];
                const c = catalogues;
                console.log(c)
                for (let i = 0; i < c.length; i++) {
                    conn.query("SELECT img.id_product AS id,name,description,information,price,id_catalogue,MAX(img.url) AS url FROM product INNER JOIN img ON product.id = img.id_product INNER JOIN product_catalogue ON product.id = product_catalogue.id_product WHERE product_catalogue.id_catalogue = ? GROUP BY img.id_product, product.name, product.description, product.information, product.price, product_catalogue.id_catalogue",[c[i].id], (err, product) =>{
                        if(err){
                            res.json(err);
                        }else{
                            products.push(product);
                            console.log("..........................................................................")
                            // console.log(products)
                            console.log("..........................................................................")
                            
                            if ((i+1)== c.length) {
                                console.log(products[4])
                                res.render('index', {
                                    data: {
                                        c:c,
                                        p:products 
                                    }
                                });
                            }
                        }
                    });
                }
                
                
                
            }
        });
    });
};


module.exports = controller;