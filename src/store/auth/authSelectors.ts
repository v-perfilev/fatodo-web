import {createSelector} from '@reduxjs/toolkit';
import {RootState} from '../store';
import {UserAccount} from '../../models/User';

const getAuthState = (state: RootState) => state.auth;

class AuthSelectors {
  static isAuthenticated = createSelector(getAuthState, (state) => state.isAuthenticated as boolean);

  static account = createSelector(getAuthState, (state) => state.account as UserAccount);

  static loading = createSelector(getAuthState, (state) => state.loading as boolean);

  static error = createSelector(getAuthState, (state) => state.error as string);
}

export default AuthSelectors;
