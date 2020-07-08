const path=require('path')
const express=require('express')
const app=express();
const hbs=require('hbs')
const geocode=require('./utils/geocode')
const forecast=require('./utils/forecast')

//Define path for Config of express
const directoryName=path.join(__dirname,'../public')
const viewDirectory=path.join(__dirname,'../templates/views')
const partials_path=path.join(__dirname,'../templates/partials')

//set view engine and its path
app.set('view engine','hbs')
app.set('views',viewDirectory)
hbs.registerPartials(partials_path)

//setup of static directory to serve
app.use(express.static(directoryName))

app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        description : 'Home page'
    })
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        description : 'My name is Ayush Jain'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        title : 'Help',
        description : 'This is weather app version 1.0'
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'Please enter address'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecast_data)=>{
            if(error){
                return res.send([error])
            }
            res.send({
                Forecast: forecast_data,
                location,
                Address : req.query.address
            })
        })
    })
})
app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404 Error',
        error_message : 'Help page not found',
        description : 'This is an error page'
    })
})
app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 Error',
        error_message : 'Page not found',
        description : 'This is an error page'
    })
})

app.listen(3000,()=>{
    console.log('The server is listening at port 3000')
})