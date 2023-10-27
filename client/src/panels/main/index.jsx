import styles from './styles.module.scss'
import {Panel, PanelHeader, PanelHeaderContent, PullToRefresh} from "@vkontakte/vkui";
import {useFetchUser} from "@/utils/useFetchUser";
import {BoxInfo} from "@/components/BoxInfo";
import {formatNumber} from "@/utils";
import {User} from "@nextui-org/react";
import {useSelector} from "react-redux";

const Main = ({id}) => {
  const {balance, avatar_url, first_name, last_name, fetching, updateInfo} = useFetchUser()
  const online = useSelector(state => state.app.online)

  const onRefresh = async () => {
    updateInfo()
  }

  return (
    <Panel id={id}>
      <PanelHeader className={styles.header}>
        <PanelHeaderContent>
          <User
            className={styles.user}
            name={`${first_name} ${last_name}`}
            avatarProps={{
              src: avatar_url
            }}
            description={'online ' + online}
          />
        </PanelHeaderContent>
      </PanelHeader>
      <PullToRefresh onRefresh={onRefresh} isFetching={fetching}>
        <div className={styles.main}>
          <BoxInfo>
            <h1 className={styles.balance}>{formatNumber(balance)}</h1>
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
    </Panel>
  );
};

export {Main};