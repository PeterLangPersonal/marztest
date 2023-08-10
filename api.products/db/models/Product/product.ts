import { DataTypes, Model } from 'sequelize';

import { sequelize } from '../../sequelize';

interface ProductAttributes {
    ProductID: number;
    ProductName: string;
    ProductPhotoURL: string;
    ProductStatus: string;
};

export class ProductData extends Model<ProductAttributes> implements ProductAttributes {
    ProductID!: number;
    ProductName!: string;
    ProductPhotoURL!: string;
    ProductStatus!: string;
};

ProductData.init({
    ProductID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    ProductName: {
        type: DataTypes.STRING,
        allowNull: false,
    }, 
    ProductPhotoURL: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    ProductStatus: {
        type: DataTypes.ENUM,
        values: ['Active', 'Inactive'],
        allowNull: false,
    },
}, {
    sequelize, modelName: 'Product',
});
