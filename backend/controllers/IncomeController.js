import Income from "../models/IncomeModel.js";
import Wallet from "../models/WalletModel.js"; // Import model Wallet

export const createIncome = async(req, res) => {
    try {
        req.body.userId = req.params.id;
        console.log(req.params.tanggal_pemasukan);
        const response = await Income.create(req.body);
        res.status(201).json({
            message: "Income created",
            data: response
        });
    } catch(error) {
        res.status(500).json({message : error.message});
        console.log(error.message);
    }
}

export const getIncomeByUserId = async(req, res) => {
    try {
        const response = await Income.findAll({
            where: {
                userId: req.params.id
            },
            attributes: [
                'id',
                'name', 
                'balance', 
                'tanggal_pemasukan',
                'walletId'
            ],
            include: [
                {
                    model: Wallet,
                    attributes: ['name'] // Ambil atribut 'name' dari tabel Wallet
                }
            ],
            order: [['id', 'ASC']]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const getIncomeById = async(req, res) => {
    try {
        const response = await Income.findOne({
            where: {
                id: req.params.id,
            },
            attributes: [
                'id',
                'name', 
                'balance', 
                'tanggal_pemasukan',
                'walletId'
            ],
            include: [
                {
                    model: Wallet,
                    attributes: ['name'] // Ambil atribut 'name' dari tabel Wallet
                }
            ]
        });
        res.status(200).json(response);
    } catch(error) {
        console.log(error.message);
    }
}

export const updateIncome = async(req, res) => {
    try {
        await Income.update(req.body, {
            where: {
                id: req.params.id
            }
        })
        res.status(200).json( { message: "Income updated" } );
    } catch(error) {
        res.status(500).json({message : error.message});
        console.log(error.message);
    }
}

export const deleteIncome = async(req, res) => {
    try {
        await Income.destroy({
            where: {
                id: req.params.id
            }
        });
        res.status(200).json( { message: "Income deleted" } );
    } catch(error) {
        res.status(500).json({message : error.message});
        console.log(error.message);
    }
}