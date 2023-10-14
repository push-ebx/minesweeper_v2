import './index.scss'
import '@vkontakte/vkui/dist/vkui.css'
import {AppRoot, SplitCol, SplitLayout, View} from "@vkontakte/vkui";
import {PANEL_GAMES, PANEL_MAIN, PANEL_MINES, PANEL_MORE_7_LESS, VIEW_MAIN} from "@/utils/routing/routes.js";
import {Games, Main, Mines, More7Less} from "@/panels"
import {useActivePanel} from "@/utils/routing";
import {Tabbar} from "@/components/Tabbar";

export const App = () => {
  const [activePanel] = useActivePanel(VIEW_MAIN)

  return (
    <AppRoot>
      <SplitLayout>
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
  )
}