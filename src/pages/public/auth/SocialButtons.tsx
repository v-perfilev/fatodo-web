import React, {useState} from 'react';
import {API_URL, BASE_URL} from '../../../constants';
import {useTranslation} from 'react-i18next';
import {Box, Divider, SxProps, Typography} from '@mui/material';
import LoadingButton from '../../../components/controls/LoadingButton';
import FacebookIcon from '../../../components/icons/FacebookIcon';
import {LanguageUtils} from '../../../shared/utils/LanguageUtils';
import {DateUtils} from '../../../shared/utils/DateUtils';
import {RootRoutes} from '../../../routes/RootRouter';
import GoogleIcon from '../../../components/icons/GoogleIcon';
import FVStack from '../../../components/boxes/FVStack';
import FHStack from '../../../components/boxes/FHStack';

const SocialButtons = () => {
  const {t} = useTranslation();
  const [facebookLoading, setFacebookLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const oAuth2Login = (provider: string): void => {
    const apiUrl = API_URL + '/oauth2/authorize/' + provider;
    const languageParam = 'language=' + LanguageUtils.getLanguage();
    const timezoneParam = 'timezone=' + DateUtils.getTimezone();
    const redirectParam = 'redirect=' + BASE_URL + RootRoutes.SOCIAL_LOGIN;
    window.location.href = apiUrl + '?' + languageParam + '&' + timezoneParam + '&' + redirectParam;
  };

  const facebookLogin = (): void => {
    setFacebookLoading(true);
    oAuth2Login('facebook');
  };

  const googleLogin = (): void => {
    setGoogleLoading(true);
    oAuth2Login('google');
  };

  return (
    <FVStack width="100%">
      <Box sx={headerStyles}>
        <Divider />
        <Typography sx={captionStyles}>{t('account:socialLogin.label')}</Typography>
        <Divider />
      </Box>
      <FHStack>
        <LoadingButton
          startIcon={<FacebookIcon />}
          onClick={facebookLogin}
          fullWidth
          loading={facebookLoading}
          disabled={facebookLoading || googleLoading}
        >
          Facebook
        </LoadingButton>
        <LoadingButton
          startIcon={<GoogleIcon />}
          onClick={googleLogin}
          fullWidth
          loading={googleLoading}
          disabled={facebookLoading || googleLoading}
        >
          Google
        </LoadingButton>
      </FHStack>
    </FVStack>
  );
};

const headerStyles: SxProps = {
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'center',
  '& > *': {
    flexGrow: 1,
  },
};

const captionStyles: SxProps = {
  display: 'flex',
  flexShrink: 0,
  flexGrow: 0,
  justifyContent: 'center',
  paddingX: 2,
};

export default SocialButtons;
