import { LodingIcon } from "../../shared/components/LodingIcon";
import { Link, Navigate, useParams } from 'react-router-dom';
import { IssueComment } from '../components/IssueComment';
import { useIssue } from '../hook/useIssue';


export const IssueView = () => {

  const params = useParams();
  const { id = '0' } = params;

  const { issueQuery,commentsQuery } = useIssue(+id)

  if ( issueQuery.isLoading )
    return <LodingIcon/> 

  if( !issueQuery.data )
    return( <Navigate to="./issues/list"/>)

  return (
    <div className="row mb-5">
      <div className="col-12 mb-3">
        <Link to='./issues/list'>Go Back</Link>
      </div>

      {/* Primer comentario */}
      <IssueComment  issue ={issueQuery.data }/>

      {
        commentsQuery.data?.map(issue => (
          <IssueComment key={ issue.id } issue={issue}/>
        ))  
      }

    </div>
  )
}
