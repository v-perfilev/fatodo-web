import withWsCommentClient from './with-ws-comment-client';
import {memo} from 'react';
import {flowRight} from 'lodash';

export default flowRight([withWsCommentClient, memo]);
