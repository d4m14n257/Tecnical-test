import { AppProps } from 'next/app';
import { Box, CssBaseline } from '@mui/material';
import Container from '@mui/material/Container'
import { UserLogin, UserLoginContext } from '@/contexts/UsernameContext';
import { useContext, useEffect } from 'react';
import { useRouter } from 'next/router';

export default function App({ Component, pageProps }: AppProps) {
	const { token } = useContext(UserLogin)
	const router = useRouter();

	useEffect(() => {
		if(!token)
			router.push('login');	
	},[token])

	return (
		<UserLoginContext>
			<CssBaseline />
			<Container maxWidth="xl">
				<Box
					sx={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'center',
						alignItems: 'center',
						margin: 4
					}}
				>
					<Component {...pageProps} />
				</Box>
			</Container>
		</UserLoginContext>
	);
}
