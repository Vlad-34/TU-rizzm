import DatePickerValues from '../components/DatePicker'
import Cards from '../components/Card'
import { CardInfo } from '../dataTypes/interfaces'
import { useContext, useEffect, useState } from 'react'
import AuthContext from '../context/AuthContext'
import Admin from '../admin/Admin'

const Destination = ({ location }: { location: string }) => {
  const user = useContext(AuthContext)?.user
  const [destinations, setDestinations] = useState<CardInfo[]>([])

  const [offers, setOffers] = useState<CardInfo[]>([])

  const getDestinationsByLocation = async () => {
    try {
      const response =
        location && location.length > 2
          ? await fetch(`http://localhost:8000/api/v1/destinations/filter/${location}/`, {
              method: 'GET',
              headers: { 'Content-Type': 'multipart/form-data' }
            })
          : await fetch(`http://localhost:8000/api/v1/destinations/`, {
              method: 'GET',
              headers: { 'Content-Type': 'multipart/form-data' }
            })
      const data = await response.json()
      setDestinations(
        data.filter((destination: CardInfo) => destination.offer === 0 || destination.offer === null || destination.offer === undefined)
      )
      setOffers(
        data.filter((destination: CardInfo) => destination.offer !== 0 && destination.offer !== null && destination.offer !== undefined)
      )
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getDestinationsByLocation()
  }, [location])

  return (
    <>
      {user && (!user?.is_staff ? <DatePickerValues /> : <Admin />)}
      <Cards id='destination' values={destinations} />
      <Cards id='offers' values={offers} />
    </>
  )
}
export default Destination
