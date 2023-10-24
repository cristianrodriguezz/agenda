export const hour = (data) => {
  const sinceHour = data?.dataCalendar[0].calendar.map( hour => (
    {
      dayId: hour.dayId,
      hour: hour.sinceHour
    }
  ))
  const untilHour = data?.dataCalendar[0].calendar.map( hour => (
    {
      dayId: hour.dayId,
      hour: hour.untilHour
    }
  ))
  return { sinceHour, untilHour }
}
