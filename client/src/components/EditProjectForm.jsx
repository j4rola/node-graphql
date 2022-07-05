import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { GET_PROJECT } from '../queries/projectQueries'
import { UPDATE_PROJECT } from '../mutations/projectMutations'

function EditProjectForm({project}) {

    const id = project.id

    const [name, setName] = useState(project.name)
    const [description, setDescription] = useState(project.description)
    const [status, setStatus] = useState('new')

    const [updateProject] = useMutation(UPDATE_PROJECT, {
        variables: {
            id, name, description, status
        },
        refetchQueries: [{ query: GET_PROJECT, variables: { id: project.id } }]
    })

    const onUpdate = (e) => {
        e.preventDefault()
        updateProject(id, name, description, status)
    }


  return (
    <div className='mt-5'>
        <h3>Update Project Details</h3> 
        <form onSubmit={(e) => onUpdate(e)}>
        <div className="mb-3">
                         <label className='form-label'>Name</label>
                         <input onChange={(e) => setName(e.target.value)} type='text' className='form-control' value={name} id='name'></input>
                     </div>
                     <div className="mb-3">
                         <label className='form-label'>Description</label>
                         <textarea onChange={(e) => setDescription(e.target.value)} type='text' value={description} className='form-control' id='description'></textarea>
                     </div>
                     <div className="mb-3">
                         <label className='form-label'>Status</label>
                         <select className='form-select' id='status'  onChange={ (e) => setStatus(e.target.value)}  value={status}>
                             <option value='new'>Not Started</option>
                             <option value='progress'>In Progress</option> 
                             <option value='completed'>Completed</option>  
                         </select>
                     </div>
                     <button type='submit' className='btn btn-primary' >Submit</button> 
        </form> 

    </div>
  )
}

export default EditProjectForm