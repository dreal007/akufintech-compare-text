/**
 * @description Module dependencies
 */

 import express, { Application, Request, Response, NextFunction } from 'express'
 import * as bodyparser from 'body-parser';
 import cors from 'cors'
 import httpLogger from 'morgan'
 import createError from 'http-errors'
 import handleErrors from './middlewares/error-handler'
 import session from 'express-session';
 import dotenv from 'dotenv';
 global.Promise = require('bluebird');
 dotenv.config();
 import indexRouter from './routes'
 
 const app : Application = express()
 const session_secret : any = process.env.SESSION_SECRET
 
 /**
  * @description Mount middlewares on app
  */
 
 app.use(httpLogger('dev'))
 app.use(bodyparser.json());
 app.use(bodyparser.urlencoded({ extended: false, limit: '10mb' }));
 app.use(cors());
 
 app.use(
  session({
    secret: session_secret,
    resave: false,
    saveUninitialized: false,
  }),
);
 
 app.use('/', indexRouter)
 app.use('/careerway', indexRouter)
 app.get('/favicon.ico', (req, res) => {
  res.sendStatus(200);
});
 
 /**
  * @description catch 404 and forward to error handler
  */
 
 app.use((req :Request, res : Response, next : NextFunction) => {
   next(createError(404));
 });
 
 /**
  * @description Error handler
  */
 
  app.use(handleErrors)
  
 export default app