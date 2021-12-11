import * as React from 'react';
import {FC} from 'react';
import {FALLBACK_AVATAR} from '../../../constants';

export const FallbackPic: FC = () => <img alt="Fatodo fallback image" src={FALLBACK_AVATAR} />;
