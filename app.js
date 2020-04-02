//jshint esversion:6

const express = require("express");
const https = require("https");
const bodyParser= require("body-parser"); 

const app= express();
app.use(bodyParser.urlencoded({extended: true}));


app.get("/" , function(req, res)
{
    res.sendFile(__dirname + "/index.html"); 
});

app.post("/", function ( req, res)
{   
 
    const query = req.body.cityName;
    console.log(query);
    const apiKey= "8be3b1fbe535fb01c8a5d1f985bfefd4";
    const units= "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + query + "&units=" + units + "&appid=" + apiKey; 
    https.get(url, function(response)
    {
        console.log(response.statusCode); // gives the status code of the response

        response.on("data", function(data)   //holding the data from the response and do these operations
        {
            //console.log(data);   //gives the data in hexadecimal format
            const weatherData= JSON.parse(data);       //converts the hex data to JSON format
            const temperature=weatherData.main.temp;
            const description= weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;
            const imageURL = "http://openweathermap.org/img/wn/"+    icon + "@2x.png"

            
            res.write("<h1><p> The temperature in " +query+ " is "+ temperature + " degree Celcuis.</p></h1>")
            res.write("<h1> The Weather is " + description + ". </h1>");
            res.write("<img src= " + imageURL +">");
            res.send();
          
        })


    });


});




app.listen(3000, function ()
 {
    console.log("Server is running at port 3000");
});