import React from 'react';
import { Link } from 'react-router-dom';
import './style.css';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import HomeIcon from '@mui/icons-material/Home';
import ListAltIcon from '@mui/icons-material/ListAlt';
import BarChartIcon from '@mui/icons-material/BarChart';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import AssignmentIcon from '@mui/icons-material/Assignment';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

export const mainListItems = (
    <div>
        <Link to="/admin/home">
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
    <div>
        <ListSubheader inset>Relatórios</ListSubheader>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Current month" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Last quarter" />
        </ListItem>
        <ListItem button>
            <ListItemIcon>
                <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="Year-end sale" />
        </ListItem>
    </div>
);