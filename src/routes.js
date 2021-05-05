import {Router} from "express"
import AuthController from "./controllers/AuthController";
import RecoveryController from "./controllers/RecoveryController";
import UserController from "./controllers/UserController";
import checkCredentials from "./middlewares/checkCredentials";
import FileController from "./controllers/FileController"

import multer from "multer"
import multerConfig from "./config/multer"

const upload = multer(multerConfig)

const routes = new Router()

routes.post('/auth', AuthController.store)
routes.post('/users', UserController.store)

routes.post('/recovery', RecoveryController.store)
routes.put('/recovery', RecoveryController.update)

routes.post("/files",upload.single("file"),FileController.store)

// Middleware de autenticação

routes.use(checkCredentials)
routes.get('/users', UserController.show)
routes.put('/users', UserController.update)
routes.delete('/users', UserController.delete)

export default routes;
