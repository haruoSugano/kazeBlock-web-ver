import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Title from '../../../components/Title';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';
import ListUser from './ListUser';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';

import api from '../../../services/api';

export default function AddressForm() {

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    async function handleSubmit() {

        const data = {
            name: name,
            cpf: cpf,
            type: type,
            email: email,
            password: password
        }

        if (name !== '' && cpf !== '' && type !== '' && email !== '' && password !== '') {
            const response = await api.post('/api/user', data);
            
            if (response.status === 200) {
                alert('Cadastrado com sucesso')
                window.location.reload();
                setName('');
                setCpf('');
                setEmail('');
                setType('');
                setPassword('');
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
        setCpf('');
        setEmail('');
        setType('');
        setPassword('');
    }



    return (
        <React.Fragment>
            <Title>Cadastrar usuário</Title>
            <Grid container spacing={3}>
                <Grid item xs={12} sm={12}>
                    <TextField
                        required
                        id="name"
                        name="name"
                        label="Nome"
                        fullWidth
                        variant="standard"
                        value={name}
                        onChange={e => setName(e.target.value)}

                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="cpf"
                        name="cpf"
                        label="CPF"
                        maxLength='14'
                        fullWidth
                        variant="standard"
                        value={cpf}
                        onChange={e => setCpf(e.target.value)}
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="email"
                        name="email"
                        label="E-mail"
                        fullWidth
                        variant="standard"
                        value={email}
                        onChange={e => setEmail(e.target.value)}

                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        required
                        id="password"
                        name="password"
                        label="Senha"
                        type="password"
                        fullWidth
                        variant="standard"
                        value={password}
                        onChange={e => setPassword(e.target.value)}

                    />
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{ m: 1, minWidth: 200 }}>
                        <InputLabel id="demo-simple-select-standard-label">Tipo de usuário</InputLabel>
                        <Select
                            label="Tipo de usuário"
                            value={type}
                            onChange={e => setType(e.target.value)}
                            displayEmpty
                            inputProps={{ 'aria-label': 'Without label' }}
                        >

                            <MenuItem value="Tipo">
                                <em>Tipo</em>
                            </MenuItem>
                            <MenuItem value={1}>Administrador</MenuItem>
                            <MenuItem value={2}>Atendente</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} sm={12}>
                    <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="contained"
                            onClick={handleSubmit}
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
                    <ListUser />
                </Paper>
            </Grid>
        </React.Fragment>
    );
}