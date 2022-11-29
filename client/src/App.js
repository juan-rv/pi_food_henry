import './App.css';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Landing from './components/landing/Landing'
import Home from './components/home/Home'
import Detail from './components/detail/Detail'
import Create from './components/create/Create'
function App() {
  return (

    <Router>

    <div className="App">
        <Route exact path="/" component={Landing}/> 
        <Route exact path='/home' component ={Home}/>   
        <Route path='/home/:id' component={Detail} />
        <Route path = '/create_recipe' component = {Create} />
    </div>
    </Router>
  );
}

export default App;
