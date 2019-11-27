import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
// import { Provider,  } from 'react-redux';

import '../node_modules/mdbreact/dist/css/mdb.css';
import '../node_modules/video-react/dist/video-react.css'; 
import '../node_modules/react-vis/dist/style.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './index.css';

import * as serviceWorker from './serviceWorker';

import App from './App';
// import combinedStore from './store/combinedStore';

// const store = combinedStore();

const AppRouter = (
        <Router>
            <App />
        </Router>
);

// const reduxJsx = (
//     <Provider store={store}>
//         {AppRouter}
//     </Provider>
// );

ReactDOM.render(AppRouter, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
