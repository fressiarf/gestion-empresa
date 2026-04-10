const express = require("express");
const cors = require("cors");

// Importar todas tus rutas
const departamentoRoutes = require("./routes/departamentoRoutes");
// const empleadoRoutes = require("./routes/empleadoRoutes");
// const empresaRoutes = require("./routes/empresaRoutes");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Usar las rutas (así es como conectas tus carpetas a las URLs)
app.use("/api/departamentos", departamentoRoutes);
// app.use("/api/empleados", empleadoRoutes); // Comentado temporalmente: Falta el controlador
// app.use("/api/empresa", empresaRoutes); // Comentado temporalmente: Faltan funciones en el controlador

const PORT = 3000;

app.listen(PORT, () => {
    console.log("Servidor de Gestión de Empresa corriendo en puerto " + PORT);
});
