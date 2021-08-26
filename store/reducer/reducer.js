import ActionTypes from '../constant/constant';

const INITIAL_STATE = {
    mainUrl: "https://safe-bayou-42516.herokuapp.com/",
    // mainUrl: `http://192.168.100.146:3002/`,
    user: "",
    themeColor: "#003366",
    darkmode: false,
    themeColors: {
        backGroundColor: "#ffffff",
        forGroundColor: "#000000",
        externalShade: "#ffffff",
    },
    userAddress: [],
    waightUnit: {
        Metric: true, Imperial: false,
    },
    userLocation: {}
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case ActionTypes.LOGIN:
            return ({
                ...state,
                user: action.payload
            })
        case ActionTypes.CHANGETHEME:
            return ({
                ...state,
                themeColors: action.payload
            })
        case ActionTypes.DRAWEROPENANDCLOSE:
            return ({
                ...state,
                darkmode: action.payload
            })
        case ActionTypes.ADDRESSSAVE:
            return ({
                ...state,
                userAddress: action.payload
            })
        case ActionTypes.WAIGHTUNITSET:
            return ({
                ...state,
                waightUnit: action.payload
            })
        case ActionTypes.SETUSERLOCATION:
            return ({
                ...state,
                userLocation: action.payload
            })

        default:
            return state;
    }

}