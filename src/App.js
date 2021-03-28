import {useContext} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from 'react-router-dom'
import { AuthPage, HomePage } from "./containers"
import { SessionApi, SessionProvider } from './hook/SessionApi'

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
  // const Session = useContext(SessionApi)
  return (
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route exact path="/auth" component={AuthPage} />
      <Redirect to="/" />
    </Switch>
  )
}

const ProtectedRoute = ({ auth, component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={() => auth ? (
        <Component />
      ) : (
        <Redirect to="/auth" />
      )}
    />
  )
}

export default App;
