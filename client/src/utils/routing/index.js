import {Page, Router} from "@happysanta/router";
import {
  MODAL_NUMBER_KEYBOARD,
  PAGE_GAMES,
  PAGE_MAIN,
  PAGE_MINES, PAGE_MORE_7_LESS,
  PANEL_GAMES,
  PANEL_MAIN,
  PANEL_MINES, PANEL_MORE_7_LESS,
  VIEW_MAIN
} from "./routes.js";

const routes = {
  [PAGE_MAIN]: new Page(PANEL_MAIN, VIEW_MAIN),
  [PAGE_GAMES]: new Page(PANEL_GAMES, VIEW_MAIN),
  [PAGE_MINES]: new Page(PANEL_MINES, VIEW_MAIN),
  [PAGE_MORE_7_LESS]: new Page(PANEL_MORE_7_LESS, VIEW_MAIN),
  [MODAL_NUMBER_KEYBOARD]: new Page(MODAL_NUMBER_KEYBOARD, VIEW_MAIN),
};

export const router = new Router(routes);
router.start();

export {useActivePanel} from "./useActivePanel.js"