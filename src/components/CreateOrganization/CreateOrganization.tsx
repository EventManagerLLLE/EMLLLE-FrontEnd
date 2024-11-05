import React, { useState } from "react";
import axios from "axios";
const CreateOrganization = () => {
  const [org, setOrg] = useState("");
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setOrg(event.target.value);
  };
  const getToken = () => localStorage.getItem("token");
  const handleSubmit = async () => {
    const token = getToken();
    try {
      const response = await axios.post(
        `http://localhost:3000/api/organizations/`,
        {
          name: org,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log(response);
    } catch (e) {
      console.error;
    }
  };
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Skapa organisation
        </h1>
        <form>
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="title"
            ></label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              id="title"
              type="text"
              placeholder="Organisationsnamn"
              value={org}
              onChange={handleChange}
            />
          </div>
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

export default CreateOrganization;
