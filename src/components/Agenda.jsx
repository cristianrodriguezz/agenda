import { es } from "date-fns/locale";
import { useEffect, useState } from "react";
import DatePicker, { setDefaultLocale } from "react-datepicker";
import { registerLocale } from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import axios from 'axios';
import { createDateTime, getMaxTime, getMinTime, handleColorTimeUnvailable, timeIntervalsConvert } from "../utils/time";
import { hour } from "../hooks/useHour";

const URL = import.meta.env.VITE_BACKEND_URL
registerLocale('es', es)
setDefaultLocale('es')

const Agenda = () => {
  const [selectedDate, setSelectedDate] = useState(new Date())
  const [data, setData] = useState(null)
  const [reservedTurns, setReservedTurns] = useState([])
  const [excludeTimes, setExcludeTimes] = useState(null)
  const [timeInterval, setTimeInterval] = useState(60)
  const [maxTime, setMaxTime] = useState(null)
  const [minTime, setMinTime] = useState(null)
  const today = new Date();

  const handleDateChange = (date) => {
    setSelectedDate(date)
  }

  const fetchDataTurn = async () => {
    const params = {
        accountownerid: 78
    }
    try {
      const response = await axios.get(`${URL}/turn/get-all-turns`, {params})
      const { data } = response.data
      setReservedTurns(data)

    } catch (error) {

      console.error('Error al realizar la solicitud:', error);
    }
  }
  

  const fetchDataCalendar = async () => {
    const params = {
        accountid: 78
    }
    try {
      const response = await axios.get(`${URL}/calendar/get`, {params})
      const { data } = response
      setData(data)


    } catch (error) {
      console.error('Error al realizar la solicitud:', error);
    }
  }
  
  useEffect(() => {
    fetchDataCalendar()
    fetchDataTurn()
  }, [])

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
