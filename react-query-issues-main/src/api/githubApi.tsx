import axios from "axios";

export const githubApi =  axios.create({
    baseURL:`https://api.github.com/repos/facebook/react`,
    headers:{
        Authorization: 'Bearer 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'
    },
})