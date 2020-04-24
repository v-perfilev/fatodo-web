import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer, { IRootState } from '../../redux';

const defaultMiddlewares = [thunkMiddleware];

const composedMiddlewares = middlewares => compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const init = (initialState?: IRootState, middlewares = []) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default init;
