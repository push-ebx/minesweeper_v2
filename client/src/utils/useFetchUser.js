import userService from "@/api/user.js";
import {setAvatar, setBalance, setFirstName, setLastName, setUserID} from "@/slices/user-slice.js";
import {useDispatch, useSelector} from "react-redux";
import {useEffect, useState} from "react";
import bridge from "@vkontakte/vk-bridge";

export const useFetchUser = () => {
  const balance = Math.floor(useSelector((state) => state.user.balance));
  const userID = useSelector((state) => state.user.userID);
  const avatar_url = useSelector((state) => state.user.avatar_url);
  const first_name = useSelector((state) => state.user.first_name);
  const last_name = useSelector((state) => state.user.last_name);
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
    dispatch(setAvatar(user.avatar_url))
    dispatch(setFirstName(user.first_name))
    dispatch(setLastName(user.last_name))
    dispatch(setUserID(user.id_vk))
    setFetching(false)
  }

  useEffect(() => {
    (!balance || !userID) && updateInfo()
  }, [])

  return {balance, userID, avatar_url, first_name, last_name, fetching, updateInfo}
}