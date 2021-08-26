import ActionTypes from '../constant/constant';

export function userSaveInStore(data) {
    return dispatch => {
        dispatch({ type: ActionTypes.LOGIN, payload: data })

    }
}

export function changeTheme(color, drawerBolean) {
    return dispatch => {
        dispatch({ type: ActionTypes.CHANGETHEME, payload: color })
        dispatch({ type: ActionTypes.DRAWEROPENANDCLOSE, payload: drawerBolean })

    }
}

export function addressSaveToStore(data) {
    // console.log(data, "inAction")
    return dispatch => {
        dispatch({ type: ActionTypes.ADDRESSSAVE, payload: data })

    }
}
export function waightUnitSet(data) {
    console.log(data, "inAction")
    return dispatch => {
        dispatch({ type: ActionTypes.WAIGHTUNITSET, payload: data })

    }
}

export function setUserLocation(data) {
    console.log(data, "inActionCoords")
    return dispatch => {
        dispatch({ type: ActionTypes.SETUSERLOCATION, payload: data })

    }
}