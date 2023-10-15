import Category from "../models/CategoryModel.js";
import BudgetRule from "../models/BudgetRuleModel.js";
import Outcome from "../models/OutcomeModel.js";
import Wallet from "../models/WalletModel.js";

export const createOutcome = async(req, res) => {
    try {
        req.body.userId = req.params.id;
        await Outcome.create(req.body);
        res.status(201).json({
            message: "Outcome created"
        });
    } catch(error) {
        console.log(error.message);
    }
}

export const getAllOutcomeUser = async(req, res) => {
    try {
        const response = await Outcome.findAll({
            where: {
                userId: req.params.id
            },
            attributes: [
                'id',
                'name', 
                'nominal', 
                'tanggal_pengeluaran',
                'budgetruleId',
                'categoryId',
                'walletId'
            ],
            include: [
              {
                model: Wallet, 
                attributes: ['name'],
                required: false
              },
              {
                model: Category,
                attributes: ['name'],
                required: false 
              },
              {
                model: BudgetRule,
                attributes: ['name'],
                required: false
              }
            ]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const getOutcomeById = async(req, res) => {
    try {
        const response = await Outcome.findOne({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'name', 
                'nominal', 
                'tanggal_pengeluaran'
            ]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const updateOutcome = async(req, res) => {
    try {
        await Outcome.update(req.body, {
            where: {
                id: req.params.id,
            }
        })
        res.status(200).json( { message: "Outcome updated" } );
    } catch(error) {
        console.log(error.message);
    }
}

export const deleteOutcome = async(req, res) => {
    try {
        await Outcome.destroy({
            where: {
                id: req.params.id,
            }
        });
        res.status(200).json( { message: "Outcome deleted" } );
    } catch(error) {
        console.log(error.message);
    }
}

