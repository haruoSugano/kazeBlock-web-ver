const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mailer = require('../modules/mailer');
const crypto = require('crypto');
const secret = 'mysecret';

module.exports = {

    async index(req, res) {
        try {
            const user = await User.find();

            if (user.length === 0) {
                return res.status(400).send('No registered user');
            }
            user.password = undefined;
            res.json(user);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    async details(req, res) {
        try {
            const { _id } = req.params;
            const user = await User.findOne({ _id });
            if (user.lenght === 0) {
                return res.status(400).send('User not found');
            }
            user.password = undefined;
            res.json(user);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    async create(req, res) {
        const { email, cpf } = req.body;
        try {
            if (await User.findOne({ email })) {
                return res.status(400).send({ error: 'Email not found' });
            }
            else if (await User.findOne({ cpf })) {
                return res.status(400).send({ error: 'CPF not found' });
            }

            const user = await User.create(req.body);

            user.password = undefined; // Para não retornar a senha (segurança)

            return res.send({
                user,

            });
        } catch (error) {
            return res.status(400).send({ error: "Error " });
        }
    },
    async delete(req, res) {
        try {
            const { _id } = req.params;
            const user = await User.findByIdAndDelete({ _id });
            if (user.lenght === 0) {
                return res.status(400).send('User not found');
            }
            user.password = undefined;
            return res.json(user);
        } catch (error) {
            return res.status(500).send(error);
        }

    },
    async update(req, res) {
        try {
            const { _id, name, cpf, type, email, password, date } = req.body;
            const data = { name, cpf, type, email, password, date };
            const user = await User.findOneAndUpdate({ _id }, data, { new: true });
            if (user === null) {
                return res.status(400).send('User not found');
            }
            user.password = undefined;
            return res.json(user);
        } catch (error) {
            return res.status(500).send(error);
        }
    },
    async authenticate(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select('+password');

        if (!user) {
            return res.status(400).send({ error: 'User not found' });
        }
        if (!await bcrypt.compare(password, user.password)) {
            return res.status(400).send({ error: 'Invalid password' });
        }
        // user.password = undefined;

        const payload = { email };
        const token = jwt.sign(payload, secret, {
            expiresIn: '24h'
        });
        res.cookie('token', token, { httpOnly: true });
        res.status(200).json({
            status: 1,
            auth: true,
            token: token,
            id_user: user._id,
            user_name: user.name
        });
    },
    async forgotPassword(req, res) {
        const { email } = req.body;
        try {
            const user = await User.findOne({ email });
            console.log(user.email);
            if (!user) {
                return res.status(400).send({ error: 'User not found' });
            }

            const token = crypto.randomBytes(20).toString('hex');

            const now = new Date();
            now.setHours(now.getHours() + 1);

            await User.findByIdAndUpdate(user.id, {
                '$set': {
                    passwordResetToken: token,
                    passwordResetExpires: now,
                }
            });

            mailer.sendMail({
                to: user.email,
                from: 'haruosugano@icloud.com',
                template: 'auth/forgot_password',
                context: { token }
            }, (err) => {
                if (err) {
                    console.log(err);
                    return res.status(400).send({ error: 'Cannot send forgot password email' });
                }
                return res.send();
            });
        } catch (error) {
            console.log(error);
            return res.status(400).send({ error: 'Erro on forgot password, try again' });
        }
    },
    async resetPassword(req, res) {
        const { email, token, password } = req.body;

        try {
            const user = await User.findOne({ email })
                .select('+passwordResetToken passwordResetExpires');
            
            if(!user) {
                return res.status(400).send({ error: 'User not found' });
            }

            if(token !== user.passwordResetToken) {
                return res.status(400).send({ error: 'Token invalid' });
            }

            const now = new Date();

            if(now > user.passwordResetExpires){
                return res.status(400).send({ error: 'Token expired, generate a new one '});
            }

            user.password = password;

            await user.save();

            res.send();
        } catch (error) {
            res.status(400).send({ error: 'Cannot reset password, try again' });
        }
    },
    async checkToken(req, res) {
        try {
            const token = req.body.token || req.query.token || req.cookie.token || req.headers['x-access-token'];
            if (!token) {
                return res.json({ status: 401, msg: 'Token invalid' });
            }
            else {
                jwt.verify(token, secret, function (err, decoded) {
                    if (err) {
                        return res.json({ status: 401, msg: 'Token invalid' });
                    }
                    else {
                        return res.json({ status: 200, msg: 'Token valid' });
                    }
                });
            }
        } catch (error) {
            return res.status(500).send(error);
        }

    },
    async destroyerToken(req, res) {
        try {
            const token = req.headers.token;
            if (token) {
                res.cookie('token', null, { httpOnly: true });
            }
            else {
                return res.status(401).send('Not authorized');
            }
            return res.send({ status: 200, msg: 'Session terminated with success' });
        } catch (error) {
            return res.status(500).send(error);
        }

    },

}