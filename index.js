const express  = require('express');
const path = require('path')
const mongoose = require('mongoose')
const  exphbs  = require('express-handlebars')
const homeRoutes = require('./routes/home')
const coursesRoutes = require('./routes/courses')
const addRoutes = require('./routes/add')
const cardRoute = require('./routes/card')
const ordersRoute = require('./routes/orders')
const Handlebars = require('handlebars')
const User = require('./models/user')
const {allowInsecurePrototypeAccess} = require('@handlebars/allow-prototype-access')


const app = express();



const hbs = exphbs.create({
    defaultLayout: 'main', 
    extname: 'hbs',
    handlebars: allowInsecurePrototypeAccess(Handlebars)
  });



app.engine('hbs',hbs.engine)
app.set('view engine','hbs')


app.use(async(req,res,next)=>{
    try{
        const user = await User.findById('5e93323391b4780af07eb2c3')
        req.user = user
        next()
    }
    catch(e){
        console.log(e)
    }
})

app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({extended:true}))
app.use('/',homeRoutes);
app.use('/courses',coursesRoutes);
app.use('/add',addRoutes);
app.use('/card',cardRoute);
app.use('/orders',ordersRoute)

const PORT = process.env.PORT || 3000

async function start(){
    try {
        let url = 'mongodb+srv://alexcc333:BIQYeqKyxTTJKA3E@cluster0-imlrr.mongodb.net/shop'
        await mongoose.connect(url,{useNewUrlParser: true, useUnifiedTopology: true,
        useFindAndModify:false
        })
        const candidate = await User.findOne()
        if(!candidate){
            const user = new User({
                email:'alexcc@mail.ru',
                name:'alexcc',
                cart:{items:[]}
            })
            await user.save()
        }
        app.listen(PORT,()=>{
            console.log(`server start on port ${PORT}`)
        })
    } catch (error) {
        console.log(error);
        
    }
}


start()