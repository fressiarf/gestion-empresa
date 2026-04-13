const { leerDatos, guardarDatos } = require("../config/db");
const Departamento = require("../models/departamento");
 
exports.obtenerDepartamentos = (req, res) => {
    try {
        const db = leerDatos();
        res.json(db.departamentos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los departamentos" });
    }
};

exports.obtenerDepartamentoPorId = (req, res) => {
    try {
        const { id } = req.params;
        const db = leerDatos();
        const departamento = db.departamentos.find(d => d.id === parseInt(id));
        if (!departamento) {
            return res.status(404).json({ message: "Departamento no encontrado" });
        }
        res.json(departamento);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener el departamento" });
    }
};

exports.agregarDepartamento = (req, res) => {
    try {
        const { nombre } = req.body;
        const db = leerDatos();
        const nuevoDepartamento = new Departamento(nombre);
        const nuevoId = db.departamentos.length > 0 ? db.departamentos[db.departamentos.length - 1].id + 1 : 1;
        const deptoParaGuardar = {
            id: nuevoId,
            nombre: nuevoDepartamento.nombre,
            empleados: nuevoDepartamento.empleados
        };
        db.departamentos.push(deptoParaGuardar);
        
        if (!db.empresa.departamentos) db.empresa.departamentos = [];
        db.empresa.departamentos.push(nuevoId);

        guardarDatos(db);
        res.status(201).json({ message: "Departamento agregado con éxito", departamento: deptoParaGuardar });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar el departamento" });
    }
};

exports.ActualizarDepartamento = (req, res) => {
    try {
        const { id } = req.params;
        const { nombre } = req.body;
        const db = leerDatos();
        const index = db.departamentos.findIndex(d => d.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: "Departamento no encontrado" });
        }
        db.departamentos[index].nombre = nombre;
        guardarDatos(db);
        res.json({ message: "Departamento actualizado con éxito", departamento: db.departamentos[index] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el departamento" });
    }
};

exports.EliminarDepartamento = (req, res) => {
    try {
        const { id } = req.params;
        const db = leerDatos();
        const index = db.departamentos.findIndex(d => d.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: "Departamento no encontrado" });
        }
        db.departamentos.splice(index, 1);

        if (db.empresa && db.empresa.departamentos) {
            db.empresa.departamentos = db.empresa.departamentos.filter(dId => dId !== parseInt(id));
        }

        guardarDatos(db);
        res.json({ message: "Departamento eliminado con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar el departamento" });
    }
};
