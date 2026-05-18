export const queryRegister = {
    veriCorreo: 'SELECT * FROM log_usuario WHERE correo = @correo',
    insertUser: 'INSERT INTO log_usuario (correo, password) VALUES (@correo, @password)'
}