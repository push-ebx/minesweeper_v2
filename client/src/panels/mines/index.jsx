import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {router} from "@/utils/routing";

const Mines = ({id}) => {
  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => router.popPage()}/>}>
        Mines
      </PanelHeader>
      <div>
        mines
      </div>
    </Panel>
  );
};

export {Mines};