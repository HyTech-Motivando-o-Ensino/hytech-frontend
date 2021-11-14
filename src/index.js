import React from 'react';
import ReactDOM from 'react-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import Home from './pages/Home';
import UserProvider from './context/user';
import HomeProvider from './context/home';

ReactDOM.render(
	<React.StrictMode>
    	<UserProvider>
      		<HomeProvider>
        		<Home />
      		</HomeProvider>
    	</UserProvider>
  </React.StrictMode>,
  document.getElementById('root')
);