/**
 * @description Module dependencies
 */

 import express, { Request, Response, IRoute, IRouter, NextFunction } from 'express'
 import { compare, fetchComparisonsHistory, fetchComparisonDetail } from '../controllers/comparison'
 import { registerUser, loginUser, logoutUser } from '../controllers/user'
 import { createUserSchema, getUserSchema, getComparisonDetailsSchema, compareTextSchema } from '../middlewares/validators'
 const { checkSchema } = require('express-validator')
 import { authenticate } from '../utils/jwt'
 const router : IRouter = express.Router()
 
 router.get('/', (req: Request, res: Response)=>{
   res.status(200).json({ title : process.env.APP_NAME })
 })

 router.post('/auth/register', checkSchema(createUserSchema), registerUser)
 router.post('/auth/login', checkSchema(getUserSchema), loginUser)
 router.get('/auth/logout', authenticate, logoutUser)
 
 router.post('/compare',authenticate, checkSchema(compareTextSchema), compare)
 router.get('/compare/history', authenticate, fetchComparisonsHistory)
 router.get('/compare/history/:comparison_id', authenticate, checkSchema(getComparisonDetailsSchema), fetchComparisonDetail)
 
 export default router;