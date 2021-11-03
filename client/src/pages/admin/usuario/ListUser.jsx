import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../components/Title';
import Button from '@mui/material/Button';

import api from '../../../services/api';

export default function Orders() {

    const [users, setUsers] = useState([]);

    useEffect(() => {

        async function loadUsers() {
            const response = await api.get('api/user');
            setUsers(response.data);
        }
        loadUsers();
    }, []);

    async function handleDelete(id){
        if(window.confirm("Deseja realmente excluir este usuário? ")){
            const response = await api.delete('/api/user/'+ id);
            if(response.status === 200){
                alert("Usuário removido com sucesso");
                window.location.reload();
            }
            else{
                alert("Ocorreu um erro. Por favor, tente novamente");
            }
        }
    }

    return (
        <React.Fragment>
            <Title>Lista de Usuários</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">E-mail</TableCell>
                        <TableCell align="center">Tipo</TableCell>
                        <TableCell align="center">Editar</TableCell>
                        <TableCell align="center">Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {users.map((row) => (
                        <TableRow key={row._id}>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.cpf}</TableCell>
                            <TableCell align="center">{row.email}</TableCell>
                            <TableCell align="center">{(row.type) === 1 ? "Administrador" : "Atendente"}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    href={ '/admin/userEdit/' + row._id}
                                >
                                    Editar
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button onClick={() => handleDelete(row._id)} variant="contained" color="error">Deletar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}