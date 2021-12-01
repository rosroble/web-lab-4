const defaultState = {
    points: []
}

export const graphReducer = (state = defaultState, action) => {
    switch (action.type) {
        case "ADD_POINT":
            return {...state, points: [...state.points, action.payload]}
        default:
            return state;
    }
}