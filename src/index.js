import {React, useState} from 'react';
import ReactDOM from 'react-dom/client';
import './index.scss';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { FormGroup } from '@mui/material';
import CryptoJS from 'crypto-js';
import Typography from '@mui/material/Typography';
import useToken from './useToken';
import Footer from './footer';
import Sidemenu from './sidemenu'
import CssBaseline from '@mui/material/CssBaseline';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';

const App = () => {
    const { token, setToken } = useToken();
    const [ login, setLogin ] = useState('');
    const [ password, setPassword ] = useState('');
    let [ loginError, setLoginError ] = useState(false);

    const tryLogin = event => {
        fetch('http://localhost:3001/api/user', {
            method: 'POST', // or 'PUT'
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                login: login,
                password: CryptoJS.MD5(password).toString()
            }),
        }).then(response => response.json())
        .then((res) => {
            if (res && res.token !== undefined) {
                setToken(res.token);
            } else {
                setLoginError(true);
                console.log(loginError)
            }
        })
    }

    const handleChangeLogin = event => {
        setLogin(event.target.value);
    };    

    const handleChangePassword = event => {
        setPassword(event.target.value);
    };    

    const handleKeydown = event => {
        if (event.key == 'Enter') {
            tryLogin();
        }
    };

    if (!token) {
        return (
            <div className="login__container">
                <Card className="login__box" sx={{ maxWidth: 600 }}>
                    <CardContent>
                        <h2>Panel Logowania</h2>
                        { loginError == true &&
                            <Typography sx={{ color: 'red' }}>
                                Wprowadzono niepoprawne dane logowania.
                            </Typography> 
                        }
                        <FormGroup>
                            <TextField id="login" label="Login" variant="standard" margin="dense" value={login} onKeyDown={handleKeydown} onChange={handleChangeLogin} />
                        </FormGroup>
                        <FormGroup>
                            <TextField type="password" id="password" label="Hasło" variant="standard" margin="dense" value={password} onKeyDown={handleKeydown} onChange={handleChangePassword} />
                        </FormGroup>
                        <Box textAlign='center' mt={2}>
                            <Button onClick={tryLogin} variant="contained" margin="dense">Zaloguj się</Button>
                            <Button sx={{ ml: 1 }} variant="outlined" margin="dense">Zapomniałem hasła</Button>
                        </Box>
                    </CardContent>
                </Card>
            </div>
        );
    } else {
        return (
            <Box
                component="div"
                sx={{ mx: '2px', my: '10px', display: 'flex', boxShadow: 0 }}>
                <CssBaseline />
                <AppBar
                    position="fixed"
                    sx={{ width: `calc(100% - 300px)`, ml: `300px`, boxShadow: 0 }}>
                        <h2 align="center">Aplikacja - Newsletter </h2>
                </AppBar>

                <Sidemenu></Sidemenu>

                <Box
                    component="main"
                    sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
                >
                    <Toolbar />
                    <Typography paragraph>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
                        tempor incididunt ut labore et dolore magna aliqua. Rhoncus dolor purus non
                        enim praesent elementum facilisis leo vel. Risus at ultrices mi tempus
                        imperdiet. Semper risus in hendrerit gravida rutrum quisque non tellus.
                        Convallis convallis tellus id interdum velit laoreet id donec ultrices.
                        Odio morbi quis commodo odio aenean sed adipiscing. Amet nisl suscipit
                        adipiscing bibendum est ultricies integer quis. Cursus euismod quis viverra
                        nibh cras. Metus vulputate eu scelerisque felis imperdiet proin fermentum
                        leo. Mauris commodo quis imperdiet massa tincidunt. Cras tincidunt lobortis
                        feugiat vivamus at augue. At augue eget arcu dictum varius duis at
                        consectetur lorem. Velit sed ullamcorper morbi tincidunt. Lorem donec massa
                        sapien faucibus et molestie ac.
                    </Typography>
                    <Typography paragraph>
                        Consequat mauris nunc congue nisi vitae suscipit. Fringilla est ullamcorper
                        eget nulla facilisi etiam dignissim diam. Pulvinar elementum integer enim
                        neque volutpat ac tincidunt. Ornare suspendisse sed nisi lacus sed viverra
                        tellus. Purus sit amet volutpat consequat mauris. Elementum eu facilisis
                        sed odio morbi. Euismod lacinia at quis risus sed vulputate odio. Morbi
                        tincidunt ornare massa eget egestas purus viverra accumsan in. In hendrerit
                        gravida rutrum quisque non tellus orci ac. Pellentesque nec nam aliquam sem
                        et tortor. Habitant morbi tristique senectus et. Adipiscing elit duis
                        tristique sollicitudin nibh sit. Ornare aenean euismod elementum nisi quis
                        eleifend. Commodo viverra maecenas accumsan lacus vel facilisis. Nulla
                        posuere sollicitudin aliquam ultrices sagittis orci a.
                    </Typography>

                    <Footer />
                </Box>

            </Box>
        )
    }
}

const Main = () => {
    return (
        <div className="container">
            <Container maxWidth="lg">
                <App />
            </Container>
        </div>
    );
}
  
  
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Main />);