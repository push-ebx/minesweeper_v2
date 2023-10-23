import './index.scss'
import '@vkontakte/vkui/dist/vkui.css'
import {AppRoot, ModalRoot, SplitCol, SplitLayout, View} from "@vkontakte/vkui";
import {
  MODAL_NUMBER_KEYBOARD,
  PANEL_GAMES,
  PANEL_MAIN,
  PANEL_MINES,
  PANEL_MORE_7_LESS,
  VIEW_MAIN
} from "@/utils/routing/routes.js";
import {Games, Main, Mines, More7Less} from "@/panels"
import {useActivePanel} from "@/utils/routing";
import {Tabbar} from "@/components/Tabbar";
import {useEffect} from "react";
import {socket} from "@/api/socket.js";
import {useFetchUser} from "@/utils/useFetchUser.js";
import {Loader} from "@/components/Loader";
import {router} from "@/utils/routing";
import {NumberKeyboard} from "@/components/NumberKeyborad";
import {useLocation} from "@happysanta/router";
import {useDispatch} from "react-redux";
import {setOnline} from "@/slices/app-slice.js";

export const App = () => {
  const [activePanel] = useActivePanel(VIEW_MAIN)
  const {userID, fetching, updateInfo} = useFetchUser()
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (userID) {
      socket.emit('connected', {id_vk: userID});
      socket.on('update balance', updateInfo);
      socket.on('new online', data => dispatch(setOnline(data.online)))
    }
  }, [userID])

  const modal = (
    <ModalRoot activeModal={location.getModalId()} onClose={() => router.popPage()}>
      <NumberKeyboard id={MODAL_NUMBER_KEYBOARD}/>
    </ModalRoot>
  );

  return (
    <>
      <Loader isLoading={!userID} isFullScreen/>
      <AppRoot className={"dark"}>
        <SplitLayout modal={modal}>
          <SplitCol>
            <View id={VIEW_MAIN} activePanel={activePanel}>
              <Main id={PANEL_MAIN} />
              <Games id={PANEL_GAMES} />
              <Mines id={PANEL_MINES} />
              <More7Less id={PANEL_MORE_7_LESS} />
            </View>

            <Tabbar activePanel={activePanel} />
          </SplitCol>
        </SplitLayout>
      </AppRoot>
    </>
  )
}