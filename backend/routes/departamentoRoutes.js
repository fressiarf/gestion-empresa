const express = require("express");
const router = express.Router();

const departamentoController = require("../controllers/departamentoControllers");

router.get("/", departamentoController.obtenerDepartamentos);
router.post("/", departamentoController.agregarDepartamento);
// router.put("/:id", departamentoController.ActualizarDepartamento);
// router.delete("/:id", departamentoController.EliminarDepartamento);

module.exports = router;