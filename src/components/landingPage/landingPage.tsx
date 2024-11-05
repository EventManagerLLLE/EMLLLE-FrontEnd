import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode'; 
const LandingPage: React.FC = () => {
  const getToken = () => localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState<{ id: string; username: string; firstName: string; lastName: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUserInfo = async () => {
      const token = getToken();
      if (token) {
        // Decode the JWT to get the user ID
        const decodedToken: { id: string } = jwtDecode(token);
        const userId = decodedToken.id;

        try {
          const response = await fetch(`http://localhost:3000/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!response.ok) {
            const errorText = await response.text();
            console.error("Failed to fetch user info:", response.status, errorText);
            setError("Failed to load user information.");
            setLoading(false);
            return;
          }

          const data = await response.json();
          setUserInfo(data); 
        } catch (error) {
          console.error("Error fetching user information:", error);
          setError("An error occurred while fetching user information.");
        }
      } else {
        setError("Not logged in.");
      }
      setLoading(false);
    };

    fetchUserInfo();
  }, []);

  if (loading) {
    return <h1>Laddar...</h1>;
  }

  if (error) {
    return <h1>{error}</h1>;
  }

  return (
    <>
      <h1>Välkommen, {userInfo?.firstName} {userInfo?.lastName}!</h1>
      <p>Username: {userInfo?.username}</p>
      <p>User ID: {userInfo?.id}</p>
      <p>Organisation: {organizations?.name}</p>
    </>
  );
}

export default LandingPage;
