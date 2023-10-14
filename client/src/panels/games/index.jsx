import {Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {router} from "@/utils/routing";
import {gameList} from "./game-list";

const Games = ({id}) => {
  return (
    <Panel id={id}>
      <PanelHeader
        before={<PanelHeaderBack onClick={() => router.popPage()}/>}
      >
        Игры
      </PanelHeader>

      <div
        style={{
          minHeight: 'calc(100vh - var(--vkui--size_panel_header_height--regular) - var(--vkui_internal--tabbar_height))',
          padding: '20px 30px 70px',
          display: "flex",
        }}>
        <div style={{display: 'flex', justifyContent: 'center', flexWrap: "wrap", alignItems: "flex-start"}}>
          {gameList.map((item, index) => (
            <Card
              shadow="sm"
              key={index}
              isPressable
              onPress={() => router.pushPage(item.page_title)}
              style={{margin: 5}}
            >
              <CardBody>
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100px"
                  alt={item.label}
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="text-small justify-between">
                <b>{item.label}</b>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </Panel>
  );
};

export {Games};