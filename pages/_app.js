import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CartContextProvider } from '../Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@auth0/nextjs-auth0';
const client = new ApolloClient({
	uri: 'http://localhost:1337/graphql',
	cache: new InMemoryCache(),
});
function MyApp({ Component, pageProps }) {
	return (
		<>
			<ApolloProvider client={client}>
				<UserProvider>
					<CartContextProvider>
						<Toaster />
						<Navbar />
						<Component {...pageProps} />
					</CartContextProvider>
				</UserProvider>
			</ApolloProvider>
		</>
	);
}

export default MyApp;
