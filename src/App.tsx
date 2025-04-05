import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import classNames from 'classnames';
import { Navbar } from 'widgets/Navbar';

function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames(`app ${theme} noselect`)}>
      <Navbar marginBottom={12} />
      <AppRouter />
    </div>
  );
}

export default App;