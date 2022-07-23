import './App.css';
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./components/LandingPage"; import Home from './components/Home';
import CountryDetail from './components/CountryDetail';
import CreateActivity from './components/CreateActivity';


function App() {
  return (
    <BrowserRouter>
    <div >
        <div className='App'>
        <Switch> {/* si pongo un link que no existe que te tome el ultimo link que esta bien */}
          <Route exact path= '/' component= {LandingPage}/>
          <Route exact path = '/home' component= {Home}/>
          <Route exact path = '/countries/:id' component= {CountryDetail}/>
          <Route exact path = '/activity' component= {CreateActivity}/>
        </Switch>     
        </div>
    </div>
    </BrowserRouter>
  );
}

export default App;
