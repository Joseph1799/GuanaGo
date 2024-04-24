const obtenerItinerarios = async (token) => {
    try {
        const response = await fetch('http://localhost:8080/guanago/itinerarios/obtener-itinerarios', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        if (!response.ok) {
            throw new Error('Error al obtener los itinerarios');
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error:', error);
        return [];
    }
};

export default obtenerItinerarios;
