import React from 'react';
import ReactDOM from 'react-dom';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap-icons/font/bootstrap-icons.css"
import './index.css';
import App from './App';
ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// if(module.hot)
// {
//   module.hot.accept("./App",()=>{
//     const NextApp=require("./App").default;
//     ReactDOM.render(<NextApp/>,document.getElementById('root'))
//   });
// }