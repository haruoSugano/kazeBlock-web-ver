import React, { useState, useEffect } from 'react';
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
import Title from '../../../components/Title';
import { TextField, MenuItem, Button, FormControl, Select, InputLabel } from '@mui/material';
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

function Start() {
    const [open, setOpen] = React.useState(true);
    const toggleDrawer = () => {
        setOpen(!open);
    };

    const [name, setName] = useState('');
    const [cpf, setCpf] = useState('');
    const [type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const { idUser } = useParams();

    useEffect(() => {
        async function getUser(){
            const response = await api.get('/api/user-details/' + idUser);

            setName(response.data.name);
            setCpf(response.data.cpf);
            setType(response.data.type);
            setEmail(response.data.email);
            setPassword(response.data.password);
        }
        getUser();
    },[idUser]);

    async function handleSubmit() {

        const data = {
            name: name,
            cpf: cpf,
            type: type,
            email: email,
            password: password,
            _id: idUser
        }

        if (name !== '' && cpf !== '' && type !== '' && email !== '' && password !== '') {
            const response = await api.put('/api/user', data);
            
            if (response.status === 200) {
                alert('Atualizado com sucesso')
                window.location.href = '/admin/register';
            }
            else {
                alert('Erro ao atualizar o usuário');
            }
        }
        else {
            alert('Por favor, preencher os campos');
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
                            Iniciar
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
                                    <Title>Cadastrar usuário</Title>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="name"
                                                name="name"
                                                label="Nome"
                                                fullWidth
                                                variant="standard"
                                                value={name}
                                                onChange={e => setName(e.target.value)}

                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                id="cpf"
                                                name="cpf"
                                                label="CPF"
                                                maxLength='14'
                                                fullWidth
                                                variant="standard"
                                                value={cpf}
                                                onChange={e => setCpf(e.target.value)}
                                                inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}

                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                id="email"
                                                name="email"
                                                label="E-mail"
                                                fullWidth
                                                variant="standard"
                                                value={email}
                                                onChange={e => setEmail(e.target.value)}

                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                id="password"
                                                name="password"
                                                label="Senha"
                                                type="password"
                                                fullWidth
                                                variant="standard"
                                                value={password}
                                                onChange={e => setPassword(e.target.value)}

                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <FormControl sx={{ m: 1, minWidth: 200 }}>
                                                <InputLabel id="demo-simple-select-standard-label">Tipo de usuário</InputLabel>
                                                <Select
                                                    label="Tipo de usuário"
                                                    value={type}
                                                    onChange={e => setType(e.target.value)}
                                                    displayEmpty
                                                    inputProps={{ 'aria-label': 'Without label' }}
                                                >

                                                    <MenuItem value="Tipo">
                                                        <em>Tipo</em>
                                                    </MenuItem>
                                                    <MenuItem value={1}>Administrador</MenuItem>
                                                    <MenuItem value={2}>Atendente</MenuItem>
                                                </Select>
                                            </FormControl>
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={handleSubmit}
                                                >
                                                    Atualizar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    href={'/admin/register'}
                                                    sx={{ ml: 1 }}
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
    return <Start />;
}