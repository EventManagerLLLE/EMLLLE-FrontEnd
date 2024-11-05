import React, { useState, useEffect } from 'react';
import {jwtDecode} from 'jwt-decode';

const LandingPage: React.FC = () => {
  const getToken = () => localStorage.getItem("token");
  const [userInfo, setUserInfo] = useState<{ id: string; username: string; firstName: string; lastName: string } | null>(null);
  const [organizationData, setOrganizationData] = useState<any>(null); // Define the type as needed
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
          // Fetch user info
          const userResponse = await fetch(`http://localhost:3000/api/users/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          if (!userResponse.ok) {
            const errorText = await userResponse.text();
            console.error("Failed to fetch user info:", userResponse.status, errorText);
            setError("Failed to load user information.");
            setLoading(false);
            return;
          }

          const userData = await userResponse.json();
          setUserInfo(userData); // Set the user information

          try {
            // Fetch all organizations
            const organizationsResponse = await fetch(`http://localhost:3000/api/organizations`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            if (!organizationsResponse.ok) {
              const errorText = await organizationsResponse.text();
              console.error("Failed to fetch organizations data:", organizationsResponse.status, errorText);
              setLoading(false);
              return;
            }

            const organizationsData = await organizationsResponse.json();

            // Check if any organization matches the user's ID
            const matchedOrganization = organizationsData.find((org: any) => org.userId === userId);
            setOrganizationData(matchedOrganization || null); // Set the organization data if a match is found

          } catch (error) {
            console.error("Error fetching organizations data:", error);
          }

        } catch (error) {
          console.error("Error fetching user information:", error);
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

      {organizationData && (
        <div>
          <h2>Organization Data</h2>
          <p>Name: {organizationData?.name}</p>
          <p>ID: {organizationData?.id}</p>
          <p>User ID: {organizationData?.userId}</p>
        </div>
      )}
    </>
  );
}

export default LandingPage;
