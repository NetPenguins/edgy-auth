import axios from 'axios';
import React, { useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContextProvider';

const UserProfile: React.FC = () => {
  const [data, setData] = useState('');
  const authContext = useContext(AuthContext);
  console.log('here')
  axios.get('http://localhost:8081/admin', {headers: {'x-token': authContext.keycloak.token}}).then((value) => {
    setData(value.data);
  }).catch((e) => {
    console.error(e)
  })
 return (
   <div>
     <h1 className="text-black text-4xl">Welcome to the Protected Page.</h1>
     <p>{data}</p>
   </div>
 );
};

export default UserProfile;