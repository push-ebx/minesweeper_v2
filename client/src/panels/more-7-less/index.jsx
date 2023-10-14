import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {router} from "@/utils/routing";

const More7Less = ({id}) => {
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => router.popPage()}/>}>
        M7L
      </PanelHeader>
      <div>
        M7L
      </div>
    </Panel>
  );
};

export {More7Less};