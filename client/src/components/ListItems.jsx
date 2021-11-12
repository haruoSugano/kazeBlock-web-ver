import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import TodayIcon from '@mui/icons-material/Today';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import api from '../services/api';
import { logout, getToken } from '../services/auth'

export const mainListItems = (
    <div>
        <Link to="/admin">
            <ListItem button>
                <ListItemIcon>
                    <HomeIcon />
                </ListItemIcon>
                <ListItemText primary="Home" />
            </ListItem>
        </Link>
        <Link to="/admin/start">
            <ListItem button>
                <ListItemIcon>
                    <PlayCircleFilledIcon />
                </ListItemIcon>
                <ListItemText primary="Iniciar" />
            </ListItem>
        </Link>
        <Link to="/admin/agend">
            <ListItem button>
                <ListItemIcon>
                    <ListAltIcon />
                </ListItemIcon>
                <ListItemText primary="Agendar" />
            </ListItem>
        </Link>
        <Link to="/admin/reschedule">
            <ListItem button>
                <ListItemIcon>
                    <AppRegistrationIcon />
                </ListItemIcon>
                <ListItemText primary="Reagendar" />
            </ListItem>
        </Link>
        <Link to="/admin/vaccine">
            <ListItem button>
                <ListItemIcon>
                    <LocalHospitalIcon />
                </ListItemIcon>
                <ListItemText primary="Vacina" />
            </ListItem>
        </Link>
        <Link to="/admin/report">
            <ListItem button>
                <ListItemIcon>
                    <BarChartIcon />
                </ListItemIcon>
                <ListItemText primary="Relatório" />
            </ListItem>
        </Link>
        <Link to="/admin/register">
            <ListItem button>
                <ListItemIcon>
                    <GroupAddIcon />
                </ListItemIcon>
                <ListItemText primary="+ Usuário" />
            </ListItem>
        </Link>
    </div>
);

export const secondaryListItems = (
    <React.Fragment>
        <Link to="/admin/calendar">
            <ListItem >
                <ListItemIcon>
                    <TodayIcon />
                </ListItemIcon>
                <ListItemText primary="Calendário" />
            </ListItem>
        </Link>
        <ListItem button onClick={exit}>
            <ListItemIcon>
                <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary="Sair" />
        </ListItem>
    </React.Fragment>
);

async function exit(){
    if(window.confirm("Deseja realmente sair do sistema? ")){
        const response = await api.get('/api/user/destroyerToken', { headers: { token: getToken() }});
        
        if(response.status === 200 ){
            logout();
            window.location.href = "/";
        }
        else {
            alert("Ocorreu algum erro, não foi possível fazer o logout")
        }
    }
}