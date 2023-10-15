import {Panel} from "@vkontakte/vkui";
import {useEffect} from "react";
import { socket } from '@/api/socket';
import bridge from "@vkontakte/vk-bridge";
import axios from "axios";

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
          let values = 'value';

          bridge.send('VKWebAppCreateHash', {payload: values})
            .then((data) => {
              if (data.sign) {
                axios.post(`${import.meta.env.VITE_DOMAIN}/api/test`, {
                  data
                })
                .then(res => {
                  console.log(res);
                })
              }
            })
            .catch((error) => {
              console.log(error);
            });

          // socket.emit('chat message', 'input.value');
        }}>кнопка</button>
        {import.meta.env.VITE_DOMAIN}
      </div>
    </Panel>
  );
};

export {Main};