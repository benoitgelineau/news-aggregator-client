import { useState } from 'react';
import { Link } from 'react-router-dom';
import userApi from '@services/userApi';
import { AuthContextType } from '@store/context';
import { LoginForm } from '@components';

interface LoginProps {
	context: AuthContextType;
}

const Login = ({ context }: LoginProps) => {
	const { isAuthenticated, setIsAuthenticated } = context;
	const [errorMessage, setErrorMessage] = useState('');
	const [isLoggingOut, setIsLoggingOut] = useState(false);

	const handleOnSubmit = async (authenticate: () => Promise<void>) => {
		try {
			await authenticate();
			setIsAuthenticated(true);
			setErrorMessage('');
		} catch (error) {
			setErrorMessage(error.message);
		}
	};

	const handleLogout = async () => {
		try {
			setIsLoggingOut(true);
			await userApi('signOff').get();
			setIsAuthenticated(false);
		} catch (error) {
			console.log('signOff error:', error);
		} finally {
			setIsLoggingOut(false);
		}
	};

	return (
		<div id='login-view'>
			{!isAuthenticated ? (
				<>
					<LoginForm onSubmit={handleOnSubmit} />
					{errorMessage && (
						<div className='login-error-message'>
							<p>{errorMessage}</p>
						</div>
					)}
				</>
			) : (
				<>
					<Link to='/bookmarks'>Bookmarks</Link>
					<button id='logout' onClick={handleLogout} disabled={isLoggingOut}>
						Logout
					</button>
				</>
			)}
		</div>
	);
};

export default Login;
