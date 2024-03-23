import { CardInfo } from '../dataTypes/interfaces'

function formDataMap(data: CardInfo) {
  const formData = new FormData()
  formData.append('name', data.name)
  data.description && formData.append('description', data.description)
  data.location && formData.append('location', data.location)
  data.price && formData.append('price', data.price.toString())
  data.offer && formData.append('offer', data.offer.toString())
  data.capacity && formData.append('capacity', data.capacity.toString())
  if (data.image instanceof File) {
    formData.append('image', data.image)
  }
  return formData
}

export const add = async (value: CardInfo) => {
  const response = await fetch('http://localhost:8000/api/v1/destinations/', {
    method: 'POST',
    body: formDataMap(value)
  }).catch((error: Error) => {
    console.error('Error:', error.message)
  })

  if (response?.ok) {
    if (response.status !== 204) {
      window.location.reload()
    }
  }
}

export const update = async (value: CardInfo) => {
  const param = encodeURIComponent(value.name)
  const response = await fetch(`http://localhost:8000/api/v1/destinations/${param}/`, {
    method: 'PUT',
    body: formDataMap(value)
  }).catch((error) => {
    console.error('Error:', error)
  })

  if (response?.ok) {
    if (response.status !== 204) {
      window.location.reload()
    }
  }
}

export const remove = async (value: CardInfo) => {
  const param = encodeURIComponent(value.name)
  await fetch(`http://localhost:8000/api/v1/destinations/${param}/`, {
    method: 'DELETE'
  }).catch((error) => {
    console.error('Error:', error)
  })
  window.location.reload()
}
