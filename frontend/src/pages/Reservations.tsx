import { useCallback, useEffect, useState } from 'react'
import Calendar from '../components/Calendar'
import Chart from '../components/Chart'
import { Reservation } from '../dataTypes/interfaces'

const Reservations = () => {
  const id = Number(localStorage.getItem('id'))
  localStorage.removeItem('startValue')
  localStorage.removeItem('endValue')
  const [reservations, setReservations] = useState<Reservation[]>([])
  const getReservations = async () => {
    try {
      const tokens = JSON.parse(localStorage.getItem('tokens') || '{}')
      const response = await fetch(`http://localhost:8000/api/v1/reservations/${id}/`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${tokens.access}` }
      })
      const data = await response.json()
      setReservations(data)
    } catch (error) {
      console.error(error)
    }
  }

  const getReservationsCallback = useCallback(getReservations, [id])

  useEffect(() => {
    getReservationsCallback()
  }, [getReservationsCallback])

  return (
    <div style={{ display: 'flex', width: '100vw', marginLeft: '6vw', marginTop: '14vh' }}>
      <table style={{ width: '30vw', marginRight: '3vw' }}>
        <thead>
          <tr>
            <th>Destination</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation: Reservation) => {
            return (
              <tr key={reservation.id}>
                <td>{reservation.destination}</td>
                <td>{String(reservation.start_date)}</td>
                <td>{String(reservation.end_date)}</td>
                <td>{reservation.price}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <Calendar values={reservations} />
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <Chart values={reservations as Reservation[]} />
      </div>
    </div>
  )
}

export default Reservations
