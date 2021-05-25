const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const request = require("request");
const https = require("https");
const mailchimp = require('@mailchimp/mailchimp_marketing');


app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static("public"));

app.get("/", function(req,res){
  res.sendFile(__dirname + "/signup.html");
});


app.post("/", function(req, res){
   const firstName = req.body.fName;
   const lastName = req.body.lName;
   const email = req.body.email;
   const data = {
    members: [
      {
        email_address:email,
        status: "subscribed",
        merge_fields: {
        FNAME: firstName,
        LNAME: lastName
     }

    }],
  };

  const jsonData = JSON.stringify(data);
  const url = "https://us7.api.mailchimp.com/3.0/lists/ed1a260968";
  const options = {
    method: "POST",
    auth: "arpita:0f9c474a7cbda1a0cbeb16a3621fc4e7-us7"
  }


  const request = https.request(url, options, function(response){
    if(response.statusCode === 200){
        res.sendFile(__dirname + "/success.html");

    }else{
    res.sendFile(__dirname + "/failure.html");
    }
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });

  });

request.write(jsonData);
request.end();


});




app.listen(process.env.PORT || 3000 ,function(){
  console.log(`Server is running.`);

});


// API KEY
// 0f9c474a7cbda1a0cbeb16a3621fc4e7-us7
//LIST ID
// ed1a260968
