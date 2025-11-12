require('dotenv').config();
const express = require('express');
const userRouter = require('./routers/userRouter')
const employeeRouter = require('./routers/employeeRouter')  
const computerRouter = require('./routers/computerRouter')
const session = require ('express-session')




const app = express()

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(session({
    secret: 'azerty',
    resave: true,
    saveUninitialized: true
}))



app.use(userRouter)
app.use(employeeRouter)
app.use(computerRouter)

app.listen(process.env.PORT, (err)=>{
    console.log(!err ? "Connecté au serveur" : err);
})