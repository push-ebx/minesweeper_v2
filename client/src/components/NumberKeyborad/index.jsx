import styles from "./styles.module.scss"
import {router} from "@/utils/routing";
import {FormItem, ModalCard} from "@vkontakte/vkui";
import {Button} from "@nextui-org/react";

const NumberKeyboard = ({id}) => {
  // const dispatch = useDispatch();
  // const countMines = useSelector((state) => state.mines.countMines);

  return (
    <ModalCard
      id={id}
      onClose={() => router.popPage()}
      // header="Клавиатура"
      // subheader=""
      actions={
        <FormItem style={{width: "100%", gap: 10, display: "flex", flexDirection: "column"}}>
          <Button>1</Button>
        </FormItem>
      }
    />
  );
};

export {NumberKeyboard};