import axios from 'axios';
import { useState, useEffect } from 'react';
const URL = import.meta.env.VITE_BACKEND_URL;

export const useFetchDataCalendar = (accountid) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        accountid
      };
      try {
        const response = await axios.get(`${URL}/calendar/get`, { params });
        const responseData = response.data
        setData(responseData);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData();
  }, [accountid])

  return data;
};
