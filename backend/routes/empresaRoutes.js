const express = require("express");
const router = express.Router();

const empresaController = require("../controllers/empresaController");

router.get("/", empresaController.obtenerLaEmpresa);

module.exports = router;