const controller = {};

controller.insert = (req, res) => {
    const data = req.body;
    // console.log("Data with the catalogue :"+data)
    // console.log("Catalogue :"+data.catalogues)
    let cat = data.catalogues;
    let key = "catalogues";
    delete data[key];
    // console.log("Data with out the catalogue :"+data)
    // console.log(" Catalogue : "+cat)

    var idP;

    req.getConnection((err, conn) =>{
        conn.query('INSERT INTO product set ?', [data], (err, products) => {
            if(err){
                res.json(err);
            }else{
                // console.log(products);
            }
        });
        conn.query('SELECT MAX(id) AS last_id FROM product;', (err, id) => {
            if(err){
                res.json(err);
            }else{
                idP = id[0].last_id;
                console.log("ID of the last inserted product : " + idP);
                console.log("ID of the last inserted product 'out of the query' : "+idP);
                for (let i = 0; i < cat.length; i++) {
                    conn.query('INSERT INTO product_catalogue (id_product, id_catalogue) VALUES (?,?);',[idP,parseInt(cat[i])], (err, pc) => {
                        if(err){
                            res.json(err);
                        }else{
                            console.log('Inserted');
                        }
                    });
                }
            }
        });
    });
};

controller.select = (req, res)=>{
    let c;
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM catalogue', (err, catalogues) =>{
            if(err){
                res.json(err);
            }
            c = catalogues
            console.log(c);
            res.render('insertProduct', {
                data: {
                    c: c
                }
            })
        });
    });
};

module.exports = controller;