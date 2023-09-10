const { handle_date } = require("./handle_date.js");
const { handle_finish_auction } = require("./handle_finish_auction.js");

const handle_status = async (auction_id, status, type, close_date) => {

    
    switch (status) {
        case "Activa":
            //Una vez se crea la invert auction o se aprueba una actuion, se actualiza el status a activa 
            //y se llama a la función para que maneje el timer.
            const handleDate = await handle_date(close_date);

            return handleDate;

        case "Terminada":
            //una vez terminada, llamar al manejo de finalización de auctions y relacionar a los users ganadores
            handle_finish_auction(auction_id, type);
            break;

        case "Pendiente":
            return "Esta subasta está pendiente para que el administrador la revise."; 

        case "Eliminada":
            return "Esta subasta ha sido cancelada.";
        default:
        //devolver algún error
            throw new Error("Error en el estado de la subasta")
    }

};

// handle_status("Activa", "2023-09-01T23:53:00.000Z", "AU", null, false);

module.exports = {
    handle_status
};
