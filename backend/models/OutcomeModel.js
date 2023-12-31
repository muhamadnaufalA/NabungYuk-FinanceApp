import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import User from "./UserModel.js";
import BudgetRule from "./BudgetRuleModel.js";
import Category from "./CategoryModel.js";
import Wallet from "./WalletModel.js";

const {DataTypes} = Sequelize;

const Outcome = db.define('outcomes', {
    name: {
        type: DataTypes.STRING(32),
        allowNull: false
    },
    nominal: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    tanggal_pengeluaran: {
        type: DataTypes.DATEONLY,
        allowNull: false
    }
}, {
    freezeTableName: true
});

User.hasMany(Outcome);
Outcome.belongsTo(User);

BudgetRule.hasMany(Outcome);
Outcome.belongsTo(BudgetRule);

Category.hasMany(Outcome);
Outcome.belongsTo(Category);

Wallet.hasMany(Outcome);
Outcome.belongsTo(Wallet);

export default Outcome;

(async() => {
    await db.sync();
});