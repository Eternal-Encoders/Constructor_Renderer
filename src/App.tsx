import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import axios from 'axios';
import classNames from 'classnames';
import { getUserAuthData, userActions } from 'entities/User';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig.';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector(getUserAuthData);

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      navigate(RoutePath.main);
    } else {
      axios.defaults.headers.common['Authorization'] = null;
      navigate(RoutePath.auth);
      /*if setting null does not remove `Authorization` header then try     
           delete axios.defaults.headers.common['Authorization'];
         */
    }
  }, [navigate, token]);

  return (
    <div className={classNames(`${theme} noselect`)}>
      <AppRouter />
    </div>
  );
}

export default App;