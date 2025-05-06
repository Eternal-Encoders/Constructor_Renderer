import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import classNames from 'classnames';
import { userActions } from 'entities/User';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Breadcrumbs } from 'shared/ui/Breadcrumbs/Breadcrumbs';
import { BuildingHeader } from 'shared/ui/BuildingHeader/BuildingHeader';
import { Navbar } from 'widgets/Navbar';

function App() {
  const { theme } = useTheme();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(userActions.initAuthData());
  }, [dispatch]);

  return (
    <div className={classNames(`app ${theme} noselect`)}>
      <Navbar className='app-navbar'/>
      <BuildingHeader className='app-building-header'/>
      <Breadcrumbs className='app-breadcrumbs'/>
      <AppRouter />
    </div>
  );
}

export default App;