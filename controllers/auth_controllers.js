import {sql, getConnection} from '../DB/db.js'
import { queryRegister } from '../DB/queries.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';

export const registrarUsuario = async (req, res) => {
const {correo, password} = req.body

try {
    const pool = await getConnection()
const result = await pool.request()
.input('correo', sql.VarChar(100), correo)
.query(queryRegister.veriCorreo)

if(result.recordset.length > 0){
    res.status(400).json({message: 'El usuario ya fue registrado con este correo'})
}

const Salt_round = parseInt(process.env.SALT_ROUND || 10)

const passwordHash = await bcrypt.hash(password, Salt_round)

await pool.request()
.input('correo', sql.VarChar(100), correo)
.input('password', sql.VarChar(100), passwordHash)
.query(queryRegister.insertUser)

res.status(200).json({message: 'Usuario registrado exitosamente'})
} catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Error interno del servidor' });
}
}



 export const loginUsuario = async (req, res) => {
    try {
        const { correo, password } = req.body;

        const pool = await getConnection();

       
        const result = await pool.request()
            .input('correo', sql.VarChar(100), correo)
            .query(queryRegister.veriCorreo); 

        // Si no encuentra el correo
        if (result.recordset.length === 0) {
            return res.status(400).json({ message: 'Credenciales incorrectas (Correo no encontrado)' });
        }

        // usuario encontrado
        const usuario = result.recordset[0]; 

        
        const match = await bcrypt.compare(password, usuario.password);

        if (!match) {
            return res.status(400).json({ message: 'Credenciales incorrectas (Contraseña incorrecta)' });
        }

       
        const token = jwt.sign(
            { id: usuario.id, correo: usuario.correo }, 
            process.env.JWT_SECRET, 
            { expiresIn: '1h' } 
        );

        // 4. Guardar el token en una Cookie
        res.cookie('access_token', token, {
            httpOnly: true, 
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax', 
            maxAge: 3600000 
        });

        
        return res.status(200).json({
            message: 'Login exitoso',
            usuario: {
                correo: usuario.correo
               
            }
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error interno del servidor en el login' });
    }
};

