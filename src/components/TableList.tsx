import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { columns } from "@/constants/constants";
import { getSearchUser } from "@/api/search";
import { useContext, useState } from "react";
import { UserLogin } from "@/contexts/UsernameContext";
import { useRouter } from "next/router";

export default function TableList() {
    const router = useRouter();
    const { token } = useContext(UserLogin)
    const [userSearch, setUserSearch] = useState('');
    const [list, setList] = useState<any[]>([]);
    const [error, setError] = useState<boolean>();
    const [message, setMessage] = useState<string>('');

	const handleSearchUser = async () => {
        const response = await getSearchUser(token, userSearch);
        
        if(!response.IsOK || !response.Body) {
            setList([]);
            setMessage(response.Messages);
            setError(true);
            return;
        }

        setList(response.Body);
        setError(false);
        setMessage('');
	}

    const handleCreateUser = () => {
        router.push('create-user')
    }

	return (
		<TableContainer 
            component={Paper}
            sx={{
                padding: 5
            }}
        >
            <Stack 
                direction='row'
                spacing={4}
                justifyContent="space-between"
                alignItems="center"
            >
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        justifyContent: "space-between",
                        alignItems: "center",
                        gap: 5
                    }}
                >
                    <TextField 
                        label='Buscador'
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                    />
                    <Button
                        variant='outlined'
                        onClick={() => {handleSearchUser()}}
                    >
                        OK
                    </Button>
                </Box>
                <Button
                    variant='outlined'
                    onClick={() => {handleCreateUser()}}
                >
                    Nuevo Usuario
                </Button>
            </Stack>
			<Table>
				<TableHead>
					<TableRow>
						{columns.map(column => (
							<TableCell
								key={column.id}
							>
								{column.name}
							</TableCell>
						))}
					</TableRow>
				</TableHead>
				<TableBody>
                    {list.length > 0 && 
                        list.map((item) => (
                            <TableRow
                                key={item.Id}
                            >
                                <TableCell>{item.Username}</TableCell>
                                <TableCell>{item.Name}</TableCell>
                                <TableCell>{item.FatherLastName}</TableCell>
                                <TableCell>{item.CreationDate}</TableCell>
                                <TableCell>{item.Email}</TableCell>
                                <TableCell>{item.PhoneNumber}</TableCell>
                            </TableRow>
                        ))}
				</TableBody>
			</Table>
            {list.length <= 0 &&
                <Typography 
                    sx={{
                        textAlign: 'center',
                        marginTop: 5
                    }}
                    variant="h4" 
                >
                    No hay datos por mostrar
                </Typography>
            }
            {error && 
                <Typography 
                    sx={{
                        textAlign: 'center',
                        marginTop: 5
                    }}
                    variant="h5" 
                    color='error'
                >
                    Oucrrio un error: {message}
                </Typography>
            }
        </TableContainer>
	);
}
