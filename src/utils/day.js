export const isDayDisabled = (date, reservedTurns, data) => {

  const reservadosXDia = reservedTurns.map( turn => (  
    turn.dayturn
  ))

  const filterReservedForDay = reservadosXDia.filter( reserved => date.toISOString() === reserved)

  const day = data.dataCalendar[0].calendar.filter( day => day.dayId === date.getDay())
  
  return filterReservedForDay.length >= day[0]?.countTurn

}
