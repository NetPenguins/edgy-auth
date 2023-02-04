
import React, { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContextProvider';

const Home: React.FC = () => {
    const authContext = useContext(AuthContext);
    console.log(authContext.keycloak.token)
    return (
        <div>
            <h1 className="text-green-800 text-4xl">Welcome {authContext?.profile?.username || 'Guest'}</h1>
        </div>
    );
};

export default Home;