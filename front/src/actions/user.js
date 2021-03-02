import { LOGIN, GET_USERS } from "./index";
import * as userApi from '../api/user';
import { setItem } from "../util/localStorage";

const updateUser = (user) => ({ type: LOGIN, user })
const setUsers = (users) => ({ type: GET_USERS, users })

export const signIn = (email, password) =>
    async (dispatch) => {
        try {
            const user = await userApi.login({ email, password });
            setItem("token", user.token)
            dispatch(updateUser(user))
        } catch (e) {
            alert(e.message)
        }
    }

export const getUsers = () =>
    async (dispatch) => {
        try {
            const data = await userApi.get();
            dispatch(setUsers(data.users))
        } catch (e) {
            alert(e.message)
        }
    }

