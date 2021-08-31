import withWsComment from './with-ws-comment';
import {memo} from 'react';
import {flowRight} from 'lodash';

export default flowRight([withWsComment, memo]);
