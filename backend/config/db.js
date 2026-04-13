const fs = require('fs');
const path = require('path');

const dbPath = path.join(__dirname, '../db.json');

function leerDatos() {
    try {
        const data = fs.readFileSync(dbPath, 'utf-8');
        return JSON.parse(data);
    } catch (error) {
        console.log("Error leyendo la base de datos:", error);
        return { empresa: {}, departamentos: [], empleados: [] };
    }
}

function guardarDatos(data) {
    try {
        fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf-8');
    } catch (error) {
        console.log("Error guardando en la base de datos:", error);
    }
}

module.exports = { leerDatos, guardarDatos };