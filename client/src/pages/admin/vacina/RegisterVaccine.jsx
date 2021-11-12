import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../components/Title';
import Button from '@mui/material/Button';

import api from '../../../services/api';

export default function RegisterVaccine() {

    const [vaccines, setVaccines] = useState([]);

    useEffect(() => {
        async function loadVaccine() {
            const response = await api.get('api/vaccine');
            const orderList = response.data.sort((a, b) =>
                    (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0)
                );
            setVaccines(orderList);
        }
        loadVaccine();
    }, []);

    async function handleDelete(id) {
        if (window.confirm("Deseja realmente excluir? ")) {
            const response = await api.delete('/api/vaccine/' + id);
            if (response.status === 200) {
                alert("A vacina foi removido com sucesso");
                window.location.reload();
            }
            else {
                alert("Ocorreu um erro. Por favor, tente novamente");
            }
        }
    }

    return (
        <React.Fragment>
            <Title>Vacina cadastrada</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Data de registro</TableCell>
                        <TableCell align="center">Vacina</TableCell>
                        <TableCell align="center">Lote</TableCell>
                        <TableCell align="center">Estoque</TableCell>
                        <TableCell align="center">Quantidade de entrada</TableCell>
                        <TableCell align="center">Editar</TableCell>
                        <TableCell align="center">Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {vaccines.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.lotNumber}</TableCell>
                            <TableCell align="center">{row.quantity}</TableCell>
                            <TableCell align="center">{row.input}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    href={"/admin/vaccineEdit/" + row._id}
                                >
                                    Editar
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => { handleDelete(row._id) }}
                                >
                                    Deletar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}