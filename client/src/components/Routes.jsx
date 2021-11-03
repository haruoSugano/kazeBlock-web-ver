import React from "react";

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Login from '../pages/login/Login';

//ADMIN
import Home from '../pages/admin/home/Home';
import Start from '../pages/admin/Iniciar/Start';
import Agend from '../pages/admin/agendar/Agend';
import Vaccine from '../pages/admin/vacina/Vaccine';
import RegisterUser from '../pages/admin/usuario/RegisterUser';
import Report from '../pages/admin/report/Report';
import PacientEdit from '../pages/admin/agendar/PacientEdit';
import UserEdit from '../pages/admin/usuario/UserEdit';
import VaccineEdit from '../pages/admin/vacina/VaccineEdit';
import VaccineConfirm from '../pages/admin/Iniciar/VaccineConfirm';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <Route path="/admin/home" exact component={Home}/>
                <Route path="/admin/start" exact component={Start}/>
                <Route path="/admin/agend" exact component={Agend}/>
                <Route path="/admin/vaccine" exact component={Vaccine}/>
                <Route path="/admin/register" exact component={RegisterUser}/>
                <Route path="/admin/report" exact component={Report}/>
                <Route path="/admin/userEdit/:idUser" exact component={UserEdit} />
                <Route path="/admin/pacientEdit/:idPacient" exact component={PacientEdit} />
                <Route path="/admin/vaccineEdit/:idVaccine" exact component={VaccineEdit} />
                <Route path="/admin/vaccine/:idVaccine" exact component={VaccineConfirm} />
            </Switch>
        </BrowserRouter>
    );
}