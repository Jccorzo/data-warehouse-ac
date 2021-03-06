import { CREATE_USER, DELETE_USER, GET_USERS, LOGIN, UPDATE_USER } from "../actions";

const userInitial = {
    users: [],
    user: null
}

const userReducer = (state = userInitial, { type, user, userId, users }) => {
    switch (type) {
        case LOGIN:
            return {
                ...state,
                user: user
            }
        case CREATE_USER:
            return {
                ...state,
                users: [...state.users, user]
            }
        case UPDATE_USER:
            return {
                ...state,
                users: state.users.map(currentUser => (currentUser._id === user._id ? user : currentUser))
            }
        case DELETE_USER:
            return {
                ...state,
                users: state.users.filter(currentUser => currentUser._id !== userId)
            }
        case GET_USERS:
            return {
                ...state,
                users: users
            }
        default: return userInitial
    }
}

export default userReducer;