// hooks/useUserData.js

import { useState, useEffect } from 'react';
import { UserData } from '@/lib/type';

function useUserData() {
    const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await fetch(`/api/getUserData`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erreur ${response.status}: ${response.statusText}`);
        }

        const userData = await response.json();
        setData(userData);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError('An error occurred.');
        }
      } finally {
        setLoading(false);
      }
    }

    fetchUserData();
  }, []);

  return { data, loading, error };
}

export default useUserData;
