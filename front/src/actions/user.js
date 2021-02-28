import { LOGIN } from "./index";
import * as userApi from '../api/user';

const updateUser = (user) => ({ type: LOGIN, user })

export const signIn = (email, password) =>
    async (dispatch) => {
        try {
            const user = await userApi.login({ email, password });
            dispatch(updateUser(user))
        } catch (e) {
            alert(e.message)
        }
    }

