import server from './server'

import dotenv from 'dotenv';
dotenv.config();

server.listen(process.env.PORT, ()=>{
  console.log(`API server listening on port: ${process.env.PORT}`)
})
