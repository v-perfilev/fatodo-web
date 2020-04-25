import { applyMiddleware, compose, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import reducer from '../store';

const defaultMiddlewares = [thunkMiddleware];
const composedMiddlewares = compose(applyMiddleware(...defaultMiddlewares));

const initStore = createStore(reducer, composedMiddlewares);

export default initStore;
