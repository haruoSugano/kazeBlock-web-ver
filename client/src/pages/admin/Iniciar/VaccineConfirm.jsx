import React, { useState, useEffect } from 'react';
import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import MuiDrawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { mainListItems, secondaryListItems } from '../../../components/ListItems';
import Title from '../../../components/Title';
import { TextField, Button, InputLabel, FormControl, Select, MenuItem } from '@mui/material';
import api from '../../../services/api';

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

const drawerWidth = 240;

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative',
            whiteSpace: 'nowrap',
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box',
            ...(!open && {
                overflowX: 'hidden',
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7),
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9),
                },
            }),
        },
    }),
);

const mdTheme = createTheme();

function VaccineConfirm() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [pacient, setPacient] = useState('');
    const date = new Date().toLocaleString('pt-br');

    const [vaccines, setVaccines] = useState('');
    const [absent, setAbsent] = useState(false);

    useEffect(() => {

        async function loadPacient() {
            const response = await api.get('api/pacient');
            const orderList = response.data.sort((a, b) => (a.age > b.age) ? -1 : ((b.age > a.age) ? 1 : 0));
            const filterList = orderList.filter((x) => x.vaccinated !== true && x.absent !== true);

            if (filterList.length > 0) {
                return setPacient(filterList[0]);
            }
            return setPacient('');
        }

        loadPacient();

        async function loadVaccine() {
            const response = await api.get('api/vaccine');
            const orderList = response.data.sort((a, b) => (a.createdAt > b.createdAt) ? 1 : ((b.createdAt > a.createdAt) ? -1 : 0));
            const filterList = orderList.filter((x) => (x.quantity > 0));

            if (filterList.length > 0) {
                return setVaccines(filterList[0]);
            }

            return setVaccines('');
        }

        loadVaccine();

    }, []);

    async function handleSubmit() {

        const dataPacient = {
            name: pacient.name,
            age: pacient.age,
            email: pacient.email,
            cpf: pacient.cpf,
            tel: pacient.tel,
            vaccine: vaccines.name,
            vaccinated: true,
            lotVaccine: vaccines.lotNumber,
            vaccinationDate: new Date(),
            absent: false,
            _id: pacient._id
        }
        console.log(dataPacient)

        if (dataPacient.name !== '' && dataPacient.age !== '' && dataPacient.email && dataPacient.email !== '' &&
            dataPacient.tel !== '' && vaccines.name !== '' && date !== '' && vaccines.lotNumber !== '' && absent !== true && absent !== '') {
                console.log(dataPacient)
            const dataVaccine = {
                name: vaccines.name,
                lotNumber: vaccines.lotNumber,
                quantity: (vaccines.quantity - 1),
                _id: vaccines._id
            }

            const response = await api.put('/api/pacient', dataPacient);
            console.log(response)

            const res = await api.put('/api/vaccine', dataVaccine);
            
            if (response.status === 200 && res.status === 200) {
                alert('Vacinação confirmado');
                window.location.reload();
            }
            else if (dataVaccine.quantity === 0) {
                alert('Vacinação confirmado');
                window.location.href = '/admin/start';
            }
            else {
                alert('Erro na confirmação');
            }
        }
        else {
            alert('Ocorreu um erro')
        }
    }

    async function handleAbsent() {

        const dataPacient = {
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

        if (absent === true) {
            const response = await api.put('/api/pacient', dataPacient);

            if (response.status === 200) {
                alert('Ausência confirmada, este paciente foi movido para lista de espera.');
                window.location.reload();
            }
            else {
                alert('Erro na confirmação');
            }
        }
        else {
            alert("Por favor, confirme a ausência corretamente.");
        }

    }

    return (
        <ThemeProvider theme={mdTheme}>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                <AppBar position="absolute" open={open}>
                    <Toolbar
                        sx={{
                            pr: '24px', // keep right padding when drawer closed
                        }}
                    >
                        <IconButton
                            edge="start"
                            color="inherit"
                            aria-label="open drawer"
                            onClick={toggleDrawer}
                            sx={{
                                marginRight: '36px',
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <MenuIcon />
                        </IconButton>
                        <Typography
                            component="h1"
                            variant="h6"
                            color="inherit"
                            noWrap
                            sx={{ flexGrow: 1 }}
                        >
                            Confirmar a vacinação
                        </Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" open={open}>
                    <Toolbar
                        sx={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            px: [1],
                        }}
                    >
                        <IconButton onClick={toggleDrawer}>
                            <ChevronLeftIcon />
                        </IconButton>
                    </Toolbar>
                    <Divider />
                    <List>{mainListItems}</List>
                    <Divider />
                    <List>{secondaryListItems}</List>
                </Drawer>
                <Box
                    component="main"
                    sx={{
                        backgroundColor: (theme) =>
                            theme.palette.mode === 'light'
                                ? theme.palette.grey[100]
                                : theme.palette.grey[900],
                        flexGrow: 1,
                        height: '100vh',
                        overflow: 'auto',
                    }}
                >
                    <Toolbar />

                    <Container maxWidth="lg" sx={{ mt: 2, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Title>Dados do paciente</Title>
                                    <Grid container spacing={1}>
                                        <Grid item xs={12} sm={10}>
                                            <InputLabel>
                                                Nome
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="name"
                                                name="name"
                                                fullWidth
                                                value={pacient.name || ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <InputLabel>
                                                Idade
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="age"
                                                name="age"
                                                type='number'
                                                fullWidth
                                                value={pacient.age || ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputLabel>
                                                E-mail
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="email"
                                                name="email"
                                                type='email'
                                                fullWidth
                                                value={pacient.email || ''}

                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <InputLabel>
                                                CPF
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="cpf"
                                                name="cpf"
                                                fullWidth
                                                autoComplete="shipping address-line2"
                                                value={pacient.cpf || ''}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel>
                                                Telefone
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="telephone"
                                                name="telephone"
                                                fullWidth
                                                value={pacient.tel || ''}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel>
                                                Vacinado?
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="vaccinated"
                                                name="vaccinated"
                                                fullWidth
                                                value={(pacient.vaccinated === false ? "Pendente" : "Vacinado") || ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel>
                                                Data de hoje
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="vaccinationDate"
                                                name="vaccinationDate"
                                                fullWidth
                                                value={date}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <InputLabel>
                                                Vacina
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="vaccine"
                                                name="vaccine"
                                                fullWidth
                                                value={vaccines.name || ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <InputLabel>
                                                Lote N°
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="lotNumber"
                                                name="lotNumber"
                                                fullWidth
                                                value={vaccines.lotNumber || ''}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={3}>
                                            <InputLabel>
                                                Dose
                                            </InputLabel>
                                            <TextField
                                                disabled
                                                id="quantity"
                                                name="quantity"
                                                fullWidth
                                                value={1}
                                            />
                                        </Grid>
                                        <Grid item xs={3}>
                                            <FormControl sx={{ m: 3, minWidth: 200 }} error>
                                                <InputLabel id="demo-simple-select-standard-label">Presente/Ausente</InputLabel>
                                                <Select
                                                    label="Presente/Ausente"
                                                    value={absent}
                                                    onChange={e => setAbsent(e.target.value)}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >

                                                    <MenuItem value={false}>
                                                        Presente
                                                    </MenuItem>
                                                    <MenuItem value={true}>Ausente</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleSubmit}
                                                >
                                                    Confirmar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="warning"
                                                    sx={{ ml: 1 }}
                                                    onClick={handleAbsent}
                                                >
                                                    Ausente
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    color="success"
                                                    sx={{ ml: 1 }}
                                                    href={'/admin/start'}
                                                >
                                                    Voltar
                                                </Button>
                                            </Box>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            </Grid>
                        </Grid>
                        <Copyright sx={{ pt: 4 }} />
                    </Container>
                </Box>
            </Box>
        </ThemeProvider>
    );
}

export default function Dashboard() {
    return <VaccineConfirm />;
}