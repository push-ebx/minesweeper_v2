import ReactDOM from 'react-dom/client'
import {App} from './components/App/index.jsx'
import bridge from '@vkontakte/vk-bridge';
import {NextUIProvider} from "@nextui-org/react";
import {RouterContext} from '@happysanta/router';
import {router} from "./utils/routing";
import store from './slices';
import {AdaptivityProvider, ConfigProvider} from "@vkontakte/vkui";
import {Provider} from "react-redux";

bridge.send('VKWebAppInit');

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterContext.Provider value={router}>
    <NextUIProvider>
      <Provider store={store}>
        <ConfigProvider isWebView={true} appearance="dark">
          <AdaptivityProvider>
            <App />
          </AdaptivityProvider>
        </ConfigProvider>
      </Provider>
    </NextUIProvider>
  </RouterContext.Provider>
)