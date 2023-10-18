import {Div, Panel, PanelHeader, PullToRefresh} from "@vkontakte/vkui";
import {useFetchUser} from "@/utils/useFetchUser";
import {useEffect} from "react";
import {socket} from "@/api/socket.js";

const Main = ({id}) => {
  const {balance, fetching, userID, updateInfo} = useFetchUser()

  const onRefresh = async () => {
    updateInfo()
  }

  useEffect(() => {
    userID && socket.emit('connected', {id_vk: userID});
  }, [userID])

  return (
    <Panel id={id}>
      <PanelHeader>Главная</PanelHeader>
      <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
        <Div
          style={{height: 'calc(100vh - var(--vkui--size_panel_header_height--regular))'}}
        >
          Баланс: {balance}
        </Div>
      </PullToRefresh>
    </Panel>
  );
};

export {Main};