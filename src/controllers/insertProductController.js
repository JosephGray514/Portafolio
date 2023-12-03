const controller = {};

controller.insert = (req, res) => {
    const data = req.body;
    console.log("Data with the catalogue :");
    console.log(data)
    console.log("Catalogue :");
    console.log(data.catalogues)
    let cat = data.catalogues;
    let key = "catalogues";
    delete data[key];
    console.log("Data with out the catalogue :")
    console.log(data)
    console.log(" Catalogue : ")
    console.log(cat)

    let sizes = data.sizes;
    let quantity = data.quantity;
    let keyS = "sizes";
    let keyQ = "quantity";
    delete data[keyS];
    delete data[keyQ];
    console.log(data)
    console.log(sizes)
    console.log(quantity)

    let images = [];
    console.log('imagenes')
    for (let i = 0; i < req.files.length; i++) {
        image = req.files[i].buffer.toString('base64')
        images.push(image)
    }
    console.log(images)

    req.getConnection((err, conn) =>{
        let idP;
        console.log('******************************************CONNECTION AND INSERTION********************************************************');
        conn.query('INSERT INTO product set ?', [data], (err, products) => {
            if(err){
                res.json(err);
            }else{
                conn.query('SELECT MAX(id) AS last_id FROM product;', (err, id) => {
                    if(err){
                        res.json(err);
                    }else{
                        idP = id[0].last_id;
                        console.log("ID of the last inserted product : " + idP);
                        for (let i = 0; i < cat.length; i++) {
                            conn.query('INSERT INTO product_catalogue (id_product, id_catalogue) VALUES (?,?);',[idP,parseInt(cat[i])], (err, pc) => {
                                if(err){
                                    res.json(err);
                                }else{
                                    console.log('Inserted Catalogue');
                                }
                            });
                        }
                        for(let i = 0; i < sizes.length; i++){
                            conn.query('INSERT INTO product_sizes (id_product, id_sizes, status, quantity) VALUES (?,?,?,?);',[idP,parseInt(sizes[i]),1,parseInt(quantity[i])], (err, pc) => {
                                if(err){
                                    res.json(err);
                                }else{
                                    console.log('Inserted Size');
                                }
                            });
                        }
                        for(let i = 0; i < images.length; i++){
                            conn.query('INSERT INTO img (id_product,url) VALUES(?,?);',[idP,images[i]], (err, pc) => {
                                if(err){
                                    res.json(err);
                                }else{
                                    console.log('Inserted Img');
                                }
                            });
                        }
                    }
                });
                res.redirect('/insertProduct');
            }
        });
        
    });



};

controller.select = (req, res)=>{
    let c;
    let t;
    let a = [];
    req.getConnection((err, conn)=>{
        conn.query('SELECT * FROM catalogue', (err, catalogues) =>{
            if(err){
                res.json(err);
            }
            c = catalogues
            console.log(c);
        });

        conn.query('SELECT * FROM type', (err, types) =>{
            if(err){
                res.json(err);
            }
            t = types;
            console.log('types');
            console.log(t);
            for (let i = 0; i < t.length; i++) {
                conn.query('SELECT * FROM sizes WHERE id_type = ?',[t[i].id], (err, sizes) =>{
                    if(err){
                        res.json(err);
                    }
                    a.push(sizes);
                    if((i+1) == t.length){
                        console.log(a)
                        res.render('insertProduct', {
                            data: {
                                c: c,
                                t: t,
                                a: a
                            }
                        })
                    }
                });       
            }
        });
    });
};

module.exports = controller;