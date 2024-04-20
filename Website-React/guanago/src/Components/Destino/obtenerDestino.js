// Función para obtener los datos del destino por su ID
const obtenerDatosDestino = async (destinoId) => {
    try {
        const response = await fetch(`http://localhost:8080/guanago/destinos/destinoById?destinoId=${destinoId}`);
        if (!response.ok) {
            throw new Error("Error al obtener los datos del destino");
        }
        const data = await response.json();
        return data; // Devuelve los datos del destino obtenidos
    } catch (error) {
        console.error("Error al obtener los datos del destino:", error);
        return null; // En caso de error, devuelve null
    }
};

export { obtenerDatosDestino };
