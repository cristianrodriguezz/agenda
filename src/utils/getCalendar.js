import { useState } from "react"

const URL = import.meta.env.VITE_BACKEND_URL

const fetchData = async () => {
  const [data, setData] = useState(null)
  
  const params = {
      accountid: 77
  }

  try {
    const response = await axios.get(`${URL}/calendar/get`, {params})
    setData(response.data)
  } catch (error) {
    console.error('Error al realizar la solicitud:', error);
  }
}
useEffect(() => {
  fetchData()
  
}, [])
console.log(data?.dataCalendar[0]);