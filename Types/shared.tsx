export type RegisterData ={
    name: string,
    email:string,
    password:string,
    rePassword:string,
    dateOfBirth:string,
    gender:string,
}
export type ChangePasswordData ={
    password:string,
    newPassword:string,
}

export type LoginData ={
    email:string,
    password:string,
}