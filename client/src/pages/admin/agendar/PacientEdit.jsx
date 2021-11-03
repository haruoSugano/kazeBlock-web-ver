import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
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
import api from '../../../services/api';
import Title from '../../../components/Title';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';

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

function PacientEdit() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [name_pacient, setName] = useState('');
    const [age_pacient, setAge] = useState('');
    const [cpf_pacient, setCpf] = useState('');
    const [email_pacient, setEmail] = useState('');
    const [tel_pacient, setTel] = useState('');

    const { idPacient } = useParams();

    useEffect(() => {
        async function getPacient() {
            const response = await api.get('/api/pacient-details/' + idPacient);

            setName(response.data.name);
            setAge(response.data.age);
            setCpf(response.data.cpf);
            setEmail(response.data.email);
            setTel(response.data.tel);
        }

        getPacient();
    }, [idPacient]);

    async function handleSubmit() {

        const data = {
            name: name_pacient,
            age: age_pacient,
            cpf: cpf_pacient,
            email: email_pacient,
            tel: tel_pacient,
            vaccine: '',
            vaccinated: false,
            _id: idPacient
        }

        if (name_pacient !== '' && age_pacient !== '' && 
        cpf_pacient !== '' && email_pacient !== '' && tel_pacient !== '') {
            const response = await api.put('/api/pacient', data);

            if (response.status === 200) {
                alert('Atualizado com sucess!');
                window.location.href = '/admin/agend';
                setName('');
                setAge('');
                setCpf('');
                setEmail('');
                setTel('');
            }
            else {
                alert('Erro ao atualizar o paciente');
            }
        }
        else {
            alert('Por favor, preencher os campos');
        }
    }

    function clearForm() {
        setName('');
        setAge('');
        setCpf('');
        setEmail('');
        setTel('');
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
                            Editar paciente
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
                    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                                    <Title>Editar os dados do paciente</Title>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={10}>
                                            <TextField
                                                required
                                                id="name"
                                                name="name"
                                                label="Nome"
                                                type='text'
                                                fullWidth
                                                variant="standard"
                                                value={name_pacient}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={2}>
                                            <TextField
                                                required
                                                id="age"
                                                name="age"
                                                label="Idade"
                                                type='number'
                                                fullWidth
                                                variant="standard"
                                                value={age_pacient}
                                                onChange={e => setAge(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                required
                                                id="email"
                                                name="email"
                                                label="E-mail"
                                                type='email'
                                                fullWidth
                                                variant="standard"
                                                value={email_pacient}
                                                onChange={e => setEmail(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12}>
                                            <TextField
                                                id="cpf"
                                                name="cpf"
                                                label="CPF"
                                                fullWidth
                                                autoComplete="shipping address-line2"
                                                variant="standard"
                                                value={cpf_pacient}
                                                onChange={e => setCpf(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                required
                                                id="telephone"
                                                name="telephone"
                                                label="Telefone"
                                                fullWidth
                                                autoComplete="shipping address-level2"
                                                variant="standard"
                                                value={tel_pacient}
                                                onChange={e => setTel(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={e => { handleSubmit() }}
                                                >
                                                    Atualizar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    href={'/admin/agend'}
                                                    sx={{ ml: 1 }}
                                                    onClick={e => { clearForm() }}
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
    return <PacientEdit />;
}