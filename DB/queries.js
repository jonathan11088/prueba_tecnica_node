export const queryRegister = {
    veriCorreo: 'SELECT * FROM log_usuario WHERE correo = @correo',
    insertUser: 'INSERT INTO log_usuario (correo, password) VALUES (@correo, @password)'
}


export const queryProducts = {
    getAll: 'SELECT id_producto, nombre_producto, descripcion_producto FROM productos',
    getOne: 'SELECT id_producto, nombre_producto, descripcion_producto FROM productos WHERE id_producto = @id',
    insert: 'INSERT INTO productos (nombre_producto, descripcion_producto) VALUES (@nombre, @descripcion)',
    update: 'UPDATE productos SET nombre_producto = @nombre, descripcion_producto = @descripcion WHERE id_producto = @id',
    delete: 'DELETE FROM productos WHERE id_producto = @id'
};