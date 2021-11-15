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
            const vaccinatedList = orderList.filter(x => x.vaccinated !== true && x.absent === true);
            setPacient(vaccinatedList);
            console.log()
        }
        loadPacient();
    }, []);

    async function handleDelete(pacient, absent) {

        const data = {
            name: pacient.name,
            age: pacient.age,
            email: pacient.email,
            cpf: pacient.cpf,
            tel: pacient.tel,
            vaccine: null,
            vaccinated: false,
            lotVaccine: 0,
            vaccinationDate: null,
            absent: absent,
            _id: pacient._id
        }
        console.log(data)
        if (absent !== true) {
            if (window.confirm("Deseja realemnte remarcar?")) {
                const response = await api.put('/api/pacient', data);
                if (response.status === 200) {
                    alert("Paciente remarcado com sucesso");
                    window.location.reload();
                }
                else {
                    alert("Ocorreu um erro. Por favor, tente novamente. ");
                }
            }
        }
        else {
            alert("Ocorreu algum erro, por favor tente novamente");
        }

    }

    return (
        <React.Fragment>
            <Title>Lista de paciente</Title>
            <Table size="small">
                <TableHead>
                    <TableRow>
                        <TableCell align="center">N°</TableCell>
                        <TableCell align="center">Nome</TableCell>
                        <TableCell align="center">CPF</TableCell>
                        <TableCell align="center">Idade</TableCell>
                        <TableCell align="center">Ausente</TableCell>
                        <TableCell align="center">Vacinado</TableCell>
                        <TableCell align="center">Confirme</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {pacient.map((row, idx) => (
                        <TableRow key={row._id}>
                            <TableCell align="center">{idx + 1}</TableCell>
                            <TableCell align="center">{row.name}</TableCell>
                            <TableCell align="center">{row.cpf}</TableCell>
                            <TableCell align="center">{row.age}</TableCell>
                            <TableCell align="center">{row.absent === true ? "Sim" : "Não"}</TableCell>
                            <TableCell align="center">{(row.vaccinated) === true ? "Vacinado" : "Pendente"}</TableCell>
                            <TableCell align="center">
                                <Button
                                    variant="contained"
                                    color="success"
                                    onClick={() => handleDelete(row, false)}
                                >
                                    Remarcar
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </React.Fragment>
    );
}