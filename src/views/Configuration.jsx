import { useState } from "react";
import { useFetchActivity } from "../hooks/fetchActivities";
import { daysOfWeek, whatIsDay } from "../utils/day";


// eslint-disable-next-line react/prop-types
const Configuration = ({ accountid }) => {
  const { activities, error, loading } = useFetchActivity(accountid);
  const [selectedDays, setSelectedDays] = useState([]);
  const [data, setData] = useState([
    {
      activityid: '',
      calendar: [],
    },
  ])

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const compareHours = (hour1, hour2) => {
    const time1 = new Date(`2000-01-01T${hour1}`);
    const time2 = new Date(`2000-01-01T${hour2}`);
    return time1 - time2;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    const validationFailed = selectedDays.some((day) => {
      const sinceHour = e.target[`${day.name}Minute`].value;
      const untilHour = e.target[`${day.name}Second`].value;
  
      return compareHours(sinceHour, untilHour) >= 0;
    });
  
    if (validationFailed) {
      console.error("El sincehour debe ser anterior al untilhour en todos los días seleccionados");
      return;
    }

    const dataCalendarItem = {
      activityid: parseInt(e.target.activity.value),
      calendar: selectedDays.map((day) => ({
        dayid: parseInt(day.value, 10),
        month: 5, // Establecer el mes según tus necesidades
        year: 2023, // Establecer el año según tus necesidades
        timerangesid: 6, // Establecer el valor según tus necesidades
        appointmentsavailableforranges: 1, // Establecer el valor según tus necesidades
        untilhours: e.target[`${day.name}Second`].value,
        sincehours: e.target[`${day.name}Minute`].value,
        accountid // Establecer el valor según tus necesidades
      })),
    }

    const updatedData = [dataCalendarItem];
    setData(updatedData);

    console.log(updatedData);

  }


  const handleCheckboxChange = () => {
    const selectedCheckboxes = document.querySelectorAll(
      '.checkbox-container input[type="checkbox"]:checked'
    )
    const select = Array.from(selectedCheckboxes).map((element) => ({
      name: whatIsDay(element.value),
      value: element.value,
    }));
    setSelectedDays(select);
  }

  const handleTimeChange = () => {
    // Lógica para actualizar el estado con los valores de tiempo si es necesario
  }

  const handleChangeForm = (e) => {
    // Lógica para manejar cambios en otros campos del formulario si es necesario
  }

  console.log(data)

  return (
    <form onSubmit={handleFormSubmit} className="flex flex-col" onChange={handleChangeForm}>
      <div>
        <label htmlFor="activity">Actividad</label>
        <select name="activity" id="activity">
          {activities?.map((activity) => (
            <option key={activity.id} value={activity.id}>
              {activity.name}
            </option>
          ))}
        </select>
      </div>
      <div className="flex checkbox-container">
        {daysOfWeek.map((day) => (
          <label key={day.value}>
            <input
              type="checkbox"
              value={day.value}
              onChange={handleCheckboxChange}
            />
            {day.label}
          </label>
        ))}
      </div>
      <div className="flex flex-col">
        {
          selectedDays.map(day => (
            <div key={day.value} className="flex">
              <label >
                {day.name}
                <input type="time" className="sincehour" name={`${day.name}Minute`} id={`${day.name}Minute`} onChange={handleTimeChange}/>
              </label>
              <p>a</p>
              <label >
                <input type="time" className="untilhour" name={`${day.name}Second`} id={`${day.name}Second`} onChange={handleTimeChange}/>
              </label>
            </div>
          ))
        }
      </div>

      <button type="submit">Submit</button>
    </form>
  );
};

export default Configuration