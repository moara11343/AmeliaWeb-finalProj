var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
var app = express();
var port = process.env.port || 8080;
var multer  = require('multer');
var alert  = require('alert');
const fs = require("fs");
const { timeStamp } = require('console');


const stripeSecretKey = "sk_test_51HvLrgL12Pwp7AQ0cwhAoeATpUukVrdtX1F5JjEet1L533pcjkXKEBF2crxIFIUP7hoCYOsHR3XvoC46ZyEZUkR300UaSFQoGh";
const stripePublicKey = "pk_test_51HvLrgL12Pwp7AQ0M58mV89BiB82AQXKDVcXv4WuNwvJKwEZP9q5jH9OqXZL0pBxYeuz1JiIetsgx7I0e6CuFLME00nImFRPRT";
const stripe = require('stripe')(stripeSecretKey)

var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : '',
    database : 'ameliadatabase'
    
});

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/upload');
    },
    filename: (req, file, cb) => {
		var filename = file.originalname.split(" ").join('')
		filename = filename.split("_").join('')
		filename = filename.split("-").join('')
        filename = filename.split(".")
        filename[0],filename[1];
        cb(null, filename[0]+Date.now()+"."+filename[1])
    }
});


const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg" || file.mimetype == "image/gif" || file.mimetype == "video/mp4") {
            cb(null, true);
        } else {
            cb(null, false);
            return cb(new Error('Allowed only .png, .jpg, .jpeg and .gif'));
        }
    }
});

app.use(express.static("public"));
app.set('views', path.join(__dirname, 'views'));
app.set("view engine","ejs");
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));


app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());



app.use(function(req, res, next) {
	res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate"); // HTTP 1.1.
	res.setHeader("Pragma", "no-cache"); // HTTP 1.0.
	res.setHeader("Expires", "0"); // Proxies.
	res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
	next();
  });
app.get("/home",(req,res)=>{
    res.render("home")
})

app.post("/home",function(req,res){
    var contactus = req.body;
    connection.query("INSERT INTO `ContactUS`(`name`, `email`, `topic`, `message`,`date` ) VALUES (?,?,?,?,?)", [contactus.name,contactus.email,contactus.topic,contactus.message,contactus.date], function(error, results, fields) {
        console.log(contactus)
        if (error) {
            alert("Please check agian")
            res.redirect("/home")
            res.end()
        }
        else{
            alert("THANK YOU FOR CONTACT US")
            res.redirect("/home")
        };
    })
})

app.get("/artist",(req,res) => {
    res.render("artist")
})
app.get("/gallery",(req,res) => {
    res.render("gallery")
})
app.get("/",function(req,res){
   res.redirect("/store")
})
app.get("/signup",function(req,res){
    res.render("signup")
})
app.post("/signup",function(req,res){
    var newaccount = req.body;
    connection.query("INSERT INTO `member`(`firstname`, `lastname`, `email`, `username`, `password`, `phone`, address) VALUES (?,?,?,?,?,?,?)", [newaccount.fname,newaccount.lname,newaccount.email,newaccount.username,newaccount.password,newaccount.phone,newaccount.address], function(error, results, fields) {
        if (error) {
            alert("your username or email has used")
            res.redirect("/signup")
            res.end()
        }
        else{
            res.redirect("/login")
        };
    })
})
app.get("/login",function(req,res){
    res.render("login")
})
app.post("/login",function(req,res){
    var loginaccount = req.body;
    connection.query("SELECT * FROM `member` WHERE username = ? AND password = ? OR email = ? AND password = ?", [loginaccount.usernameoremail,loginaccount.password,loginaccount.usernameoremail,loginaccount.password], function(error, results, fields) {
        if (error || results.length < 1) {
            alert("your username or email not found or password not correct")
            res.redirect("/login")
            res.end()
        }
        else{
            req.session.login = true;
            req.session.username = results[0].username;
            req.session.email = results[0].email;
            res.redirect("/")
        };
    })
})

app.get("/profile",function(req,res){
    if(req.session.login){
        connection.query("SELECT * FROM `member` WHERE username = ? AND email = ?", [req.session.username,req.session.email], function(error, results, fields) {
            if (error) {
                alert("go to login first")
                res.redirect("/")
                res.end()
            }
            else{
                res.render("profile",{
                    profileinfo : results[0],
                    login:true
                })
            };
        })
    }
    else{
        alert("go to login first")
        res.redirect("/")
    }
})

app.post("/profile",function(req,res){
    if(req.session.login){
        var updateaccount = req.body;
        connection.query("UPDATE `member` SET `firstname`= ? ,`lastname`= ? ,`email`= ? ,`username`= ? ,`password`= ? ,`phone`= ? ,`address`= ?  WHERE username = ?", [updateaccount.fname,updateaccount.lname,updateaccount.email,updateaccount.username,updateaccount.password,updateaccount.phone,updateaccount.address,req.session.username], function(error, results, fields) {
            if (error) {
                alert("your profile not update")
                res.redirect("/profile")
                res.end()
            }
            else{
                alert("Profile Saved")
                res.redirect("/profile")
                res.end()
            };
        })
    }
    else{
        alert("go to login first")
        res.redirect("/")
    }
})

app.get("/logout",function(req,res){
    alert("Log out successful")
    req.session.destroy()
    res.redirect("/")
    res.end()
})

app.get("/admin",function(req,res){
    res.render("loginadmin")
    res.end()
})

app.post("/admin",function(req,res){
    var adminlogin = req.body;
    connection.query("SELECT * from admin WHERE username = ? AND password = ?",[adminlogin.username,adminlogin.password], function(error, results, fields) {
        if (error) {
            alert("your user accounts not found in admin")
            res.redirect("/profile")
            res.end()
        }
        else{
            req.session.adminlogin = true;
            res.redirect("/productlist")
            res.end()
        };
    })
})

app.get("/createproduct",function(req,res){
    if(req.session.adminlogin){
        res.render("createproduct")
    }
    else{
        alert("go back to login for admin first")
        res.redirect("/admin")
        res.end()
    }
})

app.post("/createproduct", upload.single('image') ,function(req,res){
    
    console.log(req.file)
    if(req.session.adminlogin){
        var newproduct = req.body;
        var newimage = req.file;

        connection.query("INSERT INTO `product`(`id`, `name`, `price`, `image`) VALUES (?,?,?,?)", [newproduct.id,newproduct.name,newproduct.price,newimage.filename], function(error, results, fields) {
            if (error) {
                alert("your file type not correct")
                res.redirect("/productlist")
                res.end()
            }
            else{
                alert("new product added !!")
                res.redirect("/productlist")
                res.end()
                };
        })
    }
    else{
        alert("go back to login for admin first")
        res.redirect("/admin")
        res.end()
    }
})

app.get("/editproduct/:id",function(req,res){    
    if(req.session.adminlogin){
        var productid = req.params.id;
        connection.query("SELECT * from product where id = ?", [productid], function(error, results, fields) {
            if (error) {
                alert("your product id not found in database")
                res.redirect("/productlist")
                res.end()
            }
            else{
                res.render("editproduct",{
                    productdata: results[0]
                })
                res.end()
                };
        })
    }
    else{
        alert("go back to login for admin first")
        res.redirect("/admin")
        res.end()
    }
})

app.post("/editproduct/:id",function (req, res, next) {
    if(req.session.adminlogin){
        var productid = req.params.id;
        var productdata = req.body;
        connection.query("UPDATE `product` SET `id`=?,`name`=?,`price`=? WHERE id = ?", [productdata.id, productdata.name, productdata.price, productid], function(error, results, fields) {
            if (error) {
                alert("your product id not found in database")
                res.redirect("/productlist")
                res.end()
            }
            else{
                alert("update product succesful")
                res.redirect("/productlist")
                res.end()
                };
        })
    }
    else{
        alert("go back to login for admin first")
        res.redirect("/admin")
        res.end()
    }
  })


  app.post("/editproduct/:id/img", upload.single('image') ,function(req,res){
    if(req.session.adminlogin){
        var productid = req.params.id;
        var productdata = req.body;
        var updateimage = req.file;
        console.log(productdata,updateimage)
        connection.query("UPDATE `product` SET `id`=?,`name`=?,`price`=?,`image`=? WHERE id = ?", [productdata.id, productdata.name, productdata.price, updateimage.filename , productid], function(error, results, fields) {
            if (error) {
                alert("your product id not found in database")
                res.redirect("/productlist")
                res.end()
            }
            else{
                alert("update product succesful")
                res.redirect("/productlist")
                res.end()
                };
        })
    }
    else{
        alert("go back to login for admin first")
        res.redirect("/admin")
        res.end()
    }
  })

app.get("/deleteproduct/:id",function(req,res){
    if(req.session.adminlogin){
    var productid = req.params.id;
    connection.query("DELETE FROM `product` WHERE id = ?",[productid], function(error, results, fields) {
        if (error) {
            alert("not found product to delete")
            res.redirect("/admin")
            res.end()
        }
        else{
            alert("product delete sucessful")
            res.redirect("/productlist")
            res.end()
        };
    })
    }
    else{
        alert("go back to login for admin first")
        res.redirect("/admin")
        res.end()
    }
})

app.get("/productlist",function(req,res){
    if(req.session.adminlogin){
    connection.query("SELECT * from product", function(error, results, fields) {
        if (error) {
            alert("database failed")
            res.redirect("/admin")
            res.end()
        }
        else{
            res.render("productlist",{
                productdata:results
            })            
            res.end()
        };
    })
    }
    else{
        alert("go back to login for admin first")
        res.redirect("/admin")
        res.end()
    }
})

app.get("/store",function(req,res){
    var login;
    if(req.session.login){
        login = true;
    }
    else{
        login = false;
    }
    connection.query("SELECT * FROM `product`", function(error, results, fields) {
        if (error || results.length < 1) {
            alert("not found product")
            res.render("store",{
                items : [],
                login : login,
                stripePublicKey : stripePublicKey

            })
            res.end()
        }
        else{
            res.render("store",{
                items : results,
                login : login,
                stripePublicKey : stripePublicKey
            })
            res.end()
        };
    })

})

app.get("/history",function(req,res){
    if(req.session.login){
        connection.query("SELECT `payment_key`, `payment_createby`, `payment_createdat`, `payment_total` FROM `paymentkey` WHERE payment_createby = ? ORDER BY payment_createdat",[req.session.username], function(err, results, field) {
        if(err){
            console.log(err)
            res.redirect("/login")
        }
        else{
            res.render("history",{
                paymentkey : results,
                login : true
            })

        }
        })
        
    }
    else{
        res.redirect("/login")
    }
})


app.get("/history/:id",function(req,res){
    var paymentkey = req.params.id;
    if(req.session.login){
        connection.query("SELECT h.payment_key, h.payment_orderkey, h.name, h.image, h.amount, h.sum FROM paymenthistory h, paymentkey p WHERE p.payment_key = h.payment_key AND p.payment_createby = ? AND h.payment_key = ?",[req.session.username,paymentkey], function(err, results, field) {
        if(err){
            console.log(err)
            res.redirect("/login")
        }
        else{
            res.render("historydetail",{
                paymentdetail : results,
                login : true
            })

        }
        })
        
    }
    else{
        res.redirect("/login")
    }
})

app.use("/purchase",function (req,res) {

    
    var historykey = req.body.stripeTokenId
    // console.log(historykey)
    async function purchase()
    {
        var req_ID = req.params.id;

        const productall = await new Promise(function(resolve, reject) {
            var sql = "SELECT * FROM `product`";
            connection.query(sql, function(err, results, field) {
            resolve(results)
        })})

        var total = 0;
        var product = productall;
        var buyproduct = req.body.items;
        var history = [];
        buyproduct.forEach(element => {
            var sumlist =  0;
            var name = "";
            var image = "";
            var paymentorderkey = "";
            product.forEach(element2 => {
                if(element.id == element2.id){
                    paymentorderkey = historykey + element2.id
                    name = element2.name;
                    image = element2.image;
                    sumlist += parseInt(element2.price) * parseInt(element.quantity)
                }
            })
            history.push([historykey,paymentorderkey,name,image,element.quantity,String(sumlist)])
            total += sumlist;
        })
        // console.log(history)
        console.log(history)


        const addpaymentkey = await new Promise(function(resolve, reject) {
            var sql = "INSERT INTO paymentkey SET payment_key =? ,payment_createby=?,payment_createdat=?,payment_total=?";
            connection.query(sql,[historykey,req.session.username, Date.now() ,total ], function(err, results, field) {
            
            if(!err){
            resolve("add payment key")
            }
            else{
                alert("payment key not found")
                console.log(err)
            }
            })})
            
        const addhistory = await new Promise(function(resolve, reject) {
            var sql = "INSERT INTO `paymenthistory`(`payment_key`, `payment_orderkey`, `name`, `image`, `amount`, `sum`) VALUES ?";
            connection.query(sql,[history], function(err, results, field) {
                if(!err){
                    resolve("add payment history order")
                }
                else{
                    console.log(err)
                }
            })})


        stripe.charges.create({
            amount: total*100,
            source: req.body.stripeTokenId,
            currency: 'usd'
        }).then(function(){
            console.log('Charge Successful')
            res.json({message: 'successfully purchased items'})
        }).catch(function(){
            console.log("Charge Fail")
            res.status(500).end()
        })


    }
    if(req.session.login){
    purchase()
    
    }else{
    alert("go to login first")
    res.redirect("/login")
    res.end()
    }
   
          


})

app.get("*",function(req,res){
	res.send("page not found.")
	res.end()
})


app.listen(port, () => {
  console.log("Server Connected!!");
})
