import { Sequelize, DataTypes, Model, Optional } from "sequelize";
import sequelize from "../config/sqlConfig";
import UserModel from "./userModel";


interface OrderAttributes {
    order_id: number;
    user_id: string;
    delivery_option: string;
    total_price: number;
    status: 'pending' | 'completed' | 'cancelled';
    created_at?: Date;
    updated_at?: Date;
}

interface OrderCreationAttributes extends Optional<OrderAttributes, "order_id"> {}

export class OrderModel extends Model<OrderAttributes, OrderCreationAttributes>
    implements OrderAttributes
    {
        public order_id!: number;
        public user_id!: string;
        public delivery_option!: string;
        public total_price!: number;
        public status!: 'pending' | 'completed' | 'cancelled';
        public created_at?: Date;
        public updated_at?: Date;
    }


OrderModel.init(
{
    order_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
},
user_id: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
    model: UserModel,
    key: 'user_id'
    },
},
    delivery_option: {
        type: DataTypes.STRING(20),
        allowNull: false,
},
total_price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
},
status: {
    type: DataTypes.ENUM('pending', 'completed', 'cancelled'),
    defaultValue: 'pending',
},
},
{
    sequelize,
    modelName: "OrderModel",
    tableName: "orders",
    timestamps: true,
    createdAt: "created_at",
    updatedAt: "updated_at",
});

