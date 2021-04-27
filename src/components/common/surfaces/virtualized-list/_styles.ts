import {makeStyles} from '@material-ui/core/styles';

export const virtualizedListMeasurerStyles = makeStyles(() => ({
  measurer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    visibility: 'hidden',
    zIndex: -1
  }
}));

