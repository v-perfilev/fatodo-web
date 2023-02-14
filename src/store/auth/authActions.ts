import {SecurityUtils} from '../../shared/utils/SecurityUtils';
import authSlice from './authSlice';
import {AppDispatch, AsyncThunkConfig} from '../store';
import {RegistrationDTO} from '../../models/dto/RegistrationDTO';
import AuthService from '../../services/AuthService';
import {LoginDTO} from '../../models/dto/LoginDTO';
import UserService from '../../services/UserService';
import {LanguageUtils} from '../../shared/utils/LanguageUtils';
import {ForgotPasswordDTO} from '../../models/dto/ForgotPasswordDTO';
import {ChangePasswordDTO} from '../../models/dto/ChangePasswordDTO';
import {ChangeLanguageDTO} from '../../models/dto/ChangeLanguageDTO';
import {SnackActions} from '../snack/snackActions';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {accountToUser, UserAccount, UserNotifications, UserSettings} from '../../models/User';
import {InfoActions} from '../info/infoActions';
import {ResetPasswordDTO} from '../../models/dto/ResetPasswordDTO';
import {RootActions} from '../rootActions';
import {ActivityDTO} from '../../models/dto/ActivityDTO';
import AnalyticsService from '../../services/AnalyticsService';

const PREFIX = 'auth/';

export class AuthActions {
  static afterLogout = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.reset());
  };

  static resetError = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setError(undefined));
  };

  static setIsAuthenticated = () => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setIsAuthenticated(true));
  };

  static setLoading = (value: boolean) => (dispatch: AppDispatch) => {
    dispatch(authSlice.actions.setLoading(value));
  };

  static logout = () => (dispatch: AppDispatch) => {
    SecurityUtils.clearAuthToken();
    dispatch(RootActions.afterLogoutState());
  };

  static registerThunk = createAsyncThunk<void, RegistrationDTO, AsyncThunkConfig>(
    PREFIX + 'register',
    async (dto, thunkAPI) => {
      await AuthService.register(dto);
      thunkAPI.dispatch(SnackActions.handleCode('auth.registered', 'info'));
    },
  );

  static socialLoginThunk = createAsyncThunk<void, string, AsyncThunkConfig>(
    PREFIX + 'login',
    async (token, thunkAPI) => {
      SecurityUtils.clearAuthToken();
      await SecurityUtils.saveAuthToken(token, true);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
    },
  );

  static authenticateThunk = createAsyncThunk<void, {dto: LoginDTO; rememberMe?: boolean}, AsyncThunkConfig>(
    PREFIX + 'authenticate',
    async ({dto, rememberMe}, thunkAPI) => {
      try {
        SecurityUtils.clearAuthToken();
        const response = await AuthService.authenticate(dto);
        const token = SecurityUtils.parseTokenFromResponse(response);
        await SecurityUtils.saveAuthToken(token, rememberMe);
        await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
      } catch (response) {
        return thunkAPI.rejectWithValue(response?.data);
      }
    },
  );

  static fetchAccountThunk = createAsyncThunk<UserAccount, void, AsyncThunkConfig>(
    PREFIX + 'fetchAccount',
    async (_, thunkAPI) => {
      const response = await UserService.getCurrent();
      const account = response.data;
      LanguageUtils.setLanguageFromUser(account);
      thunkAPI.dispatch(InfoActions.handleUsers([accountToUser(account)]));
      return account;
    },
  );

  static activateThunk = createAsyncThunk<void, string, AsyncThunkConfig>(
    PREFIX + 'activate',
    async (code, thunkAPI) => {
      await AuthService.activate(code);
      thunkAPI.dispatch(SnackActions.handleCode('auth.activated', 'info'));
    },
  );

  static forgotPasswordThunk = createAsyncThunk<void, ForgotPasswordDTO, AsyncThunkConfig>(
    PREFIX + 'forgotPassword',
    async (dto, thunkAPI) => {
      await AuthService.requestResetPasswordCode(dto);
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterForgotPassword', 'info'));
    },
  );

  static resetPasswordThunk = createAsyncThunk<void, ResetPasswordDTO, AsyncThunkConfig>(
    PREFIX + 'resetPassword',
    async (dto, thunkAPI) => {
      await AuthService.resetPassword(dto);
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterResetPassword', 'info'));
    },
  );

  static changePasswordThunk = createAsyncThunk<void, ChangePasswordDTO, AsyncThunkConfig>(
    PREFIX + 'changePassword',
    async (dto, thunkAPI) => {
      await UserService.changePassword(dto);
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterChangePassword', 'info'));
    },
  );

  static changeLanguageThunk = createAsyncThunk<void, ChangeLanguageDTO, AsyncThunkConfig>(
    PREFIX + 'changeLanguage',
    async (dto, thunkAPI) => {
      await UserService.changeLanguage(dto);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
    },
  );

  static updateAccountInfoThunk = createAsyncThunk<void, FormData, AsyncThunkConfig>(
    PREFIX + 'updateAccountInfo',
    async (formData, thunkAPI) => {
      await UserService.updateAccountInfo(formData);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterUpdateAccount', 'info'));
    },
  );

  static updateAccountSettingsThunk = createAsyncThunk<void, UserSettings, AsyncThunkConfig>(
    PREFIX + 'updateAccountSettings',
    async (settings, thunkAPI) => {
      await UserService.updateAccountSettings(settings);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterUpdateAccount', 'info'));
    },
  );

  static updateAccountNotificationsThunk = createAsyncThunk<void, UserNotifications, AsyncThunkConfig>(
    PREFIX + 'updateAccountNotifications',
    async (notifications, thunkAPI) => {
      await UserService.updateAccountNotifications(notifications);
      await thunkAPI.dispatch(AuthActions.fetchAccountThunk());
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterUpdateAccount', 'info'));
    },
  );

  static deleteAccountPermanentlyThunk = createAsyncThunk<void, void, AsyncThunkConfig>(
    PREFIX + 'deleteAccount',
    async (_, thunkAPI) => {
      await UserService.deleteAccountPermanently();
      await thunkAPI.dispatch(AuthActions.logout());
      thunkAPI.dispatch(SnackActions.handleCode('auth.afterDeleteAccount', 'info'));
    },
  );

  static writeActivityThunk = createAsyncThunk<void, ActivityDTO, AsyncThunkConfig>(
    PREFIX + 'activity',
    async (dto) => {
      await AnalyticsService.writeActivity(dto);
    },
  );
}
