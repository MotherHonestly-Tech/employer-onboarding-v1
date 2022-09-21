import './App.module.scss';

import ScrollToTop from './components/Layout/ScrollToTop';
import AppNavigator from './navigator/Navigator';
import { NotificationContextProvider } from './store/context/notifications.context';

function App() {
  return (
    <div className="mh-organization">
      <ScrollToTop />
      <NotificationContextProvider>
        <AppNavigator />
      </NotificationContextProvider>
    </div>
  );
}

export default App;
