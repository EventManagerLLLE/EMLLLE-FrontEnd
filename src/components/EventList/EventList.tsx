import React, { useEffect, useState } from "react";

interface Event {
  id: string;
  organizationId: string;
  organizerId: string;
  title: string;
  date: string;
  isPublic: boolean;
  location: {
    name: string;
  };
  description: string;
  registrationOptions: {
    isRegistrationRequired: boolean;
    requiresApproval: boolean;
    requiresPayment: boolean;
    allowMultipleOptions: boolean;
  };
  participants: {
    id: string;
    firstName: string;
    lastName: string;
    hasPaid: boolean;
    isApproved: boolean;
    registrationDate: string;
  }[];
}

const EventList: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    fetch("http://localhost:3000/api/events", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setEvents(data));
  }, []);

  if (events.length === 0) {
    return <div>Laddar...</div>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold my-8">Eventlista</h1>
      {events.map((event) => (
        <div
          key={event.id}
          className="bg-white shadow-md rounded-lg p-8 mb-6 max-w-lg w-full"
        >
          <h2 className="text-3xl font-bold mb-4 text-center">{event.title}</h2>
          <p>
            <strong>Datum:</strong> {event.date}
          </p>
          <p>
            <strong>Publikt:</strong> {event.isPublic ? "Ja" : "Nej"}
          </p>
          <p>
            <strong>Plats:</strong> {event.location.name}
          </p>
          <p>
            <strong>Beskrivning:</strong> {event.description}
          </p>

          <div className="mt-6">
            <h3 className="text-2xl font-bold mb-4">Deltagare</h3>
            {event.participants && event.participants.length > 0 ? (
              event.participants.map((participant) => (
                <div key={participant.id} className="border p-4 mb-2 rounded">
                  <p>
                    <strong>Namn:</strong> {participant.firstName}{" "}
                    {participant.lastName}
                  </p>
                </div>
              ))
            ) : (
              <p>Inga deltagare Ã¤n.</p>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventList;
