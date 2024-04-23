import { setUser } from "@/api/createUser";
import { UserLogin } from "@/contexts/UsernameContext";
import { Card, Alert, Button, Snackbar, TextField, Typography } from "@mui/material";
import { useContext, useState} from "react";

export default function CreateUserComponent () {
    const { token } = useContext(UserLogin);
    const [name, setName] = useState<string>('');
    const [fatherLastName, setFatherLastName] = useState<string>('');
    const [motherLastName, setMotherLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [phone, setPhone] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [confirmPassword, setConfirmPassword] = useState<string>('');

    const [open, setOpen] = useState<boolean>(false);

    const [message, setMessage] = useState<string>('');
    const [formError, setFormError] = useState<boolean>(false);
    const [error, setError] = useState<boolean>(false);

    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault()

        
        if(password != confirmPassword) {
            setFormError(true); 
            setMessage("Las contraseñas no son iguales.");
            return;
        }
        
        setFormError(false);
        setMessage('');

        const data = {
            Tenant: null,
            UserName: username,
            Password: password,
            Name: name,
            FatherLastName: fatherLastName,
            MotherLastName: motherLastName,
            Email: email,
            PhoneNumber: phone,
            Metadata: null,
            Roles: [
                {
                    Id: 2,
                    Name: "Usuario Tradicional"
                }
            ]
        }

        const response = await setUser(token, data);
        
        if(!response.IsOK) {
            setError(true);
            setMessage(response.Messages);

            return;
        }
        
        setOpen(true);
        setMessage('');
    }


    return (
        <>
            <Card
                sx={{
                    padding: 3,
                    borderRadius: 4
                }}
            >
                <form onSubmit={handleSubmit}
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 16
                    }}
                >
                    <Typography
                        variant="h3"
                    >
                        Crear nuevo usuario
                    </Typography>
                    {formError && <Typography color='error'>{message}</Typography>}
                    {error && <Typography color='error'>{message}</Typography>}
                    <TextField
                        label='Nombre'
                        required
                        onChange={(e) => setName(e.target.value)}
                        value={name} 
                        type="text"
                    />
                    <TextField
                        label='Apellido paterno'
                        required
                        onChange={(e) => setFatherLastName(e.target.value)}
                        value={fatherLastName} 
                        type="text"
                    />
                    <TextField
                        label='Apellido materno'
                        required
                        onChange={(e) => setMotherLastName(e.target.value)}
                        value={motherLastName} 
                        type="text"
                    />
                    <TextField
                        label='Email'
                        required
                        onChange={(e) => setEmail(e.target.value)}
                        value={email} 
                        type="email"
                    />
                    <TextField
                        label='Telefono'
                        required
                        onChange={(e) => setPhone(e.target.value)}
                        value={phone} 
                        type="tel"
                    />
                    <TextField
                        label='Usuario'
                        required
                        onChange={(e) => setUsername(e.target.value)}
                        value={username} 
                        type="text"
                    />
                    <TextField
                        label='Contraseña'
                        required
                        onChange={(e) => setPassword(e.target.value)}
                        value={password} 
                        type="password"
                    />
                    <TextField
                        label='Confirmar Contraseña'
                        required
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        value={confirmPassword} 
                        type="password"
                    />
                    <Button type='submit'>
                        Nuevo
                    </Button>
                </form>
            </Card>
            <Snackbar
            open={open}
            autoHideDuration={5000}
            onClose={handleClose}
            
        >
            <Alert
                onClose={handleClose}
                severity="success"
                variant="filled"
            >
                Usuario creado con exito
            </Alert>
        </Snackbar>
      </>
    );
}