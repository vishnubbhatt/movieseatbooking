const container = document.querySelector('.container')
const seats = document.querySelectorAll('.row .seat:not(.occupied)')

const count = document.getElementById('count')
const total = document.getElementById('total')
const movieSelect = document.getElementById('movie')

populateUI()

let ticketPrice = +movieSelect.value

// Save selected movie index and price
const setMovieData = (movieIndex, moviePrice) => {
  localStorage.setItem('SelectedMovieIndex', movieIndex)
  localStorage.setItem('SelectedMoviePrice', moviePrice)
}

const updateSelectedCount = () => {
  const selectedSeats = document.querySelectorAll('.row .seat.selected')

  // copy selected seats into array
  // map through array
  // return a new array indexes
  const seatsIndex = [...selectedSeats].map((seat) => {
    return [...seats].indexOf(seat)
  })

  localStorage.setItem('SelectedSeats', JSON.stringify(seatsIndex))
  console.log(seatsIndex)
  const selectedSeatsCount = selectedSeats.length

  count.innerText = selectedSeatsCount
  total.innerText = selectedSeatsCount*ticketPrice
}

// get data from Local storage and populate UI
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('SelectedSeats'))
  console.log(selectedSeats)

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) =>{
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected')
      }
    })
  }
  // display the movie thats in local storage
  const selectedMovieIndex = localStorage.getItem('SelectedMovieIndex')
  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex
  }
}


// Movie Select event
movieSelect.addEventListener('change', (e) => {
  ticketPrice = +e.target.value
  setMovieData(e.target.selectedIndex, e.target.value)
  updateSelectedCount()
})

// Seat click event
container.addEventListener('click', (e) => {
  if (e.target.classList.contains('seat') && !e.target.classList.contains('occupied')) {
    e.target.classList.toggle('selected')
  }
  updateSelectedCount()
})

// Initial count and total set
updateSelectedCount()