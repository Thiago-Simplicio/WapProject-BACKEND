import express, { Application } from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import route from './Routers/index';

dotenv.config();

class App {
    public express: Application;

    public constructor () {
        this.express = express();

        this.middlewares();
        this.database();
        this.routes();
    }

    //config middlewares
    private middlewares () {
        this.express.use(express.json());
        this.express.use(cors());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }

    //Config database
    private database () {
        mongoose.connect(`${process.env.MONGO_URL}`, {
            useNewUrlParser: true,
            useUnifiedToPology: true
        })
            .then(() => {
                console.log(`Servidor conectado com MongoDB`);
            })
            .catch((err) => {
                console.log(`Erro ao se conectar com MongoDB ${err}`);
            })
    }

    private routes () {
        this.express.use(route);
    }
}

export default new App().express;