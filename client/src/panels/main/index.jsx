import {Div, Panel, PanelHeader, PullToRefresh} from "@vkontakte/vkui";
import {useFetchUser} from "@/utils/useFetchUser";

const Main = ({id}) => {
  const {balance, fetching, updateInfo} = useFetchUser()

  const onRefresh = async () => {
    updateInfo()
  }

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
        <Div
          style={{height: 'calc(100vh - var(--vkui--size_panel_header_height--regular))'}}
        >
          Баланс: ${balance}
        </Div>
      </PullToRefresh>
    </Panel>
  );
};

export {Main};