const { leerDatos, guardarDatos } = require("../config/db");
const Empleado = require("../models/empleado");
 
exports.obtenerEmpleados = (req, res) => {
    try {
        const db = leerDatos();
        res.json(db.empleados);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al obtener los empleados" });
    }
};

exports.agregarEmpleado = (req, res) => {
    try {
        const { nombre, puesto, departamentoId } = req.body;
        const db = leerDatos();
        const nuevoEmpleado = new Empleado(nombre, puesto);
        const nuevoId = db.empleados.length > 0 ? db.empleados[db.empleados.length - 1].id + 1 : 1;
        const empleadoParaGuardar = {
            id: nuevoId,
            nombre: nuevoEmpleado.nombre,
            puesto: nuevoEmpleado.puesto,
            departamentoId: departamentoId
        };
        db.empleados.push(empleadoParaGuardar);
        guardarDatos(db);
        res.status(201).json({ message: "Empleado agregado con éxito", empleado: empleadoParaGuardar });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al agregar el empleado" });
    }
};

exports.ActualizarEmpleado = (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, puesto } = req.body;
        const db = leerDatos();
        const index = db.empleados.findIndex(d => d.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        
        if (nombre) db.empleados[index].nombre = nombre;
        if (puesto) db.empleados[index].puesto = puesto;
        guardarDatos(db);
        res.json({ message: "Empleado actualizado con éxito", empleado: db.empleados[index] });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al actualizar el empleado" });
    }
};

exports.EliminarEmpleado = (req, res) => {
    try {
        const { id } = req.params;
        const db = leerDatos();
        const index = db.empleados.findIndex(d => d.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        db.empleados.splice(index, 1);
        guardarDatos(db);
        res.json({ message: "Empleado eliminado con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar el empleado" });
    }
};
