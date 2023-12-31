import { useEffect, useState } from 'react';
import axios from 'axios';
const URL = import.meta.env.VITE_BACKEND_URL

export const useFetchTurn = (accountownerid) => {
  const [reservedTurns, setReservedTurns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        accountownerid
      }

      try {
        const response = await axios.get(`${URL}/turn/get-all-turns`, { params });
        const { data } = response.data;
        setReservedTurns(data);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData();
  }, [accountownerid]);

  return reservedTurns;
};



export const useFetchTurnForDay = (accountownerid) => {
  const [reservedTurns, setReservedTurns] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        accountownerid
      }
      try {
        const response = await axios.get(`${URL}/turn/available-appointments`, { params });
        const { days }  = response.data;

        setReservedTurns(days);
      } catch (error) {
        console.error('Error al realizar la solicitud:', error);
      }
    };

    fetchData();
  }, [accountownerid]);

  return reservedTurns;
};



