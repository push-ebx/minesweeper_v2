import {Panel, PanelHeader, PanelHeaderBack} from "@vkontakte/vkui";
import {router} from "@/utils/routing";
import {useEffect, useState} from "react";
import {
  Button, ButtonGroup,
  Card,
  CardBody,
  CircularProgress,
  Input,
  useDisclosure,
  User
} from "@nextui-org/react";
import {socket} from "@/api/socket";
import More7LessService, {TypeBet} from "@/api/more-7-less";
import {useDispatch, useSelector} from "react-redux";
import {changeBalance} from "@/slices/user-slice";
import styles from "./styles.module.scss";
import {Dice} from "@/components/Dice";
import {GameModal} from "@/components/GameModal"

const More7Less = ({id}) => {
  const balance = useSelector(state => state.user.balance)
  const userID = useSelector(state => state.user.userID)
  const [bet, setBet] = useState(Math.floor(balance / 10))
  const [bets, setBets] = useState([])
  const [dices, setDices] = useState([])
  const [lost_time, setLostTime] = useState(0)
  const [isGame, setIsGame] = useState(false)
  const [resultGame, setResultGame] = useState('')

  const {isOpen, onOpen, onClose} = useDisclosure();
  const dispatch = useDispatch();

  const coefficients = {more: 2.3, less: 2.3, equal: 5.8};

  useEffect(() => {
    fetchBets()
    socket.on('new bet', newBet)
    socket.on('stop game', stopGame)
    socket.on('lost time', data => setLostTime(data.lost_time))
  }, [])

  useEffect(() => {
    if (!dices.length) return

    const my_bet = bets.find(_bet => _bet.id_vk === userID.toString())
    if (my_bet === undefined) return

    const sum_dices = dices[0] + dices[1]
    const win_type = sum_dices > 7 ? 'more' : (sum_dices < 7 ? 'less' : 'equal')

    if (win_type === my_bet.type_bet) {
      setTimeout(() => dispatch(changeBalance(coefficients[win_type] * bet)), 2000);
      setResultGame("Ты выиграл " + coefficients[win_type] * bet + '!');
    }
    else {
      setResultGame("Ты проиграл " + bet + "!")
    }
  }, [dices])

  const fetchBets = async () => {
    const _bets = await More7LessService.getBank()
    setBets(_bets)
  }

  const newBet = (_bet) => {
    setBets(prev => [...prev, _bet])
  }

  const stopGame = (data) => {
    setDices(data.dices)

    setTimeout(() => {
      const my_bet = bets.find(_bet => _bet.id_vk === userID.toString())
      console.log(my_bet)
      if (my_bet !== undefined) onOpen()
    }, 2500)
    setTimeout(() => {
      onClose()
      setBets([])
      setDices([])
      setIsGame(false)
    }, 5000)
  }

  const makeBet = async (type_bet) => {
    if (!isFinite(bet)) return
    setIsGame(true)
    if (bet > 0 && bet <= balance) dispatch(changeBalance(-bet))
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
      <Dice value={dices[0]} />
      <Dice value={dices[1]} />
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
          <span>Твой баланс:</span>
          <span>${balance}</span>
        </div>

        <Card className={styles.card}>
          <CardBody className={styles.card_body}>
          {
            dices.length ? DiceCard() :
            lost_time ? TimerCard() :
            <h1>&#8804; Сделай ставку первым! &#8805;</h1>
          }
          </CardBody>
        </Card>

        <div className={styles.input_bet}>
          <Input
            isDisabled={isGame}
            placeholder="Введи ставку..."
            onChange={e => setBet(e.target.value)}
            value={bet.toString()}
          />
          <ButtonGroup variant="bordered" isDisabled={isGame}>
            <Button onClick={() => setBet(prev => prev * 2)}>x2</Button>
            <Button onClick={() => setBet(prev => prev / 2)}>&#247; 2</Button>
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
        <div>Ставки:</div>
        <div className={styles.bets_wrapper}>
          <div className={styles.bets}>
            {
              bets.map((_bet, i) => (
                <User
                  name={`${_bet.last_name} ${_bet.first_name}`}
                  description={'$' + _bet.bet}
                  avatarProps={{
                    src: _bet.avatar_url
                  }}
                  key={i}
                />
              ))
            }
          </div>
        </div>
      </div>
      <GameModal
        title={'Результаты игры'}
        body={resultGame}
        onClose={onClose}
        isOpen={isOpen}
      />
    </Panel>
  );
};

export {More7Less};