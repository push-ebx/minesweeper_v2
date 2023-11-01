import {Tabbar as TabbarVK, TabbarItem} from "@vkontakte/vkui";
import {PAGE_GAMES, PAGE_MAIN, PAGE_TOP, PANEL_GAMES, PANEL_MAIN, PANEL_TOP} from "@/utils/routing/routes.js";
import {Icon28CupOutline, Icon28GameOutline, Icon28HomeOutline} from "@vkontakte/icons";
import {router} from "@/utils/routing";

const Tabbar = ({activePanel}) => {
  return (
    <TabbarVK>
      <TabbarItem
        selected={activePanel === PANEL_MAIN}
        onClick={() => router.pushPage(PAGE_MAIN)}
      >
        <Icon28HomeOutline />
      </TabbarItem>
      <TabbarItem
        selected={activePanel === PANEL_GAMES}
        onClick={() => router.pushPage(PAGE_GAMES)}
      >
        <Icon28GameOutline />
      </TabbarItem>
      <TabbarItem
        selected={activePanel === PANEL_TOP}
        onClick={() => router.pushPage(PAGE_TOP)}
      >
        <Icon28CupOutline />
      </TabbarItem>
    </TabbarVK>
  );
};

export {Tabbar};