import './App.css';

import Router from './router/Routes';
import {BrowserRouter} from 'react-router-dom'
process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";
function App() {

  return (
    <div className="wrapper">
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </div>
  );
}

export default App;
