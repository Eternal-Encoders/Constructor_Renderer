import { useTheme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';
import classNames from 'classnames';
import { MainPage } from 'pages/MainPage';
import { Navbar } from 'widgets/Navbar';

function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames(`app ${theme} noselect`)}>
      <Navbar marginBottom={12} />в
      <MainPage />
    </div>
  );
}

export default App;
