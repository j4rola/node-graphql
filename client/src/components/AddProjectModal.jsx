import { useState } from 'react'
import { FaList } from 'react-icons/fa'
import { useMutation, useQuery } from '@apollo/client'
import { ADD_PROJECT } from '../mutations/projectMutations'
import { GET_PROJECTS } from '../queries/projectQueries'
import { GET_CLIENTS } from '../queries/clientQuery'


function AddClientModal() {  

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [clientId, setClientId] = useState('')
    const [status, setStatus] = useState('new')

    const [addProject] = useMutation(ADD_PROJECT, {
        variables: { name, description, status, clientId },
        update(cache, { data: { addProject }}) {
            const { projects } = cache.readQuery({ query:    
            GET_PROJECTS }); 

            cache.writeQuery({
                query: GET_PROJECTS,
                data: {
                    projects: [...projects, addProject]
                }
            })
        }
    })

    const { loading, error, data } = useQuery(GET_CLIENTS)  

    

    const onSubmit = (e) => {
        
        e.preventDefault()
        if (name === '' || description === '' || status === '' || clientId === '')
        return alert('Please fill out all fields')

        addProject(name, description, clientId, status)

        setName('')
        setDescription('')
        setStatus('new')
        setClientId('')
    }

    if(loading) {
        return null
    }
    if(error) {
        return "Something went wrong"
    }

  return (
    <>
    { !loading && !error && (<>
        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addProjectModal">
       
       <div className="d-flex align-items-center">
           <FaList className='icon' /> New Project
       </div>
     </button>
     
     
     <div className="modal fade" id="addProjectModal" aria-labelledby="addProjectModalLabel" aria-hidden="true">
       <div className="modal-dialog">
         <div className="modal-content"> 
           <div className="modal-header">
             <h5 className="modal-title" id="exampleModalLabel">Add Client</h5>
             <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
           </div>
             <div className="modal-body">
                 <form onSubmit={onSubmit}>
                     <div className="mb-3">
                         <label className='form-label'>Name</label>
                         <input onChange={(e) => setName(e.target.value)} type='text' className='form-control' id='name'></input>
                     </div>
                     <div className="mb-3">
                         <label className='form-label'>Description</label>
                         <textarea onChange={(e) => setDescription(e.target.value)} type='text' className='form-control' id='description'></textarea>
                     </div>
                     <div className="mb-3">
                         <label className='form-label'>Status</label>
                         <select className='form-select' id='status'  onChange={ (e) => setStatus(e.target.value)}>
                             <option value='new'>Not Started</option>
                             <option value='progress'>In Progress</option> 
                             <option value='completed'>Completed</option>  
                         </select>
                     </div>

                     <div className="mb-3">
                        <label className='form-label'></label>
                        <select className='form-select' id={clientId} onChange={(e) => setClientId(e.target.value)}>
                            <option value=''>
                            Select Client
                            </option> 
                            { data.clients.map((client) => (
                                <option key={client.id} value={client.id}> {client.name} </option>
                            )
                            )}
                        </select> 
                     </div>

                     <button type='submit' data-bs-dismiss='modal' className='btn btn-primary'>New Project</button> 
                 </form>
             </div>
           
         </div>
       </div>
     </div>
    
    </>)}
   </>
  )
}

export default AddClientModal