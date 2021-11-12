import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Title from '../../../components/Title';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import RegisterVaccine from './RegisterVaccine';

import api from '../../../services/api';

export default function VaccineForm() {

    const [name, setName] = useState('');
    const [lotNumber, setLotNumber] = useState('');
    const [quantity, setQuantity] = useState('');
    const [input, setInput] = useState('');

    async function handleSubmit() {

        const data = {
            name: name,
            lotNumber: lotNumber,
            quantity: quantity,
            input: input,
        }

        if (name !== '' && lotNumber !== '' && quantity !== '' && input !== '') {
            const response = await api.post('/api/vaccine', data);

            if (response.status === 200) {
                alert('Cadastrado com sucesso!');
                window.location.reload();
            }
            else {
                alert('Erro ao cadastrar o usuário')
            }
        }
        else {
            alert('Por favor, preencher os campos');
        }
    }

    function clearForm() {
        setName('');
        setLotNumber('');
        setQuantity('');
        setInput('');
    }

    return (
        <React.Fragment>
            <Title>Cadastrar vacina</Title>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome da vacina"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={ e => setName(e.target.value) }
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="lotNumber"
                        name="lotNumber"
                        label="Lote da vacina"
                        fullWidth
                        variant="standard"
                        value = {lotNumber}
                        onChange = { e => setLotNumber(e.target.value)}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="quantity"
                        name="quantity"
                        label="Quantidade"
                        fullWidth
                        variant="standard"
                        value = {quantity}
                        onChange = { e => setQuantity(e.target.value) }
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="quantity"
                        name="quantity"
                        label="Entrada"
                        fullWidth
                        variant="standard"
                        value = {input}
                        onChange = { e => setInput(e.target.value) }
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={e => {handleSubmit()}}
                        >
                            Cadastrar
                        </Button>
                        <Button
                            variant="contained"
                            onClick={e => { clearForm() }}
                            sx={{ ml: 1 }}
                        >
                            Cancelar
                        </Button>
                    </Box>
                </Grid>
            </Grid>
            <Grid item xs={12} mt={3}>
                <hr color="#2A4E6E" />
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <RegisterVaccine />
                </Paper>
            </Grid>
        </React.Fragment>
    );
}