const { leerDatos } = require("../config/db");

exports.obtenerLaEmpresa = (req, res) => {
    try {
        const db = leerDatos();
        res.json(db.empresa);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al obtener la empresa" });
    }
};
