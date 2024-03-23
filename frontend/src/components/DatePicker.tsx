import dayjs from 'dayjs'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import styled from 'styled-components'

const DatePickerContainer = styled.div`
  padding-top: 20px;
  padding-bottom: 20px;
  width: 100vw;
  height: auto;
  position: fixed;
  display: flex;
  justify-content: center;
  z-index: 100;
  background: #f8f8ff;
  opacity: 0.9;
`

export default function DatePickerValues({
  setStartValue,
  setEndValue
}: {
  setStartValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
  setEndValue: React.Dispatch<React.SetStateAction<dayjs.Dayjs | null>>
}) {
  return (
    <DatePickerContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker
            label='Start date'
            value={localStorage.getItem('startValue') ? dayjs(localStorage.getItem('startValue')) : null}
            onChange={(newValue: dayjs.Dayjs | null) => {
              newValue && (localStorage.setItem('startValue', newValue.toString()), setStartValue(newValue))
            }}
          />
          <DatePicker
            label='End date'
            value={localStorage.getItem('endValue') ? dayjs(localStorage.getItem('endValue')) : null}
            onChange={(newValue: dayjs.Dayjs | null) => {
              newValue && (localStorage.setItem('endValue', newValue.toString()), setEndValue(newValue))
            }}
          />
        </DemoContainer>
      </LocalizationProvider>
    </DatePickerContainer>
  )
}
