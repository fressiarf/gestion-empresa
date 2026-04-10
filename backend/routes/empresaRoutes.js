const express = require("express");
const router = express.Router();

const empresaController = require("../controllers/empresaController");

router.get("/", empresaController.obtenerLaEmpresa);
router.put("/", empresaController.actualizarEmpresa);   
router.delete("/", empresaController.eliminarEmpresa);
router.post("/", empresaController.agregarEmpresa);

module.exports = router;