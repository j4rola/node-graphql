import { gql } from '@apollo/client'; 

const ADD_PROJECT = gql`
    mutation addProject($name: String!, $status: ProjectStatus! $description: String!, $clientId: ID!) {
        addProject(name: $name, status: $status, description: $description, clientId: $clientId) {
            id
            name   
            description      
            status
            client {
                id 
                name 
                email
                
            }
        }
    }
`

const DELETE_PROJECT = gql`
    mutation deleteProject($id: ID!) {
        deleteProject(id: $id) {
            id
            name   
            description      
            status
            client {
                id 
                name 
                email
                
            }
        }
    }
`

const UPDATE_PROJECT = gql`
    mutation updateProject($id: ID!, $name: String!, $description: String! $status: ProjectStatusUpdate!) {
        updateProject(id: $id, name: $name, description: $description, status: $status) {
            id
            name   
            description      
            status
        }
    }
`

export { ADD_PROJECT, DELETE_PROJECT, UPDATE_PROJECT }; 