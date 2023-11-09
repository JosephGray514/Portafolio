const controller = {};

controller.select = (req, res)=>{
    const id = req.params.id;

    req.getConnection((err, conn)=>{
        conn.query('SELECT p.id,p.name,description,price,MAX(url) AS url, c.name AS catalogue FROM product AS p INNER JOIN product_catalogue AS pc on p.id = pc.id_product INNER JOIN img AS i ON i.id_product = p.id INNER JOIN catalogue AS c ON c.id = pc.id_catalogue WHERE pc.id_catalogue = ? GROUP BY id,name,description,price ',[id], (err, products) =>{
            if(err){
                res.json(err);
            }

            console.log(products);
            res.render('catalogue', {
                data: {
                    p:products
                }
            })
        });
    });
};

module.exports = controller;