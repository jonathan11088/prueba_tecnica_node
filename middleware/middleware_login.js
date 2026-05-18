import jwt from 'jsonwebtoken'

export const verificarToken = (req, res, next) =>{

    const token = req.cookies.access_token;

    if (!token) {
        return res.status(401).json({ 
            message: 'Acceso denegado. No se encontró un token de autenticación.' 
        });
    }

    try {
        const veriJWT = jwt.verify(token, process.env.JWT_SECRET);

        req.usuario = veriJWT;

        next()
    } catch (error) {
        return res.status(403).json({ 
            message: 'Token inválido o expirado. Inicie sesión nuevamente.' 
        });
    }
}