import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from "./container/Home";
import { Signup } from "./container/Signup";
import { Signin } from "./container/Signin";
// import  PrivateRotue  from './components/HOC/PrivateRoute';
// import { useEffect } from 'react';
// import { useDispatch,useSelector  } from 'react-redux';
// import { isUserLogin } from './actions/auth.action';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/signup" component={Signup} />
          <Route path="/signin" component={Signin} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
