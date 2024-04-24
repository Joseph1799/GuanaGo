const DestinosReservados = (bearerToken) => {
    return fetch("http://localhost:8080/guanago/usuarios/destinos-reservados", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${bearerToken}`,
            "Content-Type": "application/json"
        }
    })
        .then(response => {
            if (!response.ok) {
                throw new Error("Error al obtener destinos reservados");
            }
            return response.json();
        });
};

export default DestinosReservados;
