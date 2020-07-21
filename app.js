const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');


const app = express();
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('publiic'));


mongoose.connect('mongodb://localhost:3003/EmployeDB', {useNewUrlParser: true,useUnifiedTopology: true});

var emSchema = new mongoose.Schema({
    name:String,
    empId:Number,
    age:Number
});

const employeModel = mongoose.model("person",emSchema);



app.get("/",(req,res)=> {
    res.render('home');
});

//update employee
app.post("/",(req,res)=> {
  
   const Name = new employeModel({
       name:(req.body.empName),
       empId:(req.body.empId),
       age:(req.body.empAge)
   });
   Name.save((err,success)=> {
       if(!err) {
           res.write('saved');
       }
       else {
           res.sent(err);
       }
   });

});

app.get('getEmpName',(req,res)=> {

});

//find employee
app.get("/:name",(req,res)=> {
    
    const callEmp = (req.params.name);
    employeModel.findOne({name:callEmp},(err,found)=> {
     
        if(!err) {
            if(!found) {
                res.send('empoyee not found')
            }
            else {
                res.render('/getEmpName',{employee:found.name,id:found.empId,age:found.age})
            }
        }
    })  
})



app.listen(3000,()=> {
    console.log('success')
});



   









