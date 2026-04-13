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
        
        const indexDepto = db.departamentos.findIndex(d => d.id === parseInt(departamentoId));
        if (indexDepto === -1) {
            return res.status(404).json({ message: "Departamento no encontrado" });
        }

        const nuevoEmpleado = new Empleado(nombre, puesto);
        const nuevoId = db.empleados.length > 0 ? db.empleados[db.empleados.length - 1].id + 1 : 1;
        const empleadoParaGuardar = {
            id: nuevoId,
            nombre: nuevoEmpleado.nombre,
            puesto: nuevoEmpleado.puesto,
            departamentoId: parseInt(departamentoId)
        };
        db.empleados.push(empleadoParaGuardar);
        
        if (!db.empresa) db.empresa = {};
        if (!db.empresa.empleados) db.empresa.empleados = [];
        db.empresa.empleados.push(nuevoId);
        
        if (!db.departamentos[indexDepto].empleados) db.departamentos[indexDepto].empleados = [];
        db.departamentos[indexDepto].empleados.push(nuevoId);

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
        const { nombre, puesto, departamentoId } = req.body;
        const db = leerDatos();
        const index = db.empleados.findIndex(d => d.id === parseInt(id));
        if (index === -1) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        
        const empleadoId = parseInt(id);
        const oldDeptoId = db.empleados[index].departamentoId;

        if (nombre) db.empleados[index].nombre = nombre;
        if (puesto) db.empleados[index].puesto = puesto;
        
        if (departamentoId && parseInt(departamentoId) !== oldDeptoId) {
            const indexNuevoDepto = db.departamentos.findIndex(d => d.id === parseInt(departamentoId));
            if (indexNuevoDepto === -1) {
                return res.status(404).json({ message: "Nuevo departamento no encontrado" });
            }
            
            const indexViejoDepto = db.departamentos.findIndex(d => d.id === oldDeptoId);
            if (indexViejoDepto !== -1 && db.departamentos[indexViejoDepto].empleados) {
                db.departamentos[indexViejoDepto].empleados = db.departamentos[indexViejoDepto].empleados.filter(eId => eId !== empleadoId);
            }
            
            if (!db.departamentos[indexNuevoDepto].empleados) db.departamentos[indexNuevoDepto].empleados = [];
            db.departamentos[indexNuevoDepto].empleados.push(empleadoId);
            
            db.empleados[index].departamentoId = parseInt(departamentoId);
        }

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
        const empleadoId = parseInt(id);
        const index = db.empleados.findIndex(d => d.id === empleadoId);
        if (index === -1) {
            return res.status(404).json({ message: "Empleado no encontrado" });
        }
        
        const deptoId = db.empleados[index].departamentoId;
        
        db.empleados.splice(index, 1);
        
        if (db.empresa && db.empresa.empleados) {
            db.empresa.empleados = db.empresa.empleados.filter(eId => eId !== empleadoId);
        }
        
        const indexDepto = db.departamentos.findIndex(d => d.id === deptoId);
        if (indexDepto !== -1 && db.departamentos[indexDepto].empleados) {
            db.departamentos[indexDepto].empleados = db.departamentos[indexDepto].empleados.filter(eId => eId !== empleadoId);
        }

        guardarDatos(db);
        res.json({ message: "Empleado eliminado con éxito" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error al eliminar el empleado" });
    }
};
