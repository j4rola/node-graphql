import { useState } from 'react'
import { FaUser } from 'react-icons/fa'
import { ADD_CLIENT } from '../mutations/clientMutations'
import { GET_CLIENTS } from '../queries/clientQuery'
import { useMutation } from '@apollo/client'


function AddClientModal() {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')

    const [addClient] = useMutation(ADD_CLIENT, {
        variables: {name, email, phone},
        update(cache, { data: { addClient }}) {
            const { clients } = cache.readQuery({ query: 
            GET_CLIENTS })

            cache.writeQuery({
                query: GET_CLIENTS,
                data: {
                    clients: [...clients, addClient]
                }
            })
        }
    })



    const onSubmit = (e) => {
        e.preventDefault() 
        addClient(name, email, phone)

        setName('');
        setEmail('');
        setPhone('');
    }

  return (
    <>
    <button type="button" className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#addClientModal">
       
      <div className="d-flex align-items-center">
          <FaUser className='icon' /> Add Client
      </div>
    </button>
    
    
    <div className="modal fade" id="addClientModal" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Add Client</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
            <div className="modal-body">
                <form onSubmit={onSubmit}>
                    <div className="mb-3">
                        <label className='form-label'>Name</label>
                        <input onChange={(e) => setName(e.target.value)} type='text' className='form-control' id='name'></input>
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Email</label>
                        <input onChange={(e) => setEmail(e.target.value)} type='text' className='form-control' id='email'></input>
                    </div>
                    <div className="mb-3">
                        <label className='form-label'>Phone</label>
                        <input onChange={(e) => setPhone(e.target.value)} type='text' className='form-control' id='phone'></input>
                    </div>
                    <button type='submit' data-bs-dismiss='modal' className='btn btn-primary'>Add Client</button>
                </form>
            </div>
          
        </div>
      </div>
    </div></>
  )
}

export default AddClientModal