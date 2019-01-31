const express = require('express');
const app = express();
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;
hbs.registerPartials(__dirname + '/views/partials')
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

//hbs helpers
hbs.registerHelper('getCurrentYear',()=>{
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt',(item)=>{
    return item.toUpperCase()
})

//custom middlewares
app.use((req,res,next)=>{
    var now  = new Date().toString()
    var log = `${now} ${req.method} ${req.path} \n`;
    fs.appendFile('server.log',log,(err)=>{
        if(err) throw err;
    })
    console.log(`${now} ${req.method} ${req.path}`);
    next();
})
app.get('/',(req,res)=>{
    res.render('home', {
        pageTitle: 'Home Page',
        welcomeMessage:'Welcome to my website...',
    });
});

app.get('/about',(req,res)=>{
    res.render('about',{
        pageTitle:' About Page',
    });
})
app.get('/bad',(req,res)=>{
    res.send({
        error_message: "This is an error."
    })
})
app.listen(port,()=>{
    console.log(`Server is UP on ${port}`)
})