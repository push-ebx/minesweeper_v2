import mines from "./mines.jpg"
import more_7_less from "./more_7_less.jpg"
import {PAGE_MINES, PAGE_MORE_7_LESS} from "@/utils/routing/routes.js";

export const gameList = [
  {
    label: "Mines",
    page_title: PAGE_MINES,
    img: mines,
  },
  {
    label: "More than 7 less",
    page_title: PAGE_MORE_7_LESS,
    img: more_7_less,
  },
]