import express, {Express} from 'express'
import cors from 'cors'
import products from './api';

export default async(app: Express) => {
    app.use(express.json());
    app.use(cors());
    // app.use(express.static(__dirname + '/public'));

    products(app);
}