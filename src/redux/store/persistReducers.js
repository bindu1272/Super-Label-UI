import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducers from '../reducers/index';

/**
 * redux-persist config
 */
const persistConfig = {
  key: 'dam-root',
  storage,
};

/**
 * Configure Redux Persist
 */
const configurePersistReducer = () => {
  const persistedReducer = persistReducer(persistConfig, reducers);

  return persistedReducer;
};

export default configurePersistReducer();
