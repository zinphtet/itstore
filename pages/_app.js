import '../styles/globals.css';
import Navbar from '../components/Navbar';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { CartContextProvider } from '../Context/CartContext';
import { Toaster } from 'react-hot-toast';
import { UserProvider } from '@auth0/nextjs-auth0';
const client = new ApolloClient({
	uri: `${process.env.NEXT_PUBLIC_GRAPHQL_URL}`,
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
