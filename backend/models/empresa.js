class Empresa {
    constructor(nombre, direccion, telefono) {
        this.nombre = nombre;
        this.direccion = direccion;
        this.telefono = telefono;
        this.departamentos = [];
        this.empleados = [];
    }
}

module.exports = Empresa;