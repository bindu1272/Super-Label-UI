import thunk from 'redux-thunk';
import { createLogger } from 'redux-logger';
import { axiosInstance } from '../../utilities/configureAxios';

/**
 * logs store update when dispatching
 *
 * @param  {[type]} store
 * @return {[type]}
 */

const logger = createLogger();

/**
 * returns list of middlewares
 *
 * @return Array[]
 */
const configureMiddlewares = () => {
  const middlewares = [
    thunk.withExtraArgument({
      api: axiosInstance,
    }),
  ];

  if (process.env.NODE_ENV === 'development') {
    middlewares.push(logger);
  }

  return middlewares;
};

export default configureMiddlewares();
