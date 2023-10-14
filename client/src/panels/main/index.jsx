import {Panel} from "@vkontakte/vkui";
import {useEffect} from "react";
import { socket } from '@/api/socket';

const Main = ({id}) => {

  useEffect(() => {
    function onConnect() {
      console.log("con")
    }

    function onDisconnect() {
      console.log("dis")
    }

    function onFooEvent(value) {
      console.log(value)
    }

    socket.on('connect', onConnect);
    socket.on('disconnect', onDisconnect);
    socket.on('chat message', onFooEvent);

    return () => {
      socket.off('connect', onConnect);
      socket.off('disconnect', onDisconnect);
      socket.off('foo', onFooEvent);
    };
  }, [])

  return (
    <Panel id={id}>
      <div>
        <button onClick={() => {
          socket.emit('chat message', 'input.value');
        }}>кнопка</button>
        {import.meta.env.VITE_DOMAIN}
      </div>
    </Panel>
  );
};

export {Main};