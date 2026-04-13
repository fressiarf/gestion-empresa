const express = require("express");
const router = express.Router();

const empresaController = require("../controllers/empresaController");

router.get("/", empresaController.obtenerEmpresas);
router.get("/:id", empresaController.obtenerEmpresaPorId);
router.post("/", empresaController.agregarEmpresa);
router.put("/:id", empresaController.actualizarEmpresa);
router.delete("/:id", empresaController.eliminarEmpresa);

module.exports = router;