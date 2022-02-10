import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './frontend/components/App';
import reportWebVitals from './reportWebVitals';
import { Route, Routes } from "react-router-dom";
import './index.scss';
import SimpleContractComponent from './frontend/components/simpleContract/SimpleContract';
import HomePage from './frontend/components/home/Home';
import Transactions from './frontend/components/transactions/Transactions';
import Transaction from './frontend/components/transaction/Transaction';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="interact" element={<SimpleContractComponent />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="transaction/:transactionHash" element={<Transaction />} />

        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
