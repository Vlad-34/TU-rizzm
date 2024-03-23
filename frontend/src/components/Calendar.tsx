import { useEffect, useState } from 'react'
import { DateRange, Range } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { Reservation } from '../dataTypes/interfaces'
import { Dayjs } from 'dayjs'

const Calendar = ({ values }: { values: Reservation[] }) => {
  const [state, setState] = useState<Range[]>([
    {
      startDate: new Date('2024-03-01'),
      endDate: new Date('2024-03-02'),
      key: 'selection'
    },
    {
      startDate: new Date('2024-03-03'),
      endDate: new Date('2024-03-04'),
      key: 'selection'
    },
    {
      startDate: new Date('2024-03-05'),
      endDate: new Date('2024-03-06'),
      key: 'selection'
    },
    {
      startDate: new Date('2024-03-07'),
      endDate: new Date('2024-03-08'),
      key: 'selection'
    }
  ])

  useEffect(() => {
    setState(
      values.map((item: { start_date: Dayjs; end_date: Dayjs }) => {
        return {
          startDate: item?.start_date as unknown as Date,
          endDate: item?.end_date as unknown as Date,
          key: 'selection'
        }
      })
    )
  }, [values])

  return (
    <>
      <DateRange showDateDisplay={false} moveRangeOnFirstSelection={false} ranges={state} />
    </>
  )
}

export default Calendar
