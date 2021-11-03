import React,{ useState, useEffect} from 'react';
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
import { TextField, Button,  } from '@mui/material';
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
    const [lotNumber, setLotNumber] = useState('');
    const [quantity, setQuantity] = useState('');

    const { idVaccine } = useParams();

    useEffect(() => {
        async function getVaccine() {
            const response = await api.get('/api/vaccine-details/' + idVaccine);

            setName(response.data.name);
            setLotNumber(response.data.lotNumber);
            setQuantity(response.data.quantity);
        }
        getVaccine();
    }, [idVaccine]); 

    async function handleSubmit() {

        const data = {
            name: name,
            lotNumber: lotNumber,
            quantity: quantity,
            _id: idVaccine
        }

        if (name !== '' && lotNumber !== '' && quantity !== '') {
            const response = await api.put('/api/vaccine', data);

            if (response.status === 200) {
                alert('Atualizado com sucesso!');
                window.location.href = "/admin/vaccine";
            }
            else {
                alert('Erro ao atualizar')
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
                            Vacina
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
                                    <Title>Cadastrar vacina</Title>
                                    <Grid container spacing={3}>
                                        <Grid item xs={12} sm={12}>
                                            <TextField
                                                required
                                                id="name"
                                                name="name"
                                                label="Nome da vacina"
                                                fullWidth
                                                variant="standard"
                                                value={name}
                                                onChange={e => setName(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                id="lotNumber"
                                                name="lotNumber"
                                                label="Lote da vacina"
                                                fullWidth
                                                variant="standard"
                                                value={lotNumber}
                                                onChange={e => setLotNumber(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={6}>
                                            <TextField
                                                required
                                                id="quantity"
                                                name="quantity"
                                                label="Quantidade"
                                                fullWidth
                                                variant="standard"
                                                value={quantity}
                                                onChange={e => setQuantity(e.target.value)}
                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={12}>
                                            <Box mt={3} sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button
                                                    variant="contained"
                                                    onClick={e => { handleSubmit() }}
                                                >
                                                    Atualizar
                                                </Button>
                                                <Button
                                                    variant="contained"
                                                    href={"/admin/vaccine"}
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