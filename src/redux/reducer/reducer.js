import { GET_BLOGS } from "../type";

const initialState = {
    blogs:[],
}

const Reducer = (state=initialState, action) => {
    switch(action.type){
        case GET_BLOGS:
            return state;
        default:
            return state;
    }
}

export default Reducer;