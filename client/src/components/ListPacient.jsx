import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './Title';

import api from '../services/api';

export default function Orders() {

    const [ pacient, setPacient] = useState([]);

    useEffect( () => {

        async function loadPacient() {
            const response = await api.get('api/pacient');
            setPacient(response.data.sort((a, b) => (a.age > b.age) ? -1 : ((b.age > a.age) ? 1 : 0)));//ordenando
        }
        loadPacient();
    }, []);

    return (
        <React.Fragment>
            <Title>Lista de paciente</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Data de cadastro</TableCell>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Idade</TableCell>
                        <TableCell align="center">Vacina</TableCell>
                        <TableCell align="center">Vacinado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pacient.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.age}</TableCell>
                            <TableCell align="center">{row.vaccine}</TableCell>
                            <TableCell align="center">{(row.vaccinated) === true ? "Vacinado" : "Pendente"}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}