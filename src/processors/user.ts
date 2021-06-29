/**
 * @description User Processor to handle all DB calls
 */

const { Users, Op, sequelize } = require('../database/models')

const createUser = (user : any) => {
    const query = {
      where : { email : user.email }
    }
    return Users.findOne(query).then((existingUser: any) => {
       if(existingUser) throw new Error('User account already exists')
       return Users.create(user) 
    }).then((newUser: any) => {
       if(!newUser) throw new Error('Could not create user account')
       return newUser.dataValues
    })
}

const getUser = (param : any) => {
   const query = {
     where : { email : param.email },
     raw : true
   }
   return Users.findOne(query).then((user : any) => {
     if(!user) throw new Error('User not found')
     return user;
   })
}

export {
  createUser,
  getUser

}