import { Router} from "express";
import { actualizarProducto, crearProducto, eliminarProducto, getProductoPorId, getProductos } from "../controllers/products_controllers";

const route = Router();

route.get('/productos', getProductos);
route.get('/productos/:id', getProductoPorId);

// Rutas privadas (EXIGEN que el usuario tenga la cookie JWT válida)
route.post('/productos', verificarToken, crearProducto);
route.put('/productos/:id', verificarToken, actualizarProducto);
route.delete('/productos/:id', verificarToken, eliminarProducto);

export {route as productsRoute}