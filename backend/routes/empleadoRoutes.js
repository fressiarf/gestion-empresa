const express = require("express");
const router = express.Router();

const empleadoController = require("../controllers/empleadoController");

router.get("/", empleadoController.obtenerEmpleados);
router.post("/", empleadoController.agregarEmpleado);
router.put("/:id", empleadoController.ActualizarEmpleado);
router.delete("/:id", empleadoController.EliminarEmpleado);

module.exports = router;