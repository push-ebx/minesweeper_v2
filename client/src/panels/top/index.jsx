import styles from './styles.module.scss'
import {Panel, PanelHeader, PanelHeaderBack, PanelHeaderContent, PullToRefresh} from "@vkontakte/vkui";
import {useFetchUser} from "@/utils/useFetchUser";
import {BoxInfo} from "@/components/BoxInfo";
import {formatNumber} from "@/utils";
import {Button, ButtonGroup, useDisclosure, User} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {GameModal} from "@/components/GameModal/index.jsx";
import bridge from "@vkontakte/vk-bridge";
import UserService from "@/api/user.js";
import {Loader} from "@/components/Loader/index.jsx";
import {useEffect, useState} from "react";
import {router} from "@/utils/routing/index.js";
import clsx from "clsx";

const Top = ({id}) => {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetchUsers()
  }, []);

  const fetchUsers = async () => {
    const users = await UserService.getTop();
    setUsers(users)
  }

  return (
    <Panel id={id}>
      <Loader isLoading={!users.length} isFullScreen className={styles.loader}/>
      <PanelHeader before={<PanelHeaderBack onClick={() => router.popPage()}/>}>
        <h2>Топ</h2>
      </PanelHeader>
      <div className={styles.top}>
        {
          users.map((user, i) => (
            <div className={clsx(styles.row, styles[`top_${i+1}`])}>
              <div className={styles.place_user}>
                <h3 className={styles.place}>{i + 1}</h3>
                <User
                  className={styles.user}
                  name={`${user.last_name} ${user.first_name}`}
                  avatarProps={{
                    src: user.avatar_url
                  }}
                  key={i}
                />
              </div>
              <h3>{formatNumber(user.all_coin_win.low)}</h3>
            </div>
          ))
        }
      </div>
    </Panel>
  );
};

export {Top};