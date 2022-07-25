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

const App = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');

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
            if (res.result) {

            }
        })
    }

    const handleChangeLogin = event => {
        setLogin(event.target.value);
    };    

    const handleChangePassword = event => {
        setPassword(event.target.value);
    };    

    return (
        <div className="login__container">
                <Card className="login__box" sx={{ maxWidth: 600 }}>
                <CardContent>
                    <h2>Panel Logowania</h2>
                    <FormGroup>
                        <TextField id="login" label="Login" variant="standard" margin="dense" value={login} onChange={handleChangeLogin} />
                    </FormGroup>
                    <FormGroup>
                        <TextField type="password" id="password" label="Hasło" variant="standard" margin="dense" value={password} onChange={handleChangePassword} />
                    </FormGroup>
                    <Box textAlign='center' mt={2}>
                        <Button onClick={tryLogin} variant="contained" margin="dense">Zaloguj się</Button>
                        <Button sx={{ ml: 1 }} variant="outlined" margin="dense">Zapomniałem hasła</Button>
                    </Box>
                </CardContent>
            </Card>
        </div>
    );
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