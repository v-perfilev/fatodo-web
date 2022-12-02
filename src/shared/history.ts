import {useNavigate} from 'react-router-dom';

const History = {
  navigate: null,
  push: (page, ...rest) => History.navigate(page, ...rest),
};

export const NavigateSetter = () => {
  History.navigate = useNavigate();
  return null;
};

export default History;
