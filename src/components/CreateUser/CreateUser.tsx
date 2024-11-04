import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface User {
    username: string;
    firstName: string;
    lastName: string;
    password: string;
}

const CreateUser = () => {
    const [user, setUser] = useState<User>({
        username: '',
        firstName: '',
        lastName: '',
        password: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [apiError, setApiError] = useState<string | null>(null);

    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setUser({
            ...user,
            [id]: value
        });
        setErrors({ ...errors, [id]: '' });
    };

    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};
        if (!user.username) newErrors.username = 'Användarnamn är obligatoriskt';
        if (user.username.length < 3) newErrors.username = 'Användarnamn måste vara minst 3 tecken';
        if (!user.password) newErrors.password = 'Lösenord är obligatoriskt';
        if (user.password.length < 6) newErrors.password = 'Lösenord måste vara minst 6 tecken';
        if (!user.firstName) newErrors.firstName = 'Förnamn är obligatoriskt';
        if (!user.lastName) newErrors.lastName = 'Efternamn är obligatoriskt';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setApiError(null);

        if (!validateForm()) {
            return; 
        }

        try {
            const response = await fetch('http://localhost:3000/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            });

            if (response.ok) {
                const createdUser = await response.json();
                console.log('User created:', createdUser);
                navigate('/login');
            } else {
                const errorData = await response.json();
                setApiError(errorData.message || 'Error creating user');
            }
        } catch (error) {
            console.error('Error:', error);
            setApiError('An error occurred while creating the user');
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <div className="bg-white shadow-md rounded-lg p-8 max-w-lg w-full">
                <h1 className="text-3xl font-bold mb-6 text-center">Create User</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                            Användarnamn
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            type="text"
                            value={user.username}
                            onChange={handleChange}
                            placeholder="Username"
                        />
                        {errors.username && <p className="text-red-500 text-xs italic">{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Lösenord
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="password"
                            type="password"
                            value={user.password}
                            onChange={handleChange}
                            placeholder="Password"
                        />
                        {errors.password && <p className="text-red-500 text-xs italic">{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="firstName">
                            Förnamn
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="firstName"
                            type="text"
                            value={user.firstName}
                            onChange={handleChange}
                            placeholder="First Name"
                        />
                        {errors.firstName && <p className="text-red-500 text-xs italic">{errors.firstName}</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="lastName">
                            Efternamn
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lastName"
                            type="text"
                            value={user.lastName}
                            onChange={handleChange}
                            placeholder="Last Name"
                        />
                        {errors.lastName && <p className="text-red-500 text-xs italic">{errors.lastName}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                        >
                            Skapa användare
                        </button>
                    </div>
                    {apiError && <p className="text-red-500 text-center mt-4">{apiError}</p>}
                </form>
            </div>
        </div>
    );
};

export default CreateUser;