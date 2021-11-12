const Pacient = require('../models/Pacient');
const jwt = require('jsonwebtoken');

module.exports = {

    async index(req, res) {
        try {
            const pacient = await Pacient.find();

            if (pacient.length === 0) {
                return res.status(400).send('Pacient not found');
            }
            res.json(pacient);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    async details(req, res) {
        try {
            const { _id } = req.params;
            const pacient = await Pacient.findOne({ _id });
            if (pacient.length === 0) {
                return res.status(404).send('Pacient not found');
            }
            res.json(pacient);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    async create(req, res) {
        const { email, cpf } = req.body;
        try {
            if (await Pacient.findOne({ email })) {
                return res.status(400).send({ error: 'Email is already registered' });
            }
            else if (await Pacient.findOne({ cpf })) {
                return res.status(400).send({ error: 'CPF is already registered' });
            }
            const pacient = await Pacient.create(req.body);
            return res.send({
                pacient
            });
        } catch (error) {
            return res.status(400).send({ error: "Falha ao cadastrar..." });
        }
    },
    async delete(req, res) {
        try {
            const { _id } = req.params;
            const pacient = await Pacient.findByIdAndDelete({ _id });
            if (pacient.length === 0) {
                return res.status(404).send('Pacient not found');
            }
            return res.json(pacient);
        } catch (error) {
            return res.status(500).send(error);
        }

    },
    async update(req, res) {
        try {
            const { _id, name, age, cpf, email, tel, vaccine, vaccinated, vaccinationDate, lotVaccine, away} = req.body;
            const data = { name, age, cpf, email, tel, vaccine, vaccinated, vaccinationDate,lotVaccine, away };
            const pacient = await Pacient.findOneAndUpdate({ _id }, data, { new: true });
            if(pacient === null){
                return res.status(400).send('Not found');
            }
            return res.json(pacient);
        } catch (error) {
            return res.status(500).send(error);
        }

    }
}