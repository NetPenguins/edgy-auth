
import React, { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContextProvider';

const HomePage: React.FC = () => {
    const authContext = useContext(AuthContext);
    console.log('👋')
    return (
        <main>
            <h1 className="text-green-800 text-4xl">👋 {authContext?.profile?.username || 'Guest'}</h1>
        </main>
    );
};

export default HomePage;