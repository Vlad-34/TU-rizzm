import DatePickerValues from '../components/DatePicker'
import Cards from '../components/Card'
import { CardInfo, Reservation, User } from '../dataTypes/interfaces'
import { useCallback, useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Admin from '../admin/Admin'
import dayjs, { Dayjs } from 'dayjs'

const Destination = ({ location }: { location: string }) => {
  const user = useContext(AuthContext)?.user as unknown as User
  const [destinations, setDestinations] = useState<CardInfo[]>([])

  const [offers, setOffers] = useState<CardInfo[]>([])

  const localStorageStartValue = localStorage.getItem('startValue')
  const localStorageEndValue = localStorage.getItem('endValue')

  const [startValue, setStartValue] = useState<Dayjs | null>(localStorageStartValue ? dayjs(localStorageStartValue) : null)
  const [endValue, setEndValue] = useState<Dayjs | null>(localStorageEndValue ? dayjs(localStorageEndValue) : null)

  localStorage.removeItem('destination')
  localStorage.removeItem('id')

  const getDestinationsAndReservations = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens') || '{}')
      const reservationsResponse = await fetch(`http://localhost:8000/api/v1/reservations/`, {
        method: 'GET',
        headers: { Authorization: `Bearer ${tokens.access}` }
      })
      const reservationsData = await reservationsResponse.json()

      const destinationsResponse = await fetch(
        location && location.length > 2
          ? `http://localhost:8000/api/v1/destinations/filter/${location}/`
          : `http://localhost:8000/api/v1/destinations/`,
        {
          method: 'GET',
          headers: { 'Content-Type': 'multipart/form-data', Authorization: `Bearer ${tokens.access}` }
        }
      )
      const destinationsData = await destinationsResponse.json()

      const unavailableDestinations = reservationsData
        .filter((reservation: Reservation) => {
          return startValue && endValue
            ? !(endValue.isBefore(dayjs(reservation.start_date)) || dayjs(reservation.end_date).isBefore(startValue))
            : null
        })
        .map((reservation: Reservation) => reservation && reservation.destination)

      const filteredDestinations = destinationsData.filter((destination: CardInfo) => {
        const available = !unavailableDestinations.includes(destination.id)
        destination.available = available
        return destination.offer === 0 || destination.offer === null || destination.offer === undefined
      })

      const filteredOffers = destinationsData.filter((destination: CardInfo) => {
        const available = !unavailableDestinations.includes(destination.id)
        destination.available = available
        return destination.offer !== 0 && destination.offer !== null && destination.offer !== undefined
      })

      setDestinations(filteredDestinations)
      setOffers(filteredOffers)
    } catch (error) {
      console.error(error)
    }
  }

  const getDestinationsAndReservationsCallback = useCallback(getDestinationsAndReservations, [location, startValue, endValue])

  useEffect(() => {
    getDestinationsAndReservationsCallback()
  }, [getDestinationsAndReservationsCallback])

  return (
    <>
      {user && (!user?.is_staff ? <DatePickerValues setStartValue={setStartValue} setEndValue={setEndValue} /> : <Admin />)}
      <Cards id='destination' values={destinations} booking={user && !user?.is_staff} />
      <Cards id='offers' values={offers} booking={user && !user?.is_staff} />
    </>
  )
}
export default Destination
