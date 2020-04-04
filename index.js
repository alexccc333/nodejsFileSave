const express  = require('express');
const path = require('path')
const  exphbs  = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoute = require('./routes/card')


const app = express();



const hbs = exphbs.create({
    defaultLayout:'main',
    extname: 'hbs'
})



app.engine('hbs',hbs.engine)
app.set('view engine','hbs')





app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use('/',homeRoutes);
app.use('/courses',coursesRoutes);
app.use('/add',addRoutes);
app.use('/card',cardRoute);




const PORT = process.env.PORT || 3000


app.listen(PORT,()=>{
    console.log(`server start on port ${PORT}`)
})