import React, {createContext, useReducer, useContext} from 'react';
import SkillsReducer from './SkillsReducer';
import SkillsActions from '../apiactions/SkillActions';

import {InitialSkillState} from '../dummydata/InitialSkillState'



export const APIStoreContext = createContext();
APIStoreContext.displayName="APIStore";

function APIProvider({children}){
  
  const initialSkillState = InitialSkillState
  const [skills, skilldispatch] = React.useReducer(SkillsReducer, initialSkillState)
  const apiCalls = {
    "skills":SkillsActions(skilldispatch),
  }


  return <APIStoreContext.Provider value={{skills, apiCalls}}>{children}</APIStoreContext.Provider>;

}


export default APIProvider