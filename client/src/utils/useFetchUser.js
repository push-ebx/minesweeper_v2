import userService from "@/api/user.js";
import {setBalance, setUserID} from "@/slices/user-slice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import bridge from "@vkontakte/vk-bridge";

export const useFetchUser = () => {
  const balance = Math.floor(useSelector((state) => state.user.balance));
  const userID = useSelector((state) => state.user.userID);
  const [fetching, setFetching] = useState(false);
  const dispatch = useDispatch();

  const updateInfo = async () => {
    setFetching(true)
    let user = await userService.getUser()

    if (!user) {
      const _user = await bridge.send('VKWebAppGetUserInfo')
      user = await userService.createUser(_user)
    }

    dispatch(setBalance(user.balance))
    dispatch(setUserID(user.id_vk))
    setFetching(false)
  }

  useEffect(() => {
    (!balance || !userID) && updateInfo()
  }, [])

  return {balance, userID, fetching, updateInfo}
}