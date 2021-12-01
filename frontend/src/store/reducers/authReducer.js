const defaultState = {
    login: "",
    password: "",
    confirm: "",
    confirmed: "error",
}

export const authReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "LOGIN_CHANGE":
            return {...state, login: action.payload}
        case "PASSWORD_CHANGE":
            return {...state, password: action.payload, confirmed: action.payload === state.confirm ? "ok" : "error" }
        case "CONFIRM_CHANGE":
            return {...state, confirm: action.payload, confirmed: action.payload === state.password ? "ok" : "error"}
        default:
            return state;
    }
}