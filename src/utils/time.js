const hourForDay = (hours, day) => {
  const timeForDay = hours?.filter(hora => (hora.dayId === day))

  if (!timeForDay || timeForDay.length === 0) {
    return { hour: '00', minutes: '00' };
  }

  const [hour, minutes] = timeForDay[0].hour.split(":")

  return { hour, minutes }
  
}

export const getMinTime = (date, hours ) => {

  if (date.getDay() === 0) {
    const { hour, minutes } = hourForDay(hours, 0)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);
  }
  else if (date.getDay() === 1) {
    const { hour, minutes }= hourForDay(hours, 1)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);
  }
  else if (date.getDay() === 2) {
    const { hour, minutes } = hourForDay(hours, 2)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);
  }

  else if (date.getDay() === 3) {
    const { hour, minutes } = hourForDay(hours, 3)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);
  }

  else if (date.getDay() === 4) {
    const { hour, minutes } = hourForDay(hours, 4)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);
  }

  else if (date.getDay() === 5) {
    const { hour, minutes } = hourForDay(hours, 5)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);
  }
  else if (date.getDay() === 6) {
    const { hour, minutes } = hourForDay(hours, 6)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);
  }

  else {
    return null;
  }
};

export const getMaxTime = (date, hours) => {

  if (date.getDay() === 0) {
    const { hour, minutes } = hourForDay(hours, 0)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);
  }
  else if (date.getDay() === 1) {
    const { hour, minutes } = hourForDay(hours, 1)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);  }
  
  else if (date.getDay() === 2) {
    const { hour, minutes } = hourForDay(hours, 2)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);  }
  
  else if (date.getDay() === 3) {
    const { hour, minutes } = hourForDay(hours, 3)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);  }

  else if (date.getDay() === 4) {
    const { hour, minutes } = hourForDay(hours, 4)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);  }

  else if (date.getDay() === 5) {
    const { hour, minutes } = hourForDay(hours, 5)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);  }
  else if (date.getDay() === 6) {
    const { hour, minutes } = hourForDay(hours, 6)
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), hour, minutes);  }

  else {
    return null;
  }

};

export function createDateTime(sinceHours) {

  const sinceHoursDate = new Date(`1970-01-01T${sinceHours}`);

  const dateTime = new Date(
    sinceHoursDate.getHours(),
    sinceHoursDate.getMinutes()
  );
  
  return dateTime;
}

export const handleColorTimeUnvailable = (time, reservedTurns) => {

  if(reservedTurns.length === 0) return null

  const reservedTurn = []

  reservedTurns.map( turn => {
    const dateTime = new Date(turn.dayturn)

    const hour = turn.sincehours.split(':')[0]
    const minutes = turn.sincehours.split(':')[1]
    const seconds = turn.sincehours.split(':')[2]

    dateTime.setHours(hour)
    dateTime.setMinutes(minutes)
    dateTime.setSeconds(seconds)
    reservedTurn.push(dateTime.toISOString())
  })

  return reservedTurn.some((horarioreservado) => (horarioreservado === time.toISOString())) ? "unavailable-time" : 'available-time';

}

export const timeIntervalsConvert = (dates, selectDate) => {

  const valores = {
    1: 5,
    2: 10,
    3: 15,
    4: 20,
    5: 25,
    6: 30,
    7: 35,
    8: 40,
    9: 45,
    10: 50,
    11: 55,
    12: 60,
    13: 75,
    14: 90,
    15: 120,
    16: 150,
    17: 180,
  }

  const selectedDayOfWeek = selectDate.getDay()

  const matchingDate = dates.find(date => date.dayId === selectedDayOfWeek )

  const intervalo = valores[matchingDate?.timeRangesId];
  
  return intervalo


}

export const filterTime = (time, reservedTurns) => {

  const reserved = reservedTurns.map( turn => new Date(`${turn.dayturn.split('T')[0]}T${turn.sincehours.split(':')[0]}:${turn.sincehours.split(':')[1]}:${turn.sincehours.split(':')[2]}`))

  const isReserved = reserved.some( turn => turn.toISOString() === time.toISOString())

  return !isReserved

}
