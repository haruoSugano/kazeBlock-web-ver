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

    function vaccine(name, lot){
        let data = pacient.filter( data => data.vaccine === name && data.lotVaccine === lot);
        return data.length;
    }
    
    return (
        <React.Fragment>
            <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell align="center" component="th" scope="row">{ row.lotNumber }</TableCell>
                <TableCell align="center">{ row.name }</TableCell>
                <TableCell align="center">{row.quantity}</TableCell>
                <TableCell align="center">{vaccine(row.name, row.lotNumber)}</TableCell>
                <TableCell align="center">
                    {((vaccine(row.name, row.lotNumber)*100)/row.input).toFixed(2) + '%'}
                </TableCell>
            </TableRow>
        </React.Fragment>
    );
}

export default function CollapsibleTable() {

    const [vaccine, setVaccine] = useState([]);

    useEffect(() => {

        async function loadVaccine() {
            const response = await api.get('api/vaccine');
            setVaccine(response.data);
        }
        loadVaccine();
    }, []);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell align="center" >Lote</TableCell>
                        <TableCell align="center" >Vacina</TableCell>
                        <TableCell align="center">Estoque</TableCell>
                        <TableCell align="center">Aplicado</TableCell>
                        <TableCell align="center">Porcentagem</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody >
                    {vaccine.map((row, idx) => (
                        <Row key={row._id} row={row} i={idx} />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}
