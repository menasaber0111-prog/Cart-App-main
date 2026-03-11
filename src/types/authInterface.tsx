export interface sucssesLogin{
    message : string
    token : string
    user : UserResponse
}
export interface failedLogin{
    message : string
    statusMsg : string
}
export interface UserResponse{
    name : string
    email : string 
    role :string
}
