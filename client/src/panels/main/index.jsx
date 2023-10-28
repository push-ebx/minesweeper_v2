import styles from './styles.module.scss'
import {Panel, PanelHeader, PanelHeaderContent, PullToRefresh} from "@vkontakte/vkui";
import {useFetchUser} from "@/utils/useFetchUser";
import {BoxInfo} from "@/components/BoxInfo";
import {formatNumber} from "@/utils";
import {Button, ButtonGroup, useDisclosure, User} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {GameModal} from "@/components/GameModal/index.jsx";
import bridge from "@vkontakte/vk-bridge";
import UserService from "@/api/user.js";
import {Loader} from "@/components/Loader/index.jsx";
import {useState} from "react";

const Main = ({id}) => {
  const {balance, avatar_url, first_name, last_name, fetching, updateInfo} = useFetchUser()
  const online = useSelector(state => state.app.online)
  const {isOpen: isOpenDeposit, onOpen: onOpenDeposit, onClose: onCloseDeposit} = useDisclosure();
  const {isOpen: isOpenWithdraw, onOpen: onOpenWithdraw, onClose: onCloseWithdraw} = useDisclosure();
  const [isWithdraw, setIsWithdraw] = useState(false)

  const onRefresh = async () => {
    await updateInfo()
  }

  const onDeposit = () => {
    onOpenDeposit()
    bridge.send('VKWebAppCopyText', {
      text: 'Передать @saper_bot__bandit '
    })
  }

  const onWithdraw = async () => {
    if (balance <= 0) return onOpenWithdraw()

    setIsWithdraw(true)
    await UserService.withdraw()
    await updateInfo()
    setIsWithdraw(false)
  }

  return (
    <Panel id={id}>
      <Loader isLoading={isWithdraw} isFullScreen/>
      <PanelHeader className={styles.header}>
        <PanelHeaderContent>
          <User
            className={styles.user}
            name={`${first_name} ${last_name}`}
            avatarProps={{
              src: avatar_url
            }}
            description={'online: ' + online}
          />
        </PanelHeaderContent>
      </PanelHeader>
      <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
        <div className={styles.main}>
          <BoxInfo>
            <h1 className={styles.balance}>{formatNumber(balance)}</h1>
            <ButtonGroup variant={"bordered"} fullWidth>
              <Button onClick={onDeposit}>Пополнить</Button>
              <Button onClick={onWithdraw}>Вывести</Button>
            </ButtonGroup>
          </BoxInfo>

          <div className={styles.statistics}>
            {/*<div>Столько выиграл</div>*/}
            {/*<div>Столько проиграл</div>*/}
            {/*<div>Сколько ставок</div>*/}
            {/*<div>Выиграно</div>*/}
            {/*<div>Проиграно</div>*/}
          </div>
        </div>
      </PullToRefresh>

      <GameModal
        title={'Пополнение'}
        body={"Чтобы пополнить баланс, перейди в диалог с Бот Бандит и отправь" +
          " сообщение (оно скопируется в буфер обмена): Передать @saper_bot__bandit [сумма]."}
        onClose={onCloseDeposit}
        isOpen={isOpenDeposit}
        textButton={<a target={'_blank'} href={"https://vk.com/write-166948584?ref=5020518&ref_source=video"}>Перейти в диалог</a>}
      />
      <GameModal
        title={'Вывод'}
        body={"Твой баланс равен нулю!"}
        onClose={onCloseWithdraw}
        isOpen={isOpenWithdraw}
      />
    </Panel>
  );
};

export {Main};