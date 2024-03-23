import { Dayjs } from 'dayjs'

export interface CardInfo {
  id?: number
  name: string
  description?: string
  offer?: number
  location?: string
  price?: number
  capacity?: number
  image?: File
  available?: boolean
}

export interface User {
  email: string
  exp: number
  iat: number
  is_staff: boolean
  jti: string
  token_type: string
  user_id: number
  username: string
}

export interface Reservation {
  id: number
  destination: number
  start_date: Dayjs
  end_date: Dayjs
  price: number
}
