import { Request, Response, NextFunction } from "express"
import { ErrorRespons } from '../types/error'
import { UserCreateRequest, UserUpdateRequest } from '../types/user'
import { RoleEnum } from '../types/role'
import { checkRolesEnumAllExist } from "../controllers/roleController"

//身分認證
export const isRoleListAllExist =async(req:Request<{id:string},{},UserCreateRequest | UserUpdateRequest>, res:Response<ErrorRespons>, next:NextFunction)=>{
    const payload = req.body
    if(!payload.rolesEnum?.length) return next()
    const alllExist = checkRolesEnumAllExist(payload.rolesEnum)
    console.log('檢查權限')
    if(! await alllExist) return res.status(400).send({message:'權限列表中，出現了不存在的權限'})
    next()
}
export const isAdmin =async (req:Request, res:Response<ErrorRespons>, next:NextFunction)=>{
    const role = req.user?.roles.find(role => role.name === RoleEnum.ADMIN)
    if(!role) return res.status(403).send({message:`No ${RoleEnum.ADMIN}  Authentication`})
    next()
}
export const isSuperAdmin =async (req:Request, res:Response<ErrorRespons>, next:NextFunction)=>{
    const role = req.user?.roles.find(role => role.name === RoleEnum.SUPERADMIN)
    if(!role) return res.status(403).send({message:`No ${RoleEnum.SUPERADMIN} Authentication`})
    next()
}