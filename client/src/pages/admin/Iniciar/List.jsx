import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../components/Title';

import api from '../../../services/api';

// lembrete: adicionar data, quando a quantidade zerar tirar da lista.

export default function Orders() {

    const [pacient, setPacient] = useState([]);

    useEffect(() => {

        async function loadPacient() {
            const response = await api.get('api/pacient');
            const orderList = response.data.sort((a, b) => (a.age > b.age) ? -1 : ((b.age > a.age) ? 1 : 0));
            const filterPacient = orderList.filter(pacient => pacient.vaccinated !== true);
            setPacient(filterPacient);
        }
        loadPacient();

    }, []);

    return (
        <React.Fragment>
            <Title>Fila de vacinação</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Sequência</TableCell>
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Idade</TableCell>
                        <TableCell align="center">Vacina</TableCell>
                        <TableCell align="center">Vacinado</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pacient.map((row, idx) => (
                        <TableRow key={row._id}>
                            <TableCell align="center">{(idx + 1)}</TableCell>
                            <TableCell align="center">{row.cpf}</TableCell>
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