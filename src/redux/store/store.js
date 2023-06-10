import { persistStore } from 'redux-persist';
import { createStore, applyMiddleware, compose } from 'redux';
import middlewares from './middlewares';
import reducers from './persistReducers';

/**
 * Confguring a Store With Persistor
 */
const configureStore = () => {
  const reactEnhancers = compose(applyMiddleware(...middlewares));

  const store = createStore(reducers, reactEnhancers);
  const persistor = persistStore(store);

  // persistor.purge();

  return { store, persistor };
};

export default configureStore();
