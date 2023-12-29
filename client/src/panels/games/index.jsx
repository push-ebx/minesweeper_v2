import {Badge, Card, CardBody, CardFooter, Image} from "@nextui-org/react";
import {Panel, PanelHeader, PanelHeaderBack, PanelHeaderButton} from "@vkontakte/vkui";
import {router} from "@/utils/routing";
import {gameList} from "./game-list";
import {Icon28ChevronBack} from '@vkontakte/icons'

const Games = ({id}) => {
  return (
    <Panel id={id}>
      <PanelHeader
        before={
          <PanelHeaderButton onClick={() => router.popPage()}>
            <Icon28ChevronBack style={{height: '4.3vh', width: '4.3vh'}}/>
          </PanelHeaderButton>
        }
      >
        <h2>Игры</h2>
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
              style={{paddingBottom: 5}}
            >
              <CardBody style={{display: 'flex', alignItems: 'center'}}>
                <Image
                  shadow="sm"
                  radius="lg"
                  width="100px"
                  height="100px"
                  alt={item.label}
                  src={item.img}
                />
              </CardBody>
              <CardFooter className="text-small">
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