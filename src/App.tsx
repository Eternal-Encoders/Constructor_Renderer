import { AppRouter } from 'app/providers/router';
import { useTheme } from 'app/providers/ThemeProvider';
import 'app/styles/index.scss';
import classNames from 'classnames';
import { Suspense } from 'react';
import { PageLoader } from 'shared/ui/PageLoader/PageLoader';
import { LangSwitcher } from 'widgets/LangSwitcher';
import { Navbar } from 'widgets/Navbar';

function App() {
  const { theme } = useTheme();

  return (
    <div className={classNames(`app ${theme} noselect`)}>
      <Suspense fallback={<PageLoader/>}>
        <LangSwitcher />
        <Navbar marginBottom={12} />
        <AppRouter />
      </Suspense>
    </div>
  );
}

export default App;
