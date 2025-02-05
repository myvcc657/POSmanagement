var bodyparser = require("body-parser");
var db = require("../DBHelper.js");
var urlencode = bodyparser.urlencoded({extended: false});
module.exports = {
    ProductIn:function(app){
            app.use(bodyparser.json());
            app.use(bodyparser.urlencoded({ extended: false }));
            app.post("/productIn", function(request, response){
            db.select("product", {barCode:request.body.barCode}, function(result){
                if(!result.status){
                    response.send(result);
                }else{
                    console.log(666)
                    db.insert("product", request.body, function(result){
                        response.send(result);
                    });
                } 
            });
        });
    },
    ProductOut:function(app){
        app.post("/productOut", function(request, response){
            db.select("product", request.body, function(result){
                console.log(request.body)
                if(!result.status){
                    response.send(result);
                } 
                else {
                    response.send(result);
                }
            });
        });
    },
    ProductRemove:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/productRemove", function(request, response){
                    db.delete("product", request.body, function(result)
                    {
                        response.send(result);
                    });
            });
    },
    ProductUpdate:function(app){
        app.use(bodyparser.json());
        app.use(bodyparser.urlencoded({ extended: false }));
        app.post("/productUpdate", function(request, response){
                var condition = JSON.parse(request.body.update);
                    db.update("product", condition, function(result){
                        response.send(result);
                    });
            });
    },
    OrderForm:function(app){
        app.post("/billIn", function(request, response){
                    db.insert("orderform", request.body, function(result){
                        response.send(result);
                    });
            }); 
    }
}