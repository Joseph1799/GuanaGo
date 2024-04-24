// api.js

const GuardarItinerario = async (data, token) => {
    try {
        // Token de autenticación (reemplaza 'tu_token_aqui' con tu token real)

        // Realizar la solicitud POST
        const response = await fetch("http://localhost:8080/guanago/itinerarios/crear-itinerario", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        // Verificar si la solicitud fue exitosa
        if (response.ok) {
            // Lógica para manejar la respuesta exitosa
            console.log('Itinerario creado exitosamente!');
        } else {
            // Lógica para manejar errores de solicitud
            console.error('Error al crear itinerario:', response.statusText);
        }
    } catch (error) {
        // Capturar errores de ejecución
        console.error('Error al procesar la solicitud:', error);
    }
};

export default GuardarItinerario;
