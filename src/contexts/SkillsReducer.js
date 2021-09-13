import ApiActions from '../apiactions/ApiActions';




let environment = process.env.NODE_ENV

const addSkill = (arr, payload) => {
    return arr.map(a => {
        if(a.skillLevelTwoId==payload.skillLevelTwoId){
            a.skillsLevelThree = [...a.skillsLevelThree, payload]
        }
        return a
    })  
}

const deleteSkill = (arr, payload) => {
    return arr.map(a => {
            a.skillsLevelThree = a.skillsLevelThree.filter(x => x.skillLevelThreeId !== payload.skillLevelThreeId)
            return a
        })
}

const SkillsReducer = (skillsState, action) => {


    switch(action.type) {

        case ApiActions.ADD:
            return {...skillsState, data: addSkill(skillsState.data, action.payload)}

        case ApiActions.DELETE:
          
            return {...skillsState, data : deleteSkill(skillsState.data, action.payload)}

        case ApiActions.IS_LOADING:
            return {...skillsState, IsLoading: action.payload}

        case ApiActions.LOAD_READY:
            return {...skillsState, data: action.payload, success:true};

        case ApiActions.LOAD_FAILED:
            return {...skillsState, success: false};

        case ApiActions.EDIT:

            let c = addSkill(deleteSkill(skillsState.data, action.payload), action.payload)

            return {...skillsState, data: addSkill(deleteSkill(skillsState.data, action.payload), action.payload)};

        case ApiActions.LOAD_SUCCESS:
            return {...skillsState, success: true};

    
        default:
            return skillsState
    }

}

export default SkillsReducer