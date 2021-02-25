import currencyUI from './currency';
import favoriteTickets from '../store/favorite';

class TicketsUI{
  constructor(currency) {
    this.container = document.querySelector('.tickets-sections .row');
    this.currencySymbol = currency.currencySymbol;
  }

  renderTickets(tickets) {
    this.clearContainer();

    if (!tickets.length) {
      this.showEmptyMsg();
      return;
    }

    let fragment = '';

    tickets.forEach(ticket => {
      const template = TicketsUI.ticketTemplate(ticket, this.currencySymbol);
      fragment += template;
    });

    this.container.insertAdjacentHTML('afterbegin', fragment);

    this.container.addEventListener("click", (e) => {

      const dataForNewElFavorite  = this.getFavoriteTicketData(e);  
      const favorites             = favoriteTickets.addNewFavorite(dataForNewElFavorite);
      this.showFavorites(favorites);
    });
  }

  initshowFavorites(){
    this.showFavorites(favoriteTickets.getCurrentFavorites());
  }

  showFavorites(favorites){
    let favotiteContainer       = document.querySelector("#dropdown1");
    favotiteContainer.innerHTML = '';
    favotiteContainer.insertAdjacentHTML("afterbegin", this.renderFavorites(favorites));      

    favotiteContainer.addEventListener("click", (e) => {
      e.preventDefault();

      if (e.target.classList.contains("delete-favorite") === true)
      {
        const ticketContainer = e.target.closest(".favorite-item");
        favoriteTickets.deleteTicketFromFavorite(ticketContainer.dataset.id);
        ticketContainer.remove();          
      }
      this.refreshFavoriteCountView();
    });

    this.refreshFavoriteCountView(); 
  }

  removeFromFavorityArray(){
    this.favoriteArray.forEach(item => {
        
      if (JSON.stringify(item) === JSON.stringify(newData))
        ;
    });
  }

  renderFavorites(favoriteObj)
  {
    let fragment = '';

    Object.entries(favoriteObj).forEach(([key, item]) => {
      fragment += TicketsUI.templateFavorite(key, item);
    });

    return fragment;
  }

  refreshFavoriteCountView()
  {
    const counterFovoriteViewContainer = document.querySelector(".count-favorite");
    counterFovoriteViewContainer.textContent = this.getFavoriteCount();
  }

  getFavoriteTicketData(e){
    const selectedTicketToFavorite = e.target.closest(".card.ticket-card");
    const airlineLogo = selectedTicketToFavorite.querySelector(".ticket-airline-img").src;
    const airlineName = selectedTicketToFavorite.querySelector(".ticket-airline-name").textContent;
    const ticketCities = Object.values(selectedTicketToFavorite.querySelectorAll(".ticket-city"));
    const timeDepart = selectedTicketToFavorite.querySelector(".ticket-time-departure").textContent;
    const ticketPrice = selectedTicketToFavorite.querySelector(".ticket-price").textContent;
    const ticketTransfers = selectedTicketToFavorite.querySelector(".ticket-transfers").textContent;
    const flightNumber = selectedTicketToFavorite.querySelector(".ticket-flight-number").textContent;

    return {
      airlineLogo,
      ticketCities : ticketCities.map(item => item.textContent),
      timeDepart,
      ticketPrice,
      ticketTransfers,
      flightNumber,
    };
  }

  getFavoriteCount()
  {
    return document.querySelector("#dropdown1").childElementCount;
  }

  static templateFavorite(id, params)
  {
    return `
      <div class="favorite-item d-flex align-items-start" data-id="${id}">
        <img src="${params.airlineLogo}" class="favorite-item-airline-img"/>
        <div class="favorite-item-info d-flex flex-column">
          <div class="favorite-item-destination d-flex align-items-center">
            <div class="d-flex align-items-center mr-auto">
              <span class="favorite-item-city">${params.ticketCities[0]}</span>
              <i class="medium material-icons">flight_takeoff</i>
            </div>
            <div class="d-flex align-items-center">
              <i class="medium material-icons">flight_land</i>
              <span class="favorite-item-city">${params.ticketCities[1]}</span>
            </div>
          </div>
          <div class="ticket-time-price d-flex align-items-center">
            <span class="ticket-time-departure">${params.timeDepart}</span>
            <span class="ticket-price ml-auto">${params.ticketPrice}</span>
          </div>
          <div class="ticket-additional-info">
            <span class="ticket-transfers">Пересадок: ${params.ticketTransfers}</span>
            <span class="ticket-flight-number">Номер рейса: ${params.flightNumber}</span>
          </div>
          <a class="waves-effect waves-light btn-small pink darken-3 delete-favorite ml-auto">Delete</a>
        </div>
      </div>    
    `
  }

  clearContainer() {
    this.container.innerHTML = '';
  }

  showEmptyMsg() {
    const template = TicketsUI.emptyMsgTemplate();
    this.container.insertAdjacentHTML('afterbegin', template);
  }

  static emptyMsgTemplate() {
    return `
      <div class="tickets-empty-res-msg">По вашему запросу билетов не найдено.</div>
    `;
  }

  static ticketTemplate(ticket, currency) {
    return `
    <div class="col s12 m6">
      <div class="card ticket-card">
        <div class="ticket-airline d-flex align-items-center">
          <img src="${ticket.airline_logo}" class="ticket-airline-img" />
          <span class="ticket-airline-name mr-auto">${ticket.airline_name}</span>
          <a href="#!" class="secondary-content"><i class="material-icons favorite">grade</i></a>             
        </div>
        <div class="ticket-destination d-flex align-items-center">
          <div class="d-flex align-items-center mr-auto">
            <span class="ticket-city">${ticket.origin_name}</span>
            <i class="medium material-icons">flight_takeoff</i>
          </div>
          <div class="d-flex align-items-center">
            <i class="medium material-icons">flight_land</i>
            <span class="ticket-city">${ticket.destination_name}</span>
          </div>
        </div>
        <div class="ticket-time-price d-flex align-items-center">
          <span class="ticket-time-departure">${ticket.departure_at}</span>
          <span class="ticket-price ml-auto">${currency}${ticket.price}</span>
        </div>
        <div class="ticket-additional-info">
          <span class="ticket-transfers">Пересадок: ${ticket.transfers}</span>
          <span class="ticket-flight-number">Номер рейса: ${ticket.flight_number}</span>
        </div>
        <div class="d-flex">
          <a class="waves-effect waves-light btn-small green darken-1 add-favorite mx-auto"
          >Add to favorites</a>
        </div>       
      </div>
    </div>
    `;
  }
}

const ticketsUI = new TicketsUI(currencyUI);

export default ticketsUI;
