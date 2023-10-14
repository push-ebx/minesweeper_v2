import ReactDOM from 'react-dom/client'
import {App} from './components/App/index.jsx'
import bridge from '@vkontakte/vk-bridge';
import {NextUIProvider} from "@nextui-org/react";
import {RouterContext} from '@happysanta/router';
import {router} from "./utils/routing";
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";

bridge.send('VKWebAppInit');

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterContext.Provider value={router}>
    <NextUIProvider>
      <ConfigProvider isWebView={true}>
        <AdaptivityProvider>
          <App />
        </AdaptivityProvider>
      </ConfigProvider>
    </NextUIProvider>
  </RouterContext.Provider>
)