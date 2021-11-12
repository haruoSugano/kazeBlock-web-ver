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
import Calendar from '../pages/admin/calendario/Calendar';
import Reschedule from '../pages/admin/reagendar/Reschedule';
import PrivateRoute from '../services/wAuth';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Login}/>
                <PrivateRoute path="/admin" exact component={Home}/>
                <PrivateRoute path="/admin/start" exact component={Start}/>
                <PrivateRoute path="/admin/agend" exact component={Agend}/>
                <PrivateRoute path="/admin/vaccine" exact component={Vaccine}/>
                <PrivateRoute path="/admin/register" exact component={RegisterUser}/>
                <PrivateRoute path="/admin/report" exact component={Report}/>
                <PrivateRoute path="/admin/userEdit/:idUser" exact component={UserEdit} />
                <PrivateRoute path="/admin/pacientEdit/:idPacient" exact component={PacientEdit} />
                <PrivateRoute path="/admin/vaccineEdit/:idVaccine" exact component={VaccineEdit} />
                <PrivateRoute path="/admin/vaccine/confirm" exact component={VaccineConfirm} />
                <PrivateRoute path="/admin/calendar" exact component={Calendar} />
                <PrivateRoute path="/admin/reschedule" exact component={Reschedule} />
                
            </Switch>
        </BrowserRouter>
    );
}