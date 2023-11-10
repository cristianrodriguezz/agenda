export const isDayDisabled = (date, reservedTurns, data) => {

  if (reservedTurns.length === 0 ) return null

  const reservadosXDia = reservedTurns?.map( turn => (  
    turn.dayturn
  ))

  const filterReservedForDay = reservadosXDia.filter( reserved => date.toISOString() === reserved)

  const day = data?.dataCalendar[0]?.calendar.filter( day => day.dayId === date.getDay())
  
  return filterReservedForDay.length >= day[0]?.countTurn 

}

export const daysOfWeek = [
  { label: 'Lunes', value: 1 },
  { label: 'Martes', value: 2 },
  { label: 'Miércoles', value: 3 },
  { label: 'Jueves', value: 4 },
  { label: 'Viernes', value: 5 },
  { label: 'Sábado', value: 6 },
  { label: 'Domingo', value: 0 },
];

export const whatIsDay = (id) => {
  const days = {
    1: 'Lunes',
    2: 'Martes',
    3: 'Miércoles',
    4: 'Jueves',
    5: 'Viernes',
    6: 'Sábado',
    0: 'Domingo'
  }

  return days[id]
}
