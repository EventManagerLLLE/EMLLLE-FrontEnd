import React, { useState } from "react";
import axios from "axios";
const CreateEvent = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [reqRegister, setReqRegister] = useState(false);
  const [reqConfirm, setReqConfirm] = useState(false);
  const [reqPayment, setReqPayment] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const handlePublicityChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    //https://9gag.com/gag/aBn1pA2
    if (event.target.value === "true") {
      setIsPublic(true);
    } else {
      setIsPublic(false);
    }
    console.log(isPublic);
  };
  const getToken = () => localStorage.getItem("token");
  const handleSubmit = async () => {
    const token = getToken();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/events/",
        {
          title: title,
          date: date,
          isPublic: isPublic,
          location: {
            name: location,
          },
          description: description,
          registrationOptions: {
            isRegistrationRequired: reqRegister,
            requiresApproval: reqConfirm,
            requiresPayment: reqPayment,
            allowMultipleOptions: true,
          },
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
    } catch (e) {
      console.error(e);
      setErrorMsg("Invalid input, please fill out all fields.");
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">Skapa event</h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            >
              Titel
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Titel"
              onChange={(event) => setTitle(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="description"
            >
              Beskrivning
            </label>
            <textarea
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="description"
              placeholder="Beskrivning"
              onChange={(event) => setDescription(event.target.value)}
            ></textarea>
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="date"
            >
              Datum
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="date"
              type="date"
              placeholder="Datum"
              onChange={(event) => setDate(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="location"
            >
              Plats
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="location"
              type="text"
              placeholder="Plats"
              onChange={(event) => setLocation(event.target.value)}
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="isPublic"
            >
              Publikt event
            </label>
            <select
              id="isPublic"
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              onChange={handlePublicityChange}
            >
              <option value="true">Ja</option>
              <option value="false">Nej</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Registreringsalternativ
            </label>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="isRegistrationRequired"
                checked={reqRegister}
                onChange={(event) => setReqRegister(event.target.checked)}
              />
              <label htmlFor="isRegistrationRequired" className="text-sm">
                Kräver registrering
              </label>
            </div>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="requiresApproval"
                checked={reqConfirm}
                onChange={(event) => setReqConfirm(event.target.checked)}
              />
              <label htmlFor="requiresApproval" className="text-sm">
                Kräver godkännande
              </label>
            </div>
            <div className="flex items-center">
              <input
                className="mr-2 leading-tight"
                type="checkbox"
                id="requiresPayment"
                checked={reqPayment}
                onChange={(event) => setReqPayment(event.target.checked)}
              />
              <label htmlFor="requiresPayment" className="text-sm">
                Kräver betalning
              </label>
            </div>
          </div>
          {errorMsg ? <p className="text-red-500">{errorMsg}</p> : <></>}
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="button"
              onClick={handleSubmit}
            >
              Skapa
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
