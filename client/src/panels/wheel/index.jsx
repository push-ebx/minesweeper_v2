import styles from './styles.module.scss'
import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {useFetchUser} from "@/utils/useFetchUser";
import {BoxInfo} from "@/components/BoxInfo";
import {formatNumber} from "@/utils";
import {Button, ButtonGroup, useDisclosure, User} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {GameModal} from "@/components/GameModal/index.jsx";
import UserService from "@/api/user.js";
import {Loader} from "@/components/Loader/index.jsx";
import {useEffect, useState} from "react";
import {router} from "@/utils/routing/index.js";
import clsx from "clsx";
import {Roulette} from "@/components/Roulette";

const Wheel = ({id}) => {
  const [mustSpin, setMustSpin] = useState(false);

  useEffect(() => {
    console.log(+new Date())
  }, [mustSpin])

  const handleSpinClick = () => {
    if (!mustSpin) {
      setMustSpin(true);
      // setTimeout(() => {
      //   setMustSpin(false)
      // }, 11370)
    }
  };

  return (
    <Panel id={id}>
      {/*<Loader isLoading={!users.length} isFullScreen className={styles.loader}/>*/}
      <PanelHeader before={<PanelHeaderBack onClick={() => router.popPage()}/>}>
        <h2>Wheel</h2>
      </PanelHeader>
      <div className={styles.main}>
        <Roulette value={0} mustSpin={mustSpin} setMustSpin={setMustSpin}/>
        <Button onClick={handleSpinClick}>Spin</Button>
      </div>
    </Panel>
  );
};

export {Wheel};