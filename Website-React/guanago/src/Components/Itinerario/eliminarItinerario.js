import Swal from 'sweetalert2'

const eliminarItinerario = async (itinerarioId, token) => {
    try {
        const response = await fetch(`http://localhost:8080/guanago/itinerarios/eliminar-itinerario?itin_id=${itinerarioId}`, {
            method: 'DELETE',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al eliminar el itinerario');
        }

        // Devuelve el texto de la respuesta en caso de éxito
        Swal.fire({
            position: "center",
            icon: "success",
            title: "Itinerario eliminado con éxito",
            showConfirmButton: false,
            timer: 1500
        });
        return await response.text();


    } catch (error) {
        console.error('Error al eliminar el itinerario:', error);
        throw error; // Relanza el error para que el código que llama pueda manejarlo adecuadamente
    }
};

export default eliminarItinerario;
