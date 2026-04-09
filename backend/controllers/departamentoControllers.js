const { leerDatos, guardarDatos } = require("../config/db");
const Departamento = require("../models/departamento");

exports.agregarDepartamento = (req, res) => {
    try {
        const { nombre } = req.body; //esto se realizo para que el frontend pueda enviar el nombre del departamento
        const db = leerDatos();
        const nuevoDepartamento = new Departamento(nombre);
        const nuevoId = db.departamentos.length > 0 ? db.departamentos[db.departamentos.length - 1].id + 1 : 1;
        const deptoParaGuardar = {
            id: nuevoId,
            nombre: nuevoDepartamento.nombre,
            empleados: nuevoDepartamento.empleados
        };
        db.departamentos.push(deptoParaGuardar);
        guardarDatos(db);
        res.status(201).json({ message: "Departamento agregado con éxito", departamento: deptoParaGuardar });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar el departamento" });
    }
};

exports.obtenerDepartamentos = (req, res) => {
    try {
        const db = leerDatos();
        res.json(db.departamentos);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los departamentos" });
    }
};