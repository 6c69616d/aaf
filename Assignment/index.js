import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import { userRoutes }  from './src/routes/userRoutes';
import { fileRoutes } from './src/routes/fileRoutes';

const app = express();
const PORT = 3000;

//mongoose connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/database', {
    useNewUrlParser: true
});
mongoose.connection.on('error', () => {
    console.log("MongoDB connection error. Make sure the MongoDB is running.")
});

// bodyparser setup
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

userRoutes(app);
fileRoutes(app);

app.get('/', (req, res)=>
    res.send(`Node and express server is running on ${PORT}`)
);

app.listen(PORT, () =>
    console.log(`your server is running on ${PORT}`)
);