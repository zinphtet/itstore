import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CartContextProvider } from '../Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { Auth0Provider } from '@auth0/auth0-react';
const client = new ApolloClient({
	uri: 'http://localhost:1337/graphql',
	cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }) {
	return (
		<>
			<ApolloProvider client={client}>
				<Auth0Provider
					domain="dev-0llh740b.us.auth0.com"
					clientId="MRfvpGYIOYvQP9vKuON6HABjsVqCpHf1"
					redirectUri="http://localhost:3000"
				>
					<CartContextProvider>
						<Toaster />
						<Navbar />
						<Component {...pageProps} />
					</CartContextProvider>
				</Auth0Provider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
