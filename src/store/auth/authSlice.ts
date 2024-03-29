import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {AuthState} from './authType';
import {AuthActions} from './authActions';
import {UserAccount} from '../../models/User';

const initialState: AuthState = {
  isAuthenticated: false,
  account: undefined,
  loading: false,
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    reset: (state: AuthState) => {
      Object.assign(state, initialState);
    },

    setIsAuthenticated: (state: AuthState, action: PayloadAction<boolean>) => {
      state.isAuthenticated = action.payload;
    },

    setAccount: (state: AuthState, action: PayloadAction<UserAccount>) => {
      state.account = action.payload;
    },

    setLoading: (state: AuthState, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },

    setError: (state: AuthState, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    /*
    register
    */
    builder.addCase(AuthActions.registerThunk.pending, (state, action) => {
      authSlice.caseReducers.reset(state);
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.registerThunk.fulfilled, (state) => {
      authSlice.caseReducers.reset(state);
    });
    builder.addCase(AuthActions.registerThunk.rejected, (state) => {
      authSlice.caseReducers.reset(state);
    });

    /*
    socialLogin
     */
    builder.addCase(AuthActions.socialLoginThunk.pending, (state, action) => {
      authSlice.caseReducers.reset(state);
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.socialLoginThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setIsAuthenticated(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.socialLoginThunk.rejected, (state) => {
      authSlice.caseReducers.reset(state);
    });

    /*
    authenticate
     */
    builder.addCase(AuthActions.authenticateThunk.pending, (state, action) => {
      authSlice.caseReducers.reset(state);
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.authenticateThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setIsAuthenticated(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.authenticateThunk.rejected, (state, action) => {
      authSlice.caseReducers.reset(state);
      authSlice.caseReducers.setError(state, {...action, payload: action.payload?.feedbackCode});
    });

    /*
    fetchAccount
     */
    builder.addCase(AuthActions.fetchAccountThunk.pending, (state, action) => {
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.fetchAccountThunk.fulfilled, (state, action) => {
      authSlice.caseReducers.setAccount(state, action);
      authSlice.caseReducers.setLoading(state, {...action, payload: false});
    });
    builder.addCase(AuthActions.fetchAccountThunk.rejected, (state) => {
      authSlice.caseReducers.reset(state);
    });

    /*
    forgotPassword
    */
    builder.addCase(AuthActions.forgotPasswordThunk.pending, (state, action) => {
      authSlice.caseReducers.reset(state);
      authSlice.caseReducers.setLoading(state, {...action, payload: true});
    });
    builder.addCase(AuthActions.forgotPasswordThunk.fulfilled, (state) => {
      authSlice.caseReducers.reset(state);
    });
    builder.addCase(AuthActions.forgotPasswordThunk.rejected, (state) => {
      authSlice.caseReducers.reset(state);
    });
  },
});

export default authSlice;
