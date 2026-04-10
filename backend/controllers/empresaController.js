const { leerDatos, guardarDatos } = require("../config/db");

exports.obtenerLaEmpresa = (req, res) => {
    try {
        const db = leerDatos();
        res.json(db.empresa);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al obtener la empresa" });
    }
};

exports.agregarEmpresa = (req, res) => {
    try {
        const { nombre, direccion, telefono } = req.body;
        const db = leerDatos();
        db.empresa.nombre = nombre;
        db.empresa.direccion = direccion;
        db.empresa.telefono = telefono;
        guardarDatos(db);
        res.status(201).json({ message: "Empresa agregada con éxito", empresa: db.empresa });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al agregar la empresa" });
    }
};

exports.actualizarEmpresa = (req, res) => {
    try {
        const { nombre, direccion, telefono } = req.body;
        const db = leerDatos();
        db.empresa.nombre = nombre;
        db.empresa.direccion = direccion;
        db.empresa.telefono = telefono;
        guardarDatos(db);
        res.json({ message: "Empresa actualizada con éxito" });
    } catch (err) {
        console.log("ERROR DETALLADO:", err.message, err.stack);
        res.status(500).json({ message: "Error al actualizar la empresa", detalle: err.message });
    }
};

exports.eliminarEmpresa = (req, res) => {
    try {
        const { id } = req.params;
        const db = leerDatos();
        const index = db.empresa.findIndex(e => e.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }
        db.empresa.splice(index, 1);
        guardarDatos(db);
        res.json({ message: "Empresa eliminada con éxito" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al eliminar la empresa" });
    }
};
