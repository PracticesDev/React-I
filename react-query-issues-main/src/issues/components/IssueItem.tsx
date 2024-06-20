import { FC } from 'react';
import { FiInfo, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';
import { Issue } from '../interfaces/issue';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from '@tanstack/react-query';
import { getIssueComments, getIssueInfo } from '../hook/useIssue';

interface Props {
    issueitem: Issue;
}



export const IssueItem: FC<Props> = ({ issueitem }) => {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const onMouseEnter = () => {

        queryClient.prefetchQuery({

            queryKey: ['issue', issueitem.number],
            queryFn: () => getIssueInfo(issueitem.number),
        })
        queryClient.prefetchQuery({

            queryKey: ['issue', issueitem.number,'comments'],
            queryFn: () => getIssueComments(issueitem.number),
        })

        

    }
    const preSetDate = () => {

        queryClient.setQueryData(

             ['issue', issueitem.number],
             issueitem,
             {
                updatedAt: new Date().getTime() + 10000
             }
        )       

    }


    return (
        <div
            className="card mb-2 issue"
            onClick={() => navigate(`/issues/issue/${issueitem.number}`)}
            //onMouseEnter={onMouseEnter} => esta funcion permite generar la peticion y traer informacion antes de dar click al Issue
            onMouseEnter={preSetDate} 

        >
            <div className="card-body d-flex align-items-center">



                <FiInfo size={30} color="red" />
                {/* <FiCheckCircle size={30} color="green" /> */}

                <div className="d-flex flex-column flex-fill px-2">
                    <span>{issueitem.title}</span>
                    <span className="issue-subinfo">{issueitem.number} opened 2 days ago by <span className='fw-bold'>{issueitem.user.login}</span></span>
                </div>

                <div className='d-flex align-items-center'>
                    <img src={issueitem.user.avatar_url} alt="User Avatar" className="avatar" />
                    <span className='px-2'>{issueitem.comments}</span>
                    <FiMessageSquare />
                </div>

            </div>
        </div>
    )
}
