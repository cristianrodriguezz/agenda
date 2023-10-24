import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { createDateTime, getMaxTime, getMinTime, handleColorTimeUnvailable, timeIntervalsConvert } from "../utils/time";
import { hour } from "../hooks/useHour";
import {  useFetchDataCalendar } from "../utils/fetchCalendar"
import useFetchTurn from "../utils/fetchTurns";


registerLocale('es', es)
setDefaultLocale('es')

// eslint-disable-next-line react/prop-types
const Agenda = ({ accountid, accountownerid}) => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const data = useFetchDataCalendar(accountid);
  const reservedTurns = useFetchTurn(accountownerid)
  const [excludeTimes, setExcludeTimes] = useState(null)
  const [timeInterval, setTimeInterval] = useState(60)
  const [maxTime, setMaxTime] = useState(null)
  const [minTime, setMinTime] = useState(null)
  const today = new Date();

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  useEffect(() => {

    if (!data) return

    const { sinceHour, untilHour } = hour(data);
    setMinTime(getMaxTime(selectedDate, sinceHour))
    setMaxTime(getMinTime(selectedDate, untilHour))
    const time = data.dataCalendar[0].calendar
    setTimeInterval(timeIntervalsConvert(time, selectedDate))

    
    if(!reservedTurns) return
    
    const exclude = reservedTurns.map(turn => createDateTime(turn.dayturn, turn.sincehours))
    setExcludeTimes(exclude)
    
  }, [data, selectedDate, reservedTurns, timeInterval])



  const excludeDatesReservated = (date) => {

    console.log(reservedTurns)

    const today = new Date()

    return date > today
  }



  return (
    <div>
      <DatePicker 
        selected={selectedDate}
        showTimeSelect
        onChange={handleDateChange} 
        inline
        timeFormat="HH:mm"
        timeCaption="Hora" 
        timeZone="auto"
        timeIntervals={timeInterval} 
        minTime={minTime}
        maxTime={maxTime}
        minDate={today}
        excludeTimes={excludeTimes}
        filterDate={excludeDatesReservated}
        timeClassName={(time) => handleColorTimeUnvailable(time, reservedTurns)}
        placeholderText="Seleccioná una hora disponible"
      />
      <div>{selectedDate.toString()}</div>
    </div>
  )
}

export default Agenda
