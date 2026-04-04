require('dotenv').config();

if(!process.env.JWT_SECRET){
    throw new Error("JWT_SECRET is not defined");
}
if(!process.env.JWT_REFRESH_SECRET){
    throw new Error("JWT_REFRESH_SECRET is not defined");
}
if(!process.env.MONGO_URI){
    throw new Error("MONGO_URI is not defined");
}


const express = require('express');
const fs = require('fs');
const morgan = require('morgan');
const path = require('path');
const cors = require('cors');
const mongoose = require('mongoose');
const { StatusCodes } = require('http-status-codes');
const { responseFormatter } = require('./middlewares/responseFormatter.middleware');
const { errorLogger } = require('./utils/errorLogger.util');
const { authRouter } = require('./routes/auth.routes');
const { userRouter } = require('./routes/user.routes');
const { productRouter } = require('./routes/product.routes');


const app = express();
const port = process.env.PORT || 3001;


app.use(express.json());


const corsOptions = {
    origin: ["http://localhost:3000"],
}

app.use(cors(corsOptions));


let accessLogStream = fs.createWriteStream(
    path.join(__dirname, "..", 'access.log'),
    {
        flags: 'a',
    }
);

app.use(morgan('combined', {stream: accessLogStream}));
app.use(responseFormatter);


app.use('/api/auth', authRouter);
app.use('/api/user', userRouter);
app.use('/api/products', productRouter);


app.use((req, res) =>{
    res.status(StatusCodes.NOT_FOUND).json({message: "Not found"});
});



app.use((err, req, res, next) => {
    errorLogger("API Error", req, err); 
    const statusCode = err.statusCode || 500;

    res.status(statusCode).json({
        message: err.message,
        details: err.details || null,
    });
});


async function bootstrap(){
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB");

        app.listen(port, () =>{
            console.log(`App listening on port: ${port}`)
        });
    } 
    catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1);
    }
}

bootstrap();