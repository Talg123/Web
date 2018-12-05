const express = require('express');
const app = express();
const port = 8889;
const hbs = require('hbs');
const axios = require('axios');

//parse json if needed
app.use(express.json());
//url encoded for "POST" request body params
app.use(express.urlencoded({extended:true}));
//using HBS for html
app.set('view engine', 'hbs');
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

//serving the index.hbs with input to get the URL
app.get("/",(req,res)=>{
    res.render("index.hbs");
})

//all get the hash code(url)
app.post("/",(req,res)=>{
    //set variables for resault and request
    let resualt;
    let goodReq = true;
    //if we have post request with url
    if(req.body.url){
        //simple (not so good) check if its url
        if(req.body.url.indexOf("http") != -1 || req.body.url.indexOf("https") != -1 || req.body.url.indexOf("com") != -1){
            //API request (post) to the server side to recive the data
            axios.post("http://localhost:8888/add",{url:req.body.url})
            .then(data=>{
                if(data.data){
                    resualt = "http://localhost:8888/"+data.data;
                    res.render("index.hbs",{
                        resualt,
                        goodReq
                    })
                }
            })
        }else{
            // if the url not good
            resualt = "Not a good URL";
            goodReq = false;
            res.render("index.hbs",{
                resualt,
                goodReq
            })
        }
    }else{
        //if no url parameter
        res.render("index.hbs",{
            resualt,
            goodReq
        })
    }
})
app.listen(port);
