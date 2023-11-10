
import axios from "axios";
import { useEffect, useState } from "react";
const URL = import.meta.env.VITE_BACKEND_URL;

export const useFetchActivity = (accountid) => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true); // Iniciar con "true" para indicar que se está cargando
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const params = {
        accountid
      };
      try {
        const response = await axios.get(`${URL}/activity/get-by-account`, { params });
        const { activities } = response.data;

        setActivities(activities);
      } catch (error) {
        setError(true);
        console.error('Error al realizar la solicitud:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [accountid]);

  return { activities, error, loading };
};
