import styles from './styles.module.scss'
import {Panel, PanelHeader, PanelHeaderBack, PanelHeaderButton} from "@vkontakte/vkui";
import {useFetchUser} from "@/utils/useFetchUser";
import {BoxInfo} from "@/components/BoxInfo";
import {formatNumber} from "@/utils";
import {
  Button,
  ButtonGroup,
  CircularProgress,
  Input,
  ScrollShadow,
  Skeleton,
  useDisclosure,
  User
} from "@nextui-org/react";
import {useSelector} from "react-redux";
import {GameModal} from "@/components/GameModal/index.jsx";
import UserService from "@/api/user.js";
import {useEffect, useState} from "react";
import {router} from "@/utils/routing/index.js";
import clsx from "clsx";
import {Icon28ChevronBack} from "@vkontakte/icons";
import {Chart} from "@/components/ChartCrush/index.jsx";
import More7LessService, {TypeBet} from "@/api/more-7-less.js";
import {socket} from "@/api/socket.js";
import {changeBalance} from "@/slices/user-slice.js";
import CrashService from "@/api/crush.js";

const Crush = ({id}) => {
  const balance = useSelector(state => state.user.balance);
  const [bet, setBet] = useState('1000')
  const [lost_time, setLostTime] = useState(0);
  const { innerWidth: width, innerHeight: height } = window;

  const [isGame, setIsGame] = useState(false);
  const [coefficient, setCoefficient] = useState(0);
  const [bets, setBets] = useState([]);
  const [hash, setHash] = useState("");
  const [key, setKey] = useState("");
  const [gameTime, setGameTime] = useState(0);

  useEffect(() => {
    // fetchBets()
    // fetchHistory()

    socket.on('start game crash', data => setHash(data.hash))
    socket.on('new bet crash', newBet)
    socket.on('stop game crash', stopGame)
    socket.on('lost time crash', data => setLostTime(data.lost_time))
    socket.on('game time crash', data => setGameTime(data.game_time))
  }, [])

  const newBet = (_bet) => {
    setBets(prev => [...prev, _bet])
  }

  const stopGame = (data) => {
    // setGameTime(data.game_time)

    setTimeout(() => { // открывается попап
      // onOpen()
      // setHistory(prev => [data.dices, ...prev])
      setKey(data.key)
    }, 2500)
    setTimeout(() => {
      // onClose()
      setBets([])
      setGameTime(0);
      setIsGame(false)
      // setModalBody('')
      setKey('')
      // setHash('')
    }, 5000)
  }

  const makeBet = async () => {
    if (gameTime) {
      // setModalBody("Идет подведение итогов!")
      // onOpen()
      return
    }
    if (!isFinite(bet) || bet <= 0 || bet > balance) {
      // setModalBody("Некорректная ставка!")
      // onOpen()
      return
    }
    if (lost_time === 2 || lost_time === 1) return // ahahaha
    await CrashService.newBet(+bet);
    setIsGame(true);
    // dispatch(changeBalance(-bet))
  }

  const TimerCard = () => (
    <CircularProgress
      className={styles.circular}
      value={lost_time}
      maxValue={10}
      color="success"
      formatOptions={{}}
      showValueLabel={true}
    />
  )

  return (
    <Panel id={id}>
      <PanelHeader before={
          <PanelHeaderButton onClick={() => router.popPage()}>
            <Icon28ChevronBack style={{height: '4.3vh', width: '4.3vh'}}/>
          </PanelHeaderButton>
        }
      >
        <h2>Crash {gameTime}</h2>
      </PanelHeader>
      <div className={styles.main}>
        <div className={styles.balance}>
          <h2>Твой баланс:</h2>
          <h2>{formatNumber(balance)}</h2>
        </div>

        {
          !lost_time && isGame ? <Chart id='chart' width={width-20} height={(width-20)/5*4} point_x={gameTime} is_stop={key}/> :
          <BoxInfo>
            {
              lost_time ? TimerCard() :
              <h1>Сделай ставку первым!</h1>
            }
          </BoxInfo>
        }

        {
          isGame
            ?
          <>
            <Button color="success" variant="shadow" disabled={false} fullWidth onClick={() => setIsGame(false)}>
              Забрать выигрыш
            </Button>
            <div>
            <div>Ставки:</div>
            <div className={styles.bets_wrapper}>
              <div className={styles.bets}>
                {
                  bets.map((_bet, i) => (
                    <div className={styles.bet}>
                      <User
                        name={`${_bet.last_name} ${_bet.first_name}`.slice(0, 30)}
                        description={formatNumber(_bet.bet)}
                        avatarProps={{
                          src: _bet.avatar_url
                        }}
                        key={i}
                      />
                      <div className={`${styles[_bet.type_bet]} ${styles.chip}`}>
                    <span>
                      {
                        _bet.type_bet === "less" ? "<" :
                          _bet.type_bet === "equal" ? "=" : ">"
                      }
                    </span>
                      </div>
                    </div>
                  ))
                }
              </div>
              </div>
              <div className={styles.check_game}>
                {hash ? <span>hash: {hash}</span> : ""}
                {key ? <span>key: {key}</span> : ""}
              </div>
            </div>
          </>
            :
          <>
            <div className={styles.input_bet}>
              <Input
                isDisabled={isGame}
                type="text"
                placeholder="Введи ставку..."
                onChange={e => {
                  if (!isFinite(e.target.value)) return;
                  if (+e.target.value > balance) {
                    setBet(balance)
                    return;
                  }
                  setBet(e.target.value)
                }}
                value={bet.toString()}
              />
              <ButtonGroup variant="bordered" isDisabled={isGame}>
                <Button onClick={() => setBet(prev => prev * 2)}>x2</Button>
                <Button onClick={() => setBet(prev => Math.floor(prev / 2))}>&#247; 2</Button>
              </ButtonGroup>
            </div>
            <Button fullWidth onClick={makeBet} color="success" variant="shadow">
              Поставить
            </Button>

            <div>История игр:</div>
            <Skeleton isLoaded={history.length !== 0} className={styles.skeleton_history}>
              <ScrollShadow hideScrollBar className={styles.scroll_history} orientation="horizontal">
                <div className={styles.history}>
                  {
                    // history.map((dices, i) => (
                    //   <div className={styles[define_type(dices)]} key={i}>{dices[0] + dices[1]}</div>
                    // ))
                  }
                </div>
              </ScrollShadow>
            </Skeleton>
          </>
        }
      </div>
    </Panel>
  );
};

export {Crush};