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
	PostPage,
	FullSubComPage,
	ExplorePage,
	WelcomePage,
	AdminPage,
} from './containers';

//Import Components

//Import Hooks
import { SessionApi, SessionProvider } from './hook/SessionApi';

import ReactNotification from 'react-notifications-component'
import 'react-notifications-component/dist/theme.css'
import { store } from 'react-notifications-component';
import "animate.css"

function App() {
	return (
		<div className="App">
			<SessionProvider>
				<Router>
					<Routes />
				</Router>
			</SessionProvider>
			<ReactNotification></ReactNotification>
		</div>
	);
}

const Routes = () => {
	const Session = useContext(SessionApi);
	return (
		<Switch>
			<Route exact path="/" component={HomePage} />
			<Route exact path="/auth" component={AuthPage} />
			<Route exact path="/community" component={SubComPage} />
			<Route exact path="/help" component={HelpPage} />
			<Route exact path="/about" component={AboutPage} />
			<Route exact path="/post/:id" component={PostPage} />
			<Route exact path="/community/:id" component={FullSubComPage} />
			<Route exact path="/explore" component={ExplorePage} />
			<Route exact path="/welcome" component={WelcomePage} />
			<ProtectedAdmin exact isAdmin={Session.isAdmin} path="/admin" component={AdminPage} />
			<ProtectedRoute
				auth={Session.session}
				exact
				path="/profile"
				component={ProfilePage}
			/>
			<ProtectedRoute
				auth={Session.session}
				exact
				path="/profile/:id"
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

const ProtectedAdmin = ({ isAdmin, component: Component, ...rest }) => {
	return (
		<Route
			{...rest}
			render={() => (isAdmin ? <Component /> : <Redirect to="/" />)}
		/>
	);
};

export default App;
