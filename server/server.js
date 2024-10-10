//QBPYQeaDM4r40Txi
//mongodb+srv://shivprasadshivadasnair:MlOdk7hCgXDZ6dEt@shopcart.34k0b.mongodb.net/?retryWrites=true&w=majority&appName=shopcart
//
const express = require('express')
const dotenv = require('dotenv')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const bodyParser = require ('body-parser')
const cors = require('cors')


dotenv.config()

const app = express()
const PORT = process.env.PORT||5000
mongoose.connect(process.env.MONODB).then(()=>{console.log("Mongodb connected")

}).catch(err=>{
    console.log(err)
})


app.use(express.json({limit:"25mb"}))
app.use(express.urlencoded({limit:"25mb"}))
app.use(cookieParser());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded())



app.use(
    cors({
        origin:'http://localhost:5173',
        methods:['GET','POST','DELECT','PUT'],
        credentials:true

    })
)




//routes

const authRoutes = require('./src/users/user.route')
const productRoutes = require('./src/products/product.route')
const reviewRoutes = require('./src/Review/reviews.route')

app.use('/api/auth', authRoutes)
app.use('/api/product',productRoutes)
app.use('/api/review',reviewRoutes)






app.listen(PORT,()=>{console.log(`server is running ${PORT}`)})



