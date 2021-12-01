const defaultState = {
    x: "",
    y: "",
    r: "1",
    errorStateX: "",
    errorStateY: ""
}


export const pointReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "X_CHANGE":
            return {...state, x: action.payload, errorStateX: action.payload > -3 && action.payload < 3 ? "" : "error"}
        case "Y_CHANGE":
            return {...state, y: action.payload, errorStateY: action.payload > -2 && action.payload < 5 ? "" : "error"}
        case "R_CHANGE":
            return {...state, r: action.payload}
        default:
            return state;
    }
}