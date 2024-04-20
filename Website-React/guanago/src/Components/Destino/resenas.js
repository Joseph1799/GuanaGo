import Swal from 'sweetalert2'
// Maneja la creación de una nueva reseña
function EnviarResena(nuevaResena) {
    // URL de la API
    const url = "http://localhost:8080/guanago/destinos/crear-resena?destino_id=2";

    // Objeto con las opciones del fetch
    const options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ resena: nuevaResena }),
    };

    // Realizar el fetch
    fetch(url, options)
        .then(response => {
            if (response.ok) {
                Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Reseña enviada con éxito",
                    showConfirmButton: false,
                    timer: 1500
                });


            } else {
                console.error('Error al enviar la reseña');
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: "Error al enviar la reseña",
                    showConfirmButton: false,
                    timer: 1500
                });
            }
        })
        .catch(error => {
            console.error('Error en la solicitud:', error);
        });
}
export { EnviarResena };

// Obtiene las reseñas de un destino
const obtenerResenasDestino = async (destinoId) => {
    try {
        const response = await fetch(`http://localhost:8080/guanago/destinos/resenas-destino?destinoId=${destinoId}`);
        if (!response.ok) {
            throw new Error('Error al obtener las reseñas del destino');
        }
        const data = await response.json();
        const resenas = data.map(item => item.resena);
        return resenas;
    } catch (error) {
        console.error('Error al obtener las reseñas del destino:', error);
        return []; // En caso de error, retornar un array vacío
    }
};

export { obtenerResenasDestino };

