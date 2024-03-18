import * as React from 'react'
import dayjs, { Dayjs } from 'dayjs'
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

export default function DatePickerValues() {
  const [value, setValue] = React.useState<Dayjs | null>(dayjs('2022-04-17'))

  return (
    <DatePickerContainer>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DemoContainer components={['DatePicker', 'DatePicker']}>
          <DatePicker label='Start date' defaultValue={dayjs('2022-04-17')} />
          <DatePicker label='End date' value={value} onChange={(newValue: dayjs.Dayjs | null) => setValue(newValue)} />
        </DemoContainer>
      </LocalizationProvider>
    </DatePickerContainer>
  )
}
