const express = require("express");
const cors = require("cors");

const departamentoRoutes = require("./routes/departamentoRoutes");
const empleadoRoutes = require("./routes/empleadoRoutes");
const empresaRoutes = require("./routes/empresaRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/departamentos", departamentoRoutes);
app.use("/api/empleados", empleadoRoutes);
app.use("/api/empresa", empresaRoutes);

const PORT = 3000;
    
app.listen(PORT, () => {
    console.log("Servidor de Gestión de Empresa corriendo en puerto " + PORT);
});
