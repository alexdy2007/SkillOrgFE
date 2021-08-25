import ApiActions from '../apiactions/ApiActions';


let environment = process.env.NODE_ENV
const SkillsReducer = (skillsState, action) => {

    switch(action.type) {

        case ApiActions.ADD:
            return {...skillsState, data:[...skillsState.data, action.payload]}

        case ApiActions.DELETE:
            return {...skillsState, data:skillsState.data.filter(x => x.skillID !== action.payload.skillID)}

        case ApiActions.IS_LOADING:
            return {...skillsState, IsLoading: action.payload}

        case ApiActions.LOAD_READY:
            return {...skillsState, data: action.payload, success:true};

        case ApiActions.LOAD_FAILED:
            return {...skillsState, success: false};

        case ApiActions.EDIT:
            let data = skillsState.data;
            let objIndex = data.findIndex((obj => obj.skillID == action.payload.skillID));
            data[objIndex] = action.payload
            return {...skillsState, data: data};

        case ApiActions.LOAD_SUCCESS:
            return {...skillsState, success: true};

    
        default:
            return skillsState
    }

}

export default SkillsReducer