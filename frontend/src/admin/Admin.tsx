import { TextField } from '@mui/material'
import styled from 'styled-components'
import * as request from './requests'
import { CardInfo } from '../dataTypes/interfaces'
import { useState } from 'react'

const Container = styled.div`
  padding-top: 10px;
  padding-bottom: 20px;
  width: 100vw;
  height: auto;
  position: fixed;
  z-index: 100;
  background: #f8f8ff;
  opacity: 0.9;
`

const InfoButton = styled.div`
  width: 200px;
  height: 50px;
  background-color: #50c878;
  font-size: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
  margin-left: 15px;
  margin-right: 15px;
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

const Input = styled(TextField)`
  width: 180px;
`

const Admin = () => {
  const [location, setLocation] = useState<CardInfo | null>({
    name: '',
    description: '',
    location: '',
    price: 0,
    offer: 0,
    capacity: 0,
    image: undefined
  })
  return (
    <>
      <form encType='multipart/form-data'>
        <Container>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Input placeholder='location title' name='name' onChange={(e) => setLocation({ ...location, name: e.target.value })} />
            <Input
              placeholder='location description'
              name='description'
              onChange={(e) => setLocation({ ...location, description: e.target.value, name: location?.name ?? '' })}
            />
            <Input
              placeholder='location'
              name='location'
              onChange={(e) => setLocation({ ...location, location: e.target.value, name: location?.name ?? '' })}
            />
            <Input
              placeholder='price per night'
              type='number'
              name='price'
              onChange={(e) => setLocation({ ...location, price: Number(e.target.value), name: location?.name ?? '' })}
            />
            <Input
              placeholder='offer'
              type='number'
              name='offer'
              onChange={(e) => setLocation({ ...location, offer: Number(e.target.value), name: location?.name ?? '' })}
            />
            <Input
              placeholder='capacity'
              type='number'
              name='capacity'
              onChange={(e) => setLocation({ ...location, capacity: Number(e.target.value), name: location?.name ?? '' })}
            />
            <input
              style={{ width: '180px' }}
              placeholder='image'
              type='file'
              name='image'
              onChange={(e) => {
                const file = (e.target as HTMLInputElement).files?.[0]
                if (file) {
                  setLocation({ ...location, image: file, name: location?.name ?? '' }) // Store the entire File object
                }
              }}
            />
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
            <InfoButton onClick={() => location && request.add(location)}>Add Location</InfoButton>
            <InfoButton onClick={() => location && request.update(location)}>Update Location</InfoButton>
            <InfoButton onClick={() => location && request.remove(location)}>Delete Location</InfoButton>
          </div>
        </Container>
      </form>
    </>
  )
}

export default Admin
