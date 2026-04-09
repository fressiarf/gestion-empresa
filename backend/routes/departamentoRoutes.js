const express = require("express");
const router = express.Router();

const empresaController = require("../controllers/departamentoControllers");

router.get("/", empresaController.obtenerTodoslosDepartamentos);
router.post("/", empresaController.CrearDepartamento);
router.put("/:id", empresaController.ActualizarDepartamento);
router.delete("/:id", empresaController.EliminarDepartamento);

module.exports = router;