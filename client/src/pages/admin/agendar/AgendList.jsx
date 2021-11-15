import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from '../../../components/Title';
import Button from '@mui/material/Button';
import api from '../../../services/api';

export default function AgendList() {

    const [pacient, setPacient] = useState([]);

    useEffect(() => {

        async function loadPacient() {
            const response = await api.get('api/pacient');
            const orderList = response.data.sort((a, b) => (a.createdAt > b.createdAt) ? -1 : ((b.createdAt > a.createdAt) ? 1 : 0));
            const vaccinatedList = orderList.filter(x => x.vaccinated !== true && x.absent === false);
            setPacient(vaccinatedList);
        }
        loadPacient();
    }, []);

    async function handleDelete(id) {
        if (window.confirm("Deseja realemnte excluir este paciente? ")) {
            const response = await api.delete('/api/pacient/' + id);
            if (response.status === 200) {
                alert("Paciente deletado com sucesso");
                window.location.reload();
            }
            else {
                alert("Ocorreu um erro. Por favor, tente novamente. ");
            }
        }
    }

    return (
        <React.Fragment>
            <Title>Lista de paciente</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">N°</TableCell>
                        <TableCell align="center">Data de cadastro</TableCell>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">Idade</TableCell>
                        <TableCell align="center">Vacina</TableCell>
                        <TableCell align="center">Vacinado</TableCell>
                        <TableCell align="center">Editar</TableCell>
                        <TableCell align="center">Deletar</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pacient.map((row, idx) => (
                        <TableRow key={row._id}>
                            <TableCell align="center">{idx + 1}</TableCell>
                            <TableCell align="center">{new Date(row.createdAt).toLocaleString('pt-br')}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.age}</TableCell>
                            <TableCell align="center">{row.vaccine}</TableCell>
                            <TableCell align="center">{(row.vaccinated) === true ? "Vacinado" : "Pendente"}</TableCell> 
                              
                            <TableCell align="center">
                                <Button
                                    href={'/admin/pacientEdit/' + row._id}
                                    variant="contained"
                                >
                                    Editar
                                </Button>
                            </TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color="error"
                                    onClick={() => handleDelete(row._id)}
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