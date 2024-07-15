const express=require('express')
const mongoose=require('mongoose')
const path=require('path')
const bodyParser=require('body-parser')
// const Contact = require('./models/Contact');

const app=express();
app.use(bodyParser.urlencoded({extended:false}))
const port=process.env.PORT || 5500;

app.use(express.static(path.join(__dirname,'public')));

mongoose.connect('mongodb+srv://aniketroy:personalwebsite@cluster0.lslotdu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Portfolio_message_db', {
    useNewUrlParser:true,
    useUnifiedTopology:true,
}).then(()=>{
    console.log("MongoDB is connected")
})
const Schema=mongoose.Schema;
const dataschema=new Schema({
    name:String,
    email:String,
    phone_number:String,
    message:String
});
const data=mongoose.model('Message',dataschema);

app.listen(port,()=>{
    console.log(`Server running at port no. ${port}`)
})
app.post('/message_sending',(req,res)=>{
    const {name,email,phone_number,message}=req.body;
    const newData=new data({
        name,
        email,
        phone_number,
        message
    });
    newData.save();
    res.redirect('/')
})