import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Button from '@mui/material/Button';
import Title from '../../../components/Title';
import api from '../../../services/api';

export default function Orders() {

    const [vaccines, setVaccines] = useState('');

    useEffect(() => {

        async function loadVaccine() {
            const response = await api.get('api/vaccine');
            const orderList = response.data.sort((a, b) =>
                (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0)
            );
            const filterList = orderList.filter(x => x.quantity > 0);

            if (filterList.length > 0) {
                return setVaccines(filterList[0]);
            }

            return setVaccines('');
        }
        loadVaccine();

    }, []);

    return (
        <React.Fragment>
            <Title>Vacina de hoje</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Data de registro</TableCell>
                        <TableCell align="center">Vacina</TableCell>
                        <TableCell align="center">Lote</TableCell>
                        <TableCell align="center">Quantidade</TableCell>
                        <TableCell align="center">Iniciar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {

                        vaccines !== '' ? <TableRow key={vaccines._id || ''}>
                            <TableCell align="center">{new Date(vaccines.createdAt).toLocaleString('pt-br') || ''}</TableCell>
                            <TableCell align="center">{vaccines.name || ''}</TableCell>
                            <TableCell align="center">{vaccines.lotNumber || ''}</TableCell>
                            <TableCell align="center">{vaccines.quantity || ''}</TableCell>
                            <TableCell align="center">
                                <Button href={"/admin/vaccine/confirm"} variant="contained">Aplica????o</Button>
                            </TableCell>
                        </TableRow> : <TableRow>
                            <TableCell align="center">Sem data</TableCell>
                            <TableCell align="center">Sem nome</TableCell>
                            <TableCell align="center">Sem vacina</TableCell>
                            <TableCell align="center">Sem quantidade</TableCell>
                            <TableCell align="center">
                                <Button href={"/admin/vaccine"} variant="contained">Cadastrar vacina</Button>
                            </TableCell>
                        </TableRow>
                    }
                </TableBody>
            </Table>
        </React.Fragment>
    );
}