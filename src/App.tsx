import { AppRouter } from 'app/providers/router';
import { useAppDispatch } from 'app/providers/StoreProvider/lib/hooks/useAppDispatch';
import { useTheme } from 'app/providers/ThemeProvider';
import axios from 'axios';
import classNames from 'classnames';
import { fetchProject } from 'entities/Project';
import { getUserAuthData, userActions } from 'entities/User';
import { fetchUserInfo, FetchUserInfoResponse } from 'entities/User/api/fetchUserInfo/fetchUserInfo';
import { MainPage } from 'pages/MainPage';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { RoutePath } from 'shared/config/routeConfig/routeConfig.';

function App() {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isAfterInit, setIsAfterInit] = useState(false);
  
  useEffect(() => {
    dispatch(userActions.initAuthData());
    setIsAfterInit(true);
  }, [dispatch]);
  
  const token = useSelector(getUserAuthData);
  
  useEffect(() => {
    if (!isAfterInit) return;
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      navigate(window.location.pathname);
    } else {
      axios.defaults.headers.common['Authorization'] = null;
      navigate(RoutePath.auth);
    }
  }, [isAfterInit, navigate, token]);

  useEffect(() => {
    if (token) {
    // Запрос на получение детальной информации об юзере для инициализации
      (async () => {
        const fetchedUserInfoResult = await dispatch(fetchUserInfo());
        if (fetchedUserInfoResult.meta.requestStatus === 'fulfilled') {
          const userPayload = fetchedUserInfoResult!.payload as FetchUserInfoResponse;;
          if (!userPayload.selected_project_id) return;
          await dispatch(fetchProject(userPayload.selected_project_id));
        }
      })()
    }
  }, [dispatch, token]);

  const ConstructorPageWithAppRouter = () => {
    return (
      <MainPage>
        <AppRouter />
      </MainPage>
    );
  };

  return (
    <div className={classNames(`${theme} noselect`)}>
      {isAfterInit && (token && window.location.pathname !== '/'  ? 
        ConstructorPageWithAppRouter()
        : <AppRouter />)}
    </div>
  );
}

export default App;