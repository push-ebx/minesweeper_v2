import styles from "./styles.module.scss";
import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {router} from "@/utils/routing";
import {useEffect, useState} from "react";
import {Button, ButtonGroup, CircularProgress, Input, ScrollShadow, Skeleton, useDisclosure, User}
  from "@nextui-org/react";
import {socket} from "@/api/socket";
import More7LessService, {TypeBet} from "@/api/more-7-less";
import {useDispatch, useSelector} from "react-redux";
import {changeBalance} from "@/slices/user-slice";
import {Dice} from "@/components/Dice";
import {GameModal} from "@/components/GameModal"
import {BoxInfo} from "@/components/BoxInfo";
import {formatNumber} from "@/utils/index.js";

const More7Less = ({id}) => {
  const balance = useSelector(state => state.user.balance)
  const userID = useSelector(state => state.user.userID)
  const [bet, setBet] = useState('')
  const [bets, setBets] = useState([])
  const [dices, setDices] = useState([])
  const [lost_time, setLostTime] = useState(0)
  const [isGame, setIsGame] = useState(false)
  const [modalBody, setModalBody] = useState('')
  const [history, setHistory] = useState([])
  const [hash, setHash] = useState("")
  const [key, setKey] = useState("")

  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch = useDispatch();

  const coefficients = {more: 2.3, less: 2.3, equal: 5.8};

  useEffect(() => {
    fetchBets()
    fetchHistory()

    socket.on('start game m7l', data => setHash(data.hash))
    socket.on('new bet m7l', newBet)
    socket.on('stop game m7l', stopGame)
    socket.on('lost time m7l', data => setLostTime(data.lost_time))
  }, [])

  useEffect(() => {
    if (!dices.length) return
    const my_bet = bets.find(_bet => _bet.id_vk === userID.toString())

    if (my_bet === undefined) return

    const sum_dices = dices[0] + dices[1]
    const win_type = sum_dices > 7 ? 'more' : (sum_dices < 7 ? 'less' : 'equal')

    if (win_type === my_bet.type_bet) {
      setTimeout(() => dispatch(changeBalance(coefficients[win_type] * bet)), 2000);
      setModalBody("Ты выиграл " + coefficients[win_type] * bet + '!');
    } else {
      setModalBody("Ты проиграл " + bet + "!")
    }
  }, [dices])

  const fetchBets = async () => {
    const _bets = await More7LessService.getBank()
    setBets(_bets)
  }

  const fetchHistory = async () => {
    const _history = await More7LessService.getHistory()
    setHistory(_history)
  }

  const define_type = dices => {
    const sum_dices = dices[0] + dices[1]
    return sum_dices > 7 ? 'more' : (sum_dices < 7 ? 'less' : 'equal')
  }

  const newBet = (_bet) => {
    setBets(prev => [...prev, _bet])
  }

  const stopGame = (data) => {
    setDices(data.dices)

    setTimeout(() => {
      onOpen()
      setHistory(prev => [data.dices, ...prev])
      setKey(data.key)
    }, 2500)
    setTimeout(() => {
      onClose()
      setBets([])
      setDices([])
      setIsGame(false)
      setModalBody('')
      setKey('')
      // setHash('')
    }, 5000)
  }

  const makeBet = async (type_bet) => {
    if (!isFinite(bet) || bet <= 0 || bet > balance) {
      setModalBody("Некорректная ставка!")
      onOpen()
      return
    }
    setIsGame(true)
    dispatch(changeBalance(-bet))
    await More7LessService.newBet(bet, type_bet)
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

  const DiceCard = () => (
    <div className={styles.dices}>
      <Dice value={dices[0]}/>
      <Dice value={dices[1]}/>
    </div>
  )

  return (
    <Panel id={id}>
      <PanelHeader before={<PanelHeaderBack onClick={() => router.popPage()}/>}>
        Больше 7 Меньше
      </PanelHeader>
      <div
        className={styles.main}
      >
        <div className={styles.balance}>
          <h2>Твой баланс:</h2>
          <h2>{formatNumber(balance)}</h2>
        </div>

        <BoxInfo>
          {
            dices.length ? DiceCard() :
              lost_time ? TimerCard() :
                <h1>Сделай ставку первым!</h1>
          }
        </BoxInfo>

        <div className={styles.input_bet}>
          <Input
            isDisabled={isGame}
            placeholder="Введи ставку..."
            onChange={e => setBet(e.target.value)}
            value={bet.toString()}
          />
          <ButtonGroup variant="bordered" isDisabled={isGame}>
            <Button onClick={() => setBet(prev => prev * 2)}>x2</Button>
            <Button onClick={() => setBet(prev => Math.floor(prev / 2))}>&#247; 2</Button>
          </ButtonGroup>
        </div>

        <div className={styles.bet_buttons}>
          <ButtonGroup isDisabled={isGame} fullWidth>
            <Button
              onClick={() => makeBet(TypeBet.less)}
              color="primary"
              variant="shadow"
            >
              Меньше 7
            </Button>
            <Button
              onClick={() => makeBet(TypeBet.equal)}
              color="success"
              variant="shadow"
            >
              Равно 7
            </Button>
            <Button
              onClick={() => makeBet(TypeBet.more)}
              color="danger"
              variant="shadow"
            >
              Больше 7
            </Button>
          </ButtonGroup>
        </div>

        <div>История игр:</div>
        <Skeleton isLoaded={history.length !== 0} className={styles.skeleton_history}>
          <ScrollShadow hideScrollBar className={styles.scroll_history} orientation="horizontal">
            <div className={styles.history}>
              {
                history.map((dices, i) => (
                  <div className={styles[define_type(dices)]} key={i}>{dices[0] + dices[1]}</div>
                ))
              }
            </div>
          </ScrollShadow>
        </Skeleton>

        <div>Ставки:</div>
        <div className={styles.bets_wrapper}>
          <div className={styles.bets}>
            {
              bets.map((_bet, i) => (
                <div className={styles.bet}>
                  <User
                    name={`${_bet.last_name} ${_bet.first_name}`}
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

      <GameModal
        title={'Результаты игры'}
        body={modalBody}
        onClose={onClose}
        isOpen={isOpen && modalBody}
      />
    </Panel>
  );
};

export {More7Less};