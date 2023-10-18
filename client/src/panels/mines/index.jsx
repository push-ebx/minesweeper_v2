import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {router} from "@/utils/routing";
import {useEffect, useState} from "react";
import bridge from "@vkontakte/vk-bridge";
import {socket} from "@/api/socket.js";

const Mines = ({id}) => {
  const [balance, setBalance] = useState(0)
  const [bets, setBets] = useState([])

  useEffect(() => {
    async function onConnect() {
      const user = await bridge.send('VKWebAppGetUserInfo')
      socket.emit('connected', {id_vk: user.id});
    }

    function onFooEvent(value) {
      console.log(value)
      setBets(prev => [...prev, value])
    }

    socket.on('connect', onConnect);
    socket.on('chat message', onFooEvent);
    socket.on('new bet', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('foo', onFooEvent);
    };
  }, [])

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => router.popPage()}/>}>
        Mines
      </PanelHeader>
      <div>
        Mines
      </div>
    </Panel>
  );
};

export {Mines};