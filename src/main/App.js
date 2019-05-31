import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';

import store from './store/Store';
import BaseLayout from './layouts/BaseLayout';

const hist = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <Router history={hist}>
      <BaseLayout></BaseLayout>
    </Router>
  </Provider>
);
export default App;
