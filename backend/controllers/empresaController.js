const { leerDatos, guardarDatos } = require("../config/db");

exports.obtenerEmpresas = (req, res) => {
    try {
        const db = leerDatos();
        res.json(db.empresas || []);
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al obtener las empresas" });
    }
};

exports.obtenerEmpresaPorId = (req, res) => {
    try {
        const { id } = req.params;
        const db = leerDatos();
        const empresa = db.empresas.find(e => e.id === parseInt(id));
        if (!empresa) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }
        res.json(empresa);
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
        
        if (db.empresas && db.empresas.length > 0) {
            Empresa.setSiguienteId(Math.max(...db.empresas.map(e => e.id)) + 1);
        }
        
        const nuevaEmpresa = new Empresa(nombre, direccion, telefono);
        
        if (!db.empresas) {
            db.empresas = [];
        }
        db.empresas.push(nuevaEmpresa);
        guardarDatos(db);
        res.status(201).json({ message: "Empresa agregada con éxito", empresa: nuevaEmpresa });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al agregar la empresa" });
    }
};

exports.actualizarEmpresa = (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, direccion, telefono } = req.body;
        const db = leerDatos();
        const empresaIndex = db.empresas.findIndex(e => e.id === parseInt(id));
        
        if (empresaIndex === -1) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }
        
        db.empresas[empresaIndex].nombre = nombre;
        db.empresas[empresaIndex].direccion = direccion;
        db.empresas[empresaIndex].telefono = telefono;
        guardarDatos(db);
        res.json({ message: "Empresa actualizada con éxito", empresa: db.empresas[empresaIndex] });
    } catch (err) {
        console.log("ERROR DETALLADO:", err.message, err.stack);
        res.status(500).json({ message: "Error al actualizar la empresa", detalle: err.message });
    }
};

exports.eliminarEmpresa = (req, res) => {
    try {
        const { id } = req.params;
        const db = leerDatos();
        const empresaIndex = db.empresas.findIndex(e => e.id === parseInt(id));
        
        if (empresaIndex === -1) {
            return res.status(404).json({ message: "Empresa no encontrada" });
        }
        
        db.empresas.splice(empresaIndex, 1);
        guardarDatos(db);
        res.json({ message: "Empresa eliminada con éxito" });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Error al eliminar la empresa" });
    }
};