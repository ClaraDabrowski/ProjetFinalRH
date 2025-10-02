const express = require('express');
const userRouter = require('./routers/userRouter')
const employeeRouter = require('./routers/employeeRouter')  
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


app.listen(3001, (err)=>{
    console.log(!err ? "Connecté au serveur" : err);
})