const express = require("express");
const router = express.Router();

const empleadoController = require("../controllers/empleadoController");

router.get("/", empleadoController.obtenerTodoslosEmpleados);
router.post("/", empleadoController.CrearEmpleado);
router.put("/:id", empleadoController.ActualizarEmpleado);
router.delete("/:id", empleadoController.EliminarEmpleado);

module.exports = router;