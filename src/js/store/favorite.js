
class FavoriteTickets{
    constructor(){
        this.favoriteTickets = {};

        if (!localStorage.hasOwnProperty("favorites"))
            localStorage.setItem("favorites", JSON.stringify({}));
        else
            this.favoriteTickets = {...JSON.parse(localStorage.getItem("favorites"))};
    }

    addNewFavorite(ticket){
        const newKey = `${ticket.ticketCities[0]},${ticket.ticketCities[1]},${ticket.timeDepart}`;

        if (!(newKey in this.favoriteTickets))
            this.favoriteTickets[newKey] = ticket;

        this.setFavoriteInLocalStorage(this.favoriteTickets);

        return this.favoriteTickets;
    }

    deleteTicketFromFavorite(ticketID){
        delete this.favoriteTickets[ticketID];
        this.setFavoriteInLocalStorage(this.favoriteTickets);
    }

    setFavoriteInLocalStorage(data){
        localStorage.setItem("favorites", JSON.stringify(data));
    }

    getCurrentFavorites(){
        return this.favoriteTickets;
    }
}

const favoriteTickets = new FavoriteTickets();

export default favoriteTickets;