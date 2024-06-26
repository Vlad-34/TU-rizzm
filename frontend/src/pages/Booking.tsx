import styled from 'styled-components'
import { jwtDecode } from 'jwt-decode'
import dayjs from 'dayjs'
import { User } from '../dataTypes/interfaces'

const ContentCard = styled.div`
  width: 40vw;
  height: 55vh;
  background: #50c878;
  padding: 20px;
  padding-left: 40px;
  position: absolute;
  top: 100px;
  left: 30vw;
  font-size: 20px;
  margin-right: 20px;
  border-radius: 15px;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  p {
    display: flex;
    align-items: center;
  }
`

const InfoButton = styled.div`
  width: 20vw;
  height: 50px;
  background-color: #50c878;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 9vw;
  margin-top: 45px;
  text-shadow: none;
  box-shadow:
    0 4px 8px 0 rgba(0, 0, 0, 0.2),
    0 6px 20px 0 rgba(0, 0, 0, 0.19);
  &:hover {
    background: #98ff98;
    opacity: 0.8;
    cursor: pointer;
  }
`

async function makeReservation(reservation: {
  destination: number
  start_date: string | undefined
  end_date: string | undefined
  price: number
}) {
  await fetch('http://localhost:8000/api/v1/reservations/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${JSON.parse(localStorage.getItem('tokens')!).access}`
    },
    body: JSON.stringify(reservation)
  }).catch((error) => console.error(error))
}

const Booking = () => {
  const tokens = JSON.parse(localStorage.getItem('tokens')!)
  const destination = JSON.parse(localStorage.getItem('destination')!)
  const decodedTokens = jwtDecode(tokens.access) as User
  const startValue = localStorage.getItem('startValue') ? dayjs(localStorage.getItem('startValue')) : null
  const endValue = localStorage.getItem('endValue') ? dayjs(localStorage.getItem('endValue')) : null

  const daysDiff = startValue && endValue && startValue.isValid() && endValue.isValid() ? endValue.diff(startValue, 'day') : 0

  const price = destination?.price ?? 0
  const capacity = destination?.capacity ?? 0
  const offerPercentage = destination?.offer ?? 0
  const discountFactor = 1 - offerPercentage / 100

  const totalPrice = price * capacity * discountFactor * Math.max(daysDiff, 0)

  const reservation = {
    destination: destination?.id ?? null,
    start_date: startValue?.format('YYYY-MM-DD'),
    end_date: endValue?.format('YYYY-MM-DD'),
    price: totalPrice
  }

  return (
    <ContentCard>
      <p>user email: {decodedTokens?.email}</p>
      <p>location: {destination?.location}</p>
      <p>price: {destination?.price}</p>
      <p>capacity: {destination?.capacity}</p>
      <p>
        selected interval: {startValue?.format('dddd DD MMMM YYYY')} - {endValue?.format('dddd DD MMMM YYYY')}
      </p>
      {destination?.offer && <p>offer: {destination?.offer}</p>}
      <p>total price: {totalPrice}</p>
      <InfoButton
        onClick={() => {
          makeReservation(reservation)
          localStorage.removeItem('startValue')
          localStorage.removeItem('endValue')
        }}
      >
        Book
      </InfoButton>
    </ContentCard>
  )
}
export default Booking
