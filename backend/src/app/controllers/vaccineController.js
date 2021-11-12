const Vaccine = require('../models/Vaccine');
const jwt = require('jsonwebtoken');

module.exports = {

    async index(req, res) {
        try {
            const vaccine = await Vaccine.find();
            if (vaccine.length === 0) {
                return res.status(400).send('No vaccine found');
            }
            res.json(vaccine);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    async details(req, res) {
        try {
            const { _id } = req.params;
            const vaccine = await Vaccine.findOne({ _id });
            if (vaccine.length === 0) {
                return res.status(400).send('Vaccine not found');
            }
            res.json(vaccine);
        } catch (error) {
            return res.status(500).send({ error: 'Error'});
        }
    },
    async create(req, res) {
        const { name, lotNumber } = req.body;
        try {
            if (await Vaccine.findOne({ name }) && await Vaccine.findOne({ lotNumber})) {
                return res.status(400).send({ error: 'Is already registered' });
            }
            const vaccine = await Vaccine.create(req.body);
            return res.send({
                vaccine
            });
        } catch (error) {
            return res.status(400).send({ error: "Error" });
        }
    },
    async delete(req, res) {
        try {
            const { _id } = req.params;
            const vaccine = await Vaccine.findByIdAndDelete({ _id });
            if (vaccine.length === 0) {
                return res.status(400).send('Vaccine not found');
            }
            return res.json(vaccine);
        } catch (error) {
            return res.status(500).send(error);
        }

    },
    async update(req, res) {
        try {
            const { _id, name, lotNumber, quantity } = req.body;
            const data = { name, lotNumber, quantity };
            const vaccine = await Vaccine.findOneAndUpdate({ _id }, data, { new: true });
            if(vaccine === null) {
                return res.status(400).send('Not found')
            }
            return res.json(vaccine);
        } catch (error) {
            return res.status(500).send(error);
        }

    }
}