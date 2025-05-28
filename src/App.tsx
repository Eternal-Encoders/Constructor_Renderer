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
  const [isSuccess, setIsSuccess] = useState(false);
  
  useEffect(() => {
    dispatch(userActions.initAuthData());
    setIsSuccess(true);
  }, [dispatch]);
  
  const token = useSelector(getUserAuthData);
  
  useEffect(() => {
    if (!isSuccess) return;
    if (token) {
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      navigate(window.location.pathname);
    } else {
      axios.defaults.headers.common['Authorization'] = null;
      navigate(RoutePath.auth);
    }
  }, [isSuccess, navigate, token]);

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

  return (
    <div className={classNames(`${theme} noselect`)}>
      {token && isSuccess ? 
        <MainPage>
          <AppRouter />
        </MainPage>
        : isSuccess && <AppRouter />}
    </div>
  );
}

export default App;