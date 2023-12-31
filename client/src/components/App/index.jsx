import './index.scss'
import '@vkontakte/vkui/dist/vkui.css'
import {AppRoot, SplitCol, SplitLayout, View} from "@vkontakte/vkui";
import {
  PANEL_CRUSH,
  PANEL_GAMES, PANEL_MAIN, PANEL_MINES, PANEL_MORE_7_LESS, PANEL_TOP, PANEL_WHEEL, VIEW_MAIN
} from "@/utils/routing/routes.js";
import {Crush, Games, Main, Mines, More7Less, Top, Wheel} from "@/panels"
import {useActivePanel} from "@/utils/routing";
import {Tabbar} from "@/components/Tabbar";
import {useEffect} from "react";
import {socket} from "@/api/socket.js";
import {useFetchUser} from "@/utils/useFetchUser.js";
import {Loader} from "@/components/Loader";
import {useDispatch} from "react-redux";
import {setOnline} from "@/slices/app-slice.js";

import Snowfall from 'react-snowfall'
import snowflake_svq from "@/../assets/svg/snowflake.svg";

export const App = () => {
  const [activePanel] = useActivePanel(VIEW_MAIN)
  const {userID, fetching, updateInfo} = useFetchUser()
  const dispatch = useDispatch();

  const snowflake = document.createElement('img');
  snowflake.src = snowflake_svq;

  useEffect(() => {
    if (userID) {
      socket.emit('connected', {id_vk: userID});
      socket.on('update balance', ({id_vk}) => id_vk === userID && updateInfo());
      socket.on('new online', data => dispatch(setOnline(data.online)))
    }
  }, [userID])

  return (
    <>
      <Snowfall style={{
        position: 'fixed',
        width: '100vw',
        height: '100vh',
        zIndex: 999,
        opacity: 0.7
      }}
        snowflakeCount={15}
        speed={[0.5, 0.8]}
        radius={[12, 20]}
        images={[snowflake]}
      />
      <Loader isLoading={!userID} isFullScreen/>
      <AppRoot className={"dark"}>
        <SplitLayout>
          <SplitCol>
            <View id={VIEW_MAIN} activePanel={activePanel}>
              <Main id={PANEL_MAIN} />
              <Games id={PANEL_GAMES} />
              <Top id={PANEL_TOP} />
              <Mines id={PANEL_MINES} />
              <More7Less id={PANEL_MORE_7_LESS} />
              <Wheel id={PANEL_WHEEL} />
              <Crush id={PANEL_CRUSH} />
            </View>
            <Tabbar activePanel={activePanel} />
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </>
  )
}