import React from 'react';
import logo from './logo.svg';
import './App.css';
import Button from 'react-bootstrap/Button';
import {Home} from './componenets/Home';
import {Department} from './componenets/Departments';
import {Employee} from './componenets/Employee';
import {Navigation} from './componenets/Navigation';

import {BrowserRouter,Route,Switch} from 'react-router-dom';


function App() {
  return (
    <div className="container">
<BrowserRouter>
    <h3 className="m-3 d-flex justify-content-center">
      React js with Boostrap
    </h3>
    <h5 className="m-3 d-flex justify-content-center">
          Employee Management Portal
    </h5>

    <Navigation/>

    <Switch>

      <Route path='/' component={Home} exact />
      <Route path='/department' component={Department}  />
      <Route path='/employee' component={Employee}  />
    </Switch>
    
    
    </BrowserRouter>

    </div>
    

  );
}

export default App;
