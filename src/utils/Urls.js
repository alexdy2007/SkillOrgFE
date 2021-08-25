

let development_url = "http://localhost:5000/api/"

const URLS = {
    "development":{
        "SKILLS_LEVEL_THREE": development_url + "skills" + '/' + 'levelthree',
        "SKILLS_LEVEL_TWO": development_url + "skills" + '/' + 'leveltwo',
        "SKILLS_LEVEL_ONE": development_url + "skills" + '/' + 'levelone'
    },
    "test":{

    },
    "production":{

    }
}

export default URLS