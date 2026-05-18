import { Router} from "express";
import { actualizarProducto, crearProducto, eliminarProducto, getProductoPorId, getProductos } from "../controllers/products_controllers.js";

const route = Router();

route.get('/productos', getProductos);
route.get('/productos/:id', getProductoPorId);

// Rutas privadas (EXIGEN que el usuario tenga la cookie JWT válida)
route.post('/productos', crearProducto);
route.put('/productos/:id',  actualizarProducto);
route.delete('/productos/:id',  eliminarProducto);

export {route as productsRoute}