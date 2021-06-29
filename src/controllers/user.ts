/**
 * Module Dependencies
 */
import { transformResponse as response, validateRequest} from '../utils/transform-response'
import { Request, Response, NextFunction } from 'express'
import { v4 as uuidv4 } from 'uuid'
import * as bcrypt from 'bcrypt'
import { createUser, getUser } from '../processors/user'
import * as jwt from '../utils/jwt'

/**
 * @description Registers a user account
 */

 const registerUser = async (req : Request, res : Response) => {
    if(!validateRequest(req, res)){
        let user = {
          ...req.body,
          password : await bcrypt.hash(req.body.password, 10)
        }
        createUser(user).then((newUser :any ) => {
            delete newUser.password
            res.json(response(1, 'ok', newUser));
        }).catch((error : any )=>{
            res.status(400).json(response(0, error.message, error));
        });
      }    
 }

 /**
  * @function Logs In user and generates an access token
  * @param req 
  * @param res 
  */

 const loginUser = async (req : Request, res : Response) => {
    if(!validateRequest(req, res)){
        let user = {
          ...req.body
        }
        let userDetails : any = null
        getUser(user).then((userData : any) => {
            const {password : hashedPassword, ...rest } = userData
            userDetails = rest
            return bcrypt.compare(user.password, hashedPassword)
        })
        .then((validated : any) => {
            if(!validated) throw new Error("Password is incorrect");

            const token = jwt.sign(userDetails, 144000)
            userDetails.access_token = token
            req.session.is_auth = true
            return res.json(response(1, 'ok', userDetails));
        })
        .catch((error : any )=>{
            res.status(400).json(response(0, error.message, {}));
        });
    }    
 }

 /**
  * @function Just a simple function to invalidate user session token
  * @param req 
  * @param res 
  */

 const logoutUser = async (req : Request, res : Response) => {
    
    req.session.is_auth = false
    req.session.user = null
    return res.json(response(1, 'ok', {message : 'Logged out successfully'}));
 }

 export {
   registerUser,
   loginUser,
   logoutUser
 }

 