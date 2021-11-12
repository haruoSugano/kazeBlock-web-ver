import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RegisterPacient from './RegisterPacient';
import Title from '../../../components/Title';

import api from '../../../services/api';

export default function PacientForm() {

    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [cpf, setCpf] = useState('');
    const [email, setEmail] = useState('');
    const [tel, setTel] = useState('');

    async function handleSubmit() {

        const data = {
            name: name,
            age: age,
            cpf: cpf,
            email: email,
            tel: tel
        }

        if (name !== '' && age !== '' && cpf !== '' && email !== '' && tel !== '') {
            const response = await api.post('/api/pacient', data);

            if (response.status === 200) {
                alert('Cadastrado com sucess!');
                window.location.reload(); 
                setName('');
                setAge('');
                setCpf('');
                setEmail('');
                setTel('');
            }
            else {
                alert('Erro ao cadastrar o usuário');
            }
        }
        else {
            alert('Por favor, preencher os campos');
        }
    }

    function clearForm() {
        setName('');
        setAge('');
        setCpf('');
        setEmail('');
        setTel('');
    }
    
    return (
        <React.Fragment>
            <Title>Cadastrar paciente</Title>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={10}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome"
                        type='text'
                        fullWidth
                        variant="standard"
                        value= {name}
                        onChange={e => setName(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={2}>
                    <TextField
                        required
                        id="age"
                        name="age"
                        label="Idade"
                        type='number'
                        fullWidth
                        variant="standard"
                        value={age}
                        onChange={e => setAge(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="E-mail"
                        type='email'
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={ e=> setEmail(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        id="cpf"
                        name="cpf"
                        label="CPF"
                        fullWidth
                        autoComplete="shipping address-line2"
                        variant="standard"
                        value={cpf}
                        onChange={ e=> setCpf(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        required
                        id="telephone"
                        name="telephone"
                        label="Telefone"
                        fullWidth
                        autoComplete="shipping address-level2"
                        variant="standard"
                        value={tel}
                        onChange={ e => setTel(e.target.value)}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={e => { handleSubmit()}}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            variant="contained"
                            sx={{ ml: 1 }}
                            onClick = {e => { clearForm()}}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={3}>
                <hr color="#2A4E6E" />
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <RegisterPacient />
                </Paper>
            </Grid>
        </React.Fragment>
    );
    
}