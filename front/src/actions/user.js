import { LOGIN, GET_USERS, DELETE_USER, CREATE_USER, UPDATE_USER } from "./index";
import * as userApi from '../api/user';
import { setItem } from "../util/localStorage";

const loginUser = (user) => ({ type: LOGIN, user })
const updateUserAction = (user) => ({ type: UPDATE_USER, user })
const setUsers = (users) => ({ type: GET_USERS, users })
const removeUser = (userId) => ({ type: DELETE_USER, userId })
const addUser = (user) => ({ type: CREATE_USER, user })

export const updateUser = (user) =>
    async (dispatch) => {
        try {
            await userApi.update(user)
            dispatch(updateUserAction(user))
        } catch (e) {
            alert(e.message)
        }
    }

export const signIn = (email, password) =>
    async (dispatch) => {
        try {
            const user = await userApi.login({ email, password });
            setItem("token", user.token)
            dispatch(loginUser(user))
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

export const deleteUser = (userId) =>
    async (dispatch) => {
        try {
            await userApi.remove(userId)
            dispatch(removeUser(userId))
        } catch (e) {
            alert(e.message)
        }
    }


export const createUser = (user) =>
    async (dispatch) => {
        try {
            const newUser = await userApi.create(user);
            dispatch(addUser(newUser))
        } catch (e) {
            alert(e.message)
        }
    }
