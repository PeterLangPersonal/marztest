import express from "express";
import { ProductData } from "../../db";

export const ProductRouter = express.Router();

ProductRouter.get('/', async(req, res) => {
    const productInstances = await ProductData.findAll();

    res.send(productInstances);
});
