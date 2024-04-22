import { Button, Stack, Table, TableBody, TableCell, TableHead, TableRow, TextField, Typography } from "@mui/material";
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
		<>
            <Stack flexDirection='row' spacing={4} alignContent='center' justifyContent='space-between' justifyItems='center'>
                <Box>
                    <TextField 
                        value={userSearch}
                        onChange={(e) => setUserSearch(e.target.value)}
                    />
                    <Button
                        onClick={() => {handleSearchUser()}}
                    >
                        OK
                    </Button>
                </Box>
                <Button
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
                    {list.length > 0 ? 
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
                        )) :
                        <Typography variant="h4" color={error ? 'error' : ''}>
                            {error ? `Ocurrio un error en la peticion:  ${message}`: 'No hay datos por mostrar'}
                        </Typography>
                    }
				</TableBody>
			</Table>
		</>
	);
}
