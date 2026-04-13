let siguienteId = 1;

class Empresa {
    constructor(nombre, direccion, telefono) {
        this.id = siguienteId++;
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.departamentos = [];
        this.empleados = [];
    }
}

Empresa.setSiguienteId = function(id) {
    siguienteId = id;
};

module.exports = Empresa;

module.exports = Empresa;