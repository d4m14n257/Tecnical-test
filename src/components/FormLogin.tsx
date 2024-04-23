import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { Card, Box, Button, FormControl, FormHelperText, TextField, Typography } from "@mui/material";
import { getLogin } from "@/api/login";
import { UserLogin } from "@/contexts/UsernameContext";

export default function FormLogin () {
    const router = useRouter();
    const { setUsername, setToken } = useContext(UserLogin);
    const [user, setUser] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleSubmit = async () => {
        const response = await getLogin(user, password);

        if(!response.IsOK || !response.Body) {
            setError(true);
            return;
        }

        setUsername(response.Body.UserLoginData.Username);
        setToken(response.Body.Token);

        router.push('/');
    }

    return (
        <Box
            style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 16,
                height: '100vh'
            }}
        >   
            <Card
                sx={{
                    padding: 3,
                    borderRadius: 4
                }}
            >
                <form
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 2
                    }}
                >
                    <Typography variant="h4">
                        Inicio de sesión
                    </Typography>
                    {error && <Typography color='error'>Sus datos son incorrectos, verifique su información e intente nuevamente.</Typography>}
                    <FormControl>
                        <TextField
                            label="Usuario"
                            error={error}
                            type='text'
                            value={user}
                            onChange={(e : any) => setUser(e.target.value)}
                        />
                        <FormHelperText error={error}>Escriba su nombre de usuario</FormHelperText>
                    </FormControl>
                    <FormControl>
                        <TextField
                            label="Contraseña"
                            error={error}
                            type='password'
                            value={password}
                            onChange={(e : any) => setPassword(e.target.value)}
                        />
                        <FormHelperText error={error}>Escriba su contraseña</FormHelperText>
                    </FormControl>
                    <Button
                        variant="outlined" 
                        onClick={() => handleSubmit()}>
                        Ok
                    </Button>
                </form>
            </Card>
        </Box>
    );
}