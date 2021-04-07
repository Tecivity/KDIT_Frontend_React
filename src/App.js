import { useContext } from 'react';
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';

//Import Pages
import {
	AuthPage,
	HomePage,
	SubComPage,
	HelpPage,
	AboutPage,
	ProfilePage,
} from './containers';

//Import Components

//Import Hooks
import { SessionApi, SessionProvider } from './hook/SessionApi';

function App() {
	return (
		<div className="App">
			<SessionProvider>
				<Router>
					<Routes />
				</Router>
			</SessionProvider>
		</div>
	);
}

const Routes = () => {
	const Session = useContext(SessionApi);
	return (
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/auth" component={AuthPage} />
			<Route exact path="/sub-community" component={SubComPage} />
			<Route exact path="/help" component={HelpPage} />
			<Route exact path="/about" component={AboutPage} />
			<ProtectedRoute
				auth={Session.session}
				exact
				path="/Profile"
				component={ProfilePage}
			/>

			<Redirect to="/" />
		</Switch>
	);
};

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={() => (auth ? <Component /> : <Redirect to="/auth" />)}
		/>
	);
};

export default App;
