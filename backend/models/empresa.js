class Empresa {
    constructor(nombre) {
        this.nombre = nombre;
        this.departamentos = JSON.parse(localStorage.getItem("departamentos")) || [];
    }

}
module.exports = Empresa;