import express from "express";
import { ProductData } from "../../db";
import { updateProductStatusSchema } from "./schema";

export const ProductRouter = express.Router();

ProductRouter.get('/', async(req, res) => {
    const productInstances = await ProductData.findAll();

    res.send(productInstances);
});

ProductRouter.post('/:id/status', async(req, res) => {
    const productId = req.params.id;
    const productInstance = await ProductData.findByPk(productId);
    const { ProductStatus } = updateProductStatusSchema.parse(req.body);

    if (productInstance) {
        await productInstance.update({ProductStatus: ProductStatus});
        res.status(200).send('Complete');
    } else {
        res.status(404).send(`Product not found for id ${productId}`);
    }
});
