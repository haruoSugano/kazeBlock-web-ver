import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import api from '../../../services/api';

function Row(props) {
    const { row } = props;
    const { i } = props;

    const [pacient, setPacient] = useState([]);

    useEffect(() => {

        async function loadPacient() {
            const response = await api.get('api/pacient');
            const orderList = response.data.sort((a, b) => (a.age > b.age) ? -1 : ((b.age > a.age) ? 1 : 0));
            const vaccinatedList = orderList.filter(x => x.vaccinated === true);
            setPacient(vaccinatedList);
        }
        loadPacient();
    }, []);

    function quantityPacient(i) {
        let quantity = [];
        switch (i + 1) {
            case 1:
                quantity = pacient.filter(x => x.age > 70)
                break;
            case 2:
                quantity = pacient.filter(x => x.age < 71 && x.age > 50);
                break;
            case 3:
                quantity = pacient.filter(x => x.age < 51 && x.age > 18);
                break;
            case 4:
                quantity = pacient.filter(x => x.age < 19);
                break;
            default:
                break;
        }
        return quantity.length;
    }

    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center">{i+1}</TableCell>
                <TableCell align="center" component="th" scope="row">{row}</TableCell>
                <TableCell align="center">{quantityPacient(i)}</TableCell>
                <TableCell align="center">
                    {(quantityPacient(i) * 100 / pacient.length).toFixed(2) + '%'}
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {

    function orderAge() {
        const age = [70, 50, 19, 18];
        let order = [];
        age.forEach((x, idx) => {
            switch (x) {
                case 18:
                    order[idx] = "Idade abaixo de 18 anos";
                    break;
                case 19:
                    order[idx] = "Idade entre 19 a 50 anos";
                    break;
                case 50:
                    order[idx] = "Idade entre 51 a 70 anos";
                    break;
                case 70:
                    order[idx] = "Idade acima de 71 anos";
                    break;
                default:
                    break;
            }
        })
        return order;
    }

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" >Nível de prioridade</TableCell>
                        <TableCell align="center" >Idade</TableCell>
                        <TableCell align="center">Total</TableCell>
                        <TableCell align="center">Porcentagem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {orderAge().map((row, idx) => (
                        <Row key={row} row={row} i={idx} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
