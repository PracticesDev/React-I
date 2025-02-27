import { useQuery } from "@tanstack/react-query";
import { githubApi } from "../../api/githubApi";
import { Issue } from "../interfaces/issue";


const getIssues = async (): Promise<Issue[]> => {

    const { data } = await githubApi.get<Issue[]>('/issues');
    console.log(data)
    return data;

}

export const useIssues = () => {

    const issuesQuery = useQuery({

        queryKey: ['issues'],
        queryFn: getIssues,

    })

    return {
        issuesQuery
    }
}
