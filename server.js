import express from "express";
import session from "express-session";
import userRouter from "./src/routes/user.router.js";
import 'dotenv/config';
import cookieParser from "cookie-parser";
import MongoStore from "connect-mongo";
import { initMongoDB } from "./src/config/db.connection.js";
import MongoStore from "connect-mongo";
import 'dotenv/config';


const app = express();


const mongoStoreConfig = {
    store: MongoStore.create({
        mongoURL: process.env.MONGO_URL,
        //path: './sessions',
        ttl: 60,
    }),
    secret: "4321",
    cookie: { maxAge: 10000 },
    saveUninitialized: true,
    resave: false
}

app.use(session(mongoStoreConfig));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use('/api', userRouter);

initMongoDB()
.then(()=> console.log('Mongo Connected'))
.catch((error)=> console.log(error))

app.engine('handlebars', handlebars.engine());
app.set('views', path.join(process.cwd(), 'src', 'views'));
app.set('view engine', 'handlebars')


app.listen(8080, () => {
    console.log(`Server is currently running on port 8080`);
})


