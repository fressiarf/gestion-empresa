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
        const Empresa = require("../models/empresa");
        const nuevaEmpresa = new Empresa(nombre, direccion, telefono);
        db.empresa = nuevaEmpresa;
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
        if (!db.empresa.departamentos) db.empresa.departamentos = [];
        if (!db.empresa.empleados) db.empresa.empleados = [];
        guardarDatos(db);
        res.json({ message: "Empresa actualizada con éxito" });
    } catch (err) {
        console.log("ERROR DETALLADO:", err.message, err.stack);
        res.status(500).json({ message: "Error al actualizar la empresa", detalle: err.message });
    }
};

exports.eliminarEmpresa = (req, res) => {
    try {
        const db = leerDatos();
        db.empresa = {};
        guardarDatos(db);
        res.json({ message: "Empresa eliminada con éxito" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al eliminar la empresa" });
    }
};
