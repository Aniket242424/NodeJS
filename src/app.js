const path=require('path');
const express=require('express');
const hbs=require('hbs');
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')
//store our express application
const app=express();

//define express config
const publicDirectory=path.join(__dirname,'../public')
const viewsPath=path.join(__dirname,'../templates/views')
const partialPath=path.join(__dirname,'../templates/partials')

//set up handlebars for dynamic templates
app.set('view engine','hbs');
app.set('views',viewsPath);
hbs.registerPartials(partialPath)


//customize your server by setting directory to serve
app.use(express.static(publicDirectory))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Aniket'
    });
})


app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'Aniket'
    });
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help',
        name:'Aniket',
        helpText:'This is helpful text'
    });
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'you must provide an address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            res.send({

                forecast:forecastData,location,
                address:req.query.address

            })
        })
    })
    
})


app.get('/products',(req,res)=>{
    if(!req.query.type){
       return res.send({
            error:'You must provide search'
        })
    }
    console.log(req.query.type);
    res.send({
        products:[]
    })
})



app.get('/help/*',(req,res)=>{
    res.render('error',{
        errorMessage:'Help Page Not Found'
    })
})

app.get('*',(req,res)=>{
    res.render('error',{
        errorMessage:'404 Page Not Found'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000');    
})