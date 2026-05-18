import { Router} from "express";
import { actualizarProducto, crearProducto, eliminarProducto, getProductoPorId, getProductos } from "../controllers/products_controllers.js";
import { verificarToken } from "../middleware/middleware_login.js";
const route = Router();

route.get('/productos', getProductos);
route.get('/productos/:id', getProductoPorId);

// Rutas privadas 
route.post('/productos', verificarToken, crearProducto);
route.put('/productos/:id', verificarToken, actualizarProducto);
route.delete('/productos/:id', verificarToken,  eliminarProducto);

export {route as productsRoute}