import sql from 'mssql'

const dbconfig = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options:{
    encrypt: true,
    trustServerCertificate: true
    }
}

export const getConnection = async () =>{
    try {
        const pool = sql.connect(dbconfig)
        return pool
    } catch (error) {
       console.log("Error de conexion con la DB") 
    }
}

export {sql}