import URLS from '../utils/Urls';
import ApiActions from './ApiActions';

const environment = process.env.NODE_ENV;
const skill_base_url_level_three = URLS[environment].SKILLS_LEVEL_THREE;
const skill_base_url_level_two = URLS[environment].SKILLS_LEVEL_TWO;


console.log(skill_base_url_level_three)

const httpheaders = {'Content-Type': 'application/json'}
if (environment === "development"){
    httpheaders["Access-Control-Allow-Origin"] = '*';
}


const stripSkillObject = (skillObject) => {
    return {
        "skillLevelThreeId":skillObject.skillLevelThreeId,
        "skillLevelThreeName": skillObject.skillLevelThreeName,
        "skillLevelTwoId":skillObject.skillLevelTwoId,
        "description":skillObject.description,
        "imgPath":skillObject.imgPath,
    }
}

const failToLoad = (skilldispatch, msg) => {
    skilldispatch({type:ApiActions.IS_LOADING, payload:false});
    skilldispatch({type:ApiActions.LOAD_FAILED});
    console.log(msg);
}

const SuccessToLoad = (skilldispatch) => {
    skilldispatch({type:ApiActions.IS_LOADING, payload:false});
    skilldispatch({type:ApiActions.LOAD_SUCCESS});
}

const SkillsActions = (skilldispatch) => {
    return {
        "add": async (skill) => {
            skilldispatch({type:ApiActions.IS_LOADING, payload:true})

            let skillPostObj = stripSkillObject(skill);
            delete skillPostObj.skillID;

            const response = await fetch(skill_base_url_level_three, {  
                method:"POST", 
                headers:httpheaders,
                body: JSON.stringify(skillPostObj)
            })
            if (!response.ok) {
                failToLoad(skilldispatch, "SOMTHING WENT WRONG IN API SKILL ADD")
            }
            const skillResponse = await response.json() 
            SuccessToLoad(skilldispatch);
            skilldispatch({type:ApiActions.ADD, payload:skillResponse});
        },
        "delete": async skill => {
            skilldispatch({type:ApiActions.IS_LOADING, payload:true})
            let deleteUrl = skill_base_url_level_three + "/" + skill.skillLevelThreeId
            const response = await fetch(deleteUrl, {method:"DELETE", headers:httpheaders})
            if (!response.ok) {
                failToLoad(skilldispatch, "SOMTHING WENT WRONG IN API SKILL DELETE")
            }
            SuccessToLoad(skilldispatch)
            skilldispatch({type:ApiActions.DELETE, payload:skill});
        },
        "refresh": async () => {
            skilldispatch({type:ApiActions.IS_LOADING, payload:true});
            const response = await fetch(skill_base_url_level_two, {method:"GET", headers:httpheaders})
            if (!response.ok) {
                failToLoad(skilldispatch, "SOMTHING WENT WRONG IN API SKILL REFRESH")
            }
            const data = await response.json() 
            skilldispatch({type:ApiActions.LOAD_READY, payload:data});
            SuccessToLoad(skilldispatch)
        },
        "edit": async skill => {
            skilldispatch({type:ApiActions.IS_LOADING, payload:true})
            let skillPostObj = stripSkillObject(skill);
            const response = await fetch(skill_base_url_level_three, {  
                method:"PUT", 
                headers:httpheaders,
                body: JSON.stringify(skillPostObj)
            })
            if (!response.ok) {
                let msg = "SOMTHING WENT WRONG IN EDIT SKILL, Error code : " + response.status
                failToLoad(skilldispatch, msg)
            }
            SuccessToLoad(skilldispatch)
            skilldispatch({type:ApiActions.EDIT,  payload:skillPostObj});
        }
    }
}

export default SkillsActions