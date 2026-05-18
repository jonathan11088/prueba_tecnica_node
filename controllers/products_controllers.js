import { getConnection, sql } from '../database/connection.js'; // Ajusta la ruta a tu conexión
import { queryProducts } from '../database/queryProducts.js';

// 1. OBTENER TODOS LOS PRODUCTOS
export const getProductos = async (req, res) => {
    try {
        const pool = await getConnection();
        const result = await pool.request().query(queryProducts.getAll);
        return res.status(200).json(result.recordset);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener los productos' });
    }
};

// 2. OBTENER UN PRODUCTO POR ID
export const getProductoPorId = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(queryProducts.getOne);

        if (result.recordset.length === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json(result.recordset[0]);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al obtener el producto' });
    }
};

// 3. CREAR UN NUEVO PRODUCTO
export const crearProducto = async (req, res) => {
    try {
        const { nombre_producto, descripcion_producto } = req.body;

        // Validación simple
        if (!nombre_producto || !descripcion_producto) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const pool = await getConnection();
        await pool.request()
            .input('nombre', sql.VarChar(100), nombre_producto)
            .input('descripcion', sql.VarChar(150), descripcion_producto)
            .query(queryProducts.insert);

        return res.status(201).json({ message: 'Producto creado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al crear el producto' });
    }
};

// 4. ACTUALIZAR UN PRODUCTO
export const actualizarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre_producto, descripcion_producto } = req.body;

        if (!nombre_producto || !descripcion_producto) {
            return res.status(400).json({ message: 'Todos los campos son obligatorios' });
        }

        const pool = await getConnection();
        
        // Ejecutamos el UPDATE
        const result = await pool.request()
            .input('id', sql.Int, id)
            .input('nombre', sql.VarChar(100), nombre_producto)
            .input('descripcion', sql.VarChar(150), descripcion_producto)
            .query(queryProducts.update);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Producto no encontrado para actualizar' });
        }

        return res.status(200).json({ message: 'Producto actualizado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al actualizar el producto' });
    }
};

// 5. ELIMINAR UN PRODUCTO
export const eliminarProducto = async (req, res) => {
    try {
        const { id } = req.params;
        const pool = await getConnection();
        const result = await pool.request()
            .input('id', sql.Int, id)
            .query(queryProducts.delete);

        if (result.rowsAffected[0] === 0) {
            return res.status(404).json({ message: 'Producto no encontrado' });
        }

        return res.status(200).json({ message: 'Producto eliminado exitosamente' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Error al eliminar el producto' });
    }
};