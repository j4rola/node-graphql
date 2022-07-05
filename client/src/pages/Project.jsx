import { FaTrash } from 'react-icons/fa'; 
import { useNavigate } from 'react-router-dom'
import { DELETE_PROJECT } from '../mutations/projectMutations'
import { Link, useParams } from 'react-router-dom' 
import { useQuery, useMutation } from '@apollo/client' 
import { GET_PROJECT } from '../queries/projectQueries' 
import ClientInfo from '../components/ClientInfo'
import EditProjectForm from '../components/EditProjectForm'


function Project() { 

    const navigate = useNavigate()

    const { id } = useParams()   

    const { loading, error, data } = useQuery(GET_PROJECT, {
        variables: { id }
    }) 

    const [deleteProject] = useMutation(DELETE_PROJECT, {
      variables: {id: id},
      navigate
  })

  const onDelete = () => 
  {
    deleteProject(id) 
    navigate('/')
  }

    if (error) return <p>Something went wrong</p> 

    
  return (
    <>{ !loading && !error && (
        <div className="mx-auto w-75 card p-5">
            <Link to="/" className="btn btn-light btn-sm w-25 d-inline ms-auto">Back</Link>
            <h1>{data.project.name}</h1> 
            <p>{data.project.description}</p>
            <h5 className="mt-3">Project Status</h5>
            <p className="lead">{data.project.status}</p>
            <ClientInfo client={data.project.client} />
            <EditProjectForm project={data.project} />
            <div className="d-flex mt-5 ms-auto">
              <button onClick={onDelete} className="btn btn-danger btn-sm">
                Delete <FaTrash /> 
              </button>
            </div>
        </div>
    )}</>
  )
}

export default Project