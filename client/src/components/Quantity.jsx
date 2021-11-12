import React, { useState, useEffect } from 'react';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import api from '../services/api';

export default function Deposits() {

  const date = new Date().toLocaleDateString('pt-br');

  const [pacientsVaccinated, setPacientsVaccinated] = useState([]);
  const [pacients, setPacients] = useState([]);

  useEffect(() => {

    async function loadPacientVaccinated(){
      const response = await api.get('/api/pacient');
      const filterList = response.data.filter(x => x.vaccinated === true);
      setPacientsVaccinated(filterList);
    }

    loadPacientVaccinated();

    async function loadPacient(){
      const response = await api.get('/api/pacient');
      setPacients(response.data);
    }

    loadPacient();
  }, []);

  return (
    <React.Fragment>
      <hr />
      <Typography component="p" variant="h5">
       {(pacientsVaccinated.length*100/pacients.length).toFixed(1)}% das pessoas foram vacinadas
      </Typography>
      <hr />
      <Typography color="text.secondary" sx={{ flex: 1 }}>
        Até a data atual {date}
      </Typography>
      <div>
        <Link color="primary" href="/admin/report" >
          Dados
        </Link>
      </div>
    </React.Fragment>
  );
}