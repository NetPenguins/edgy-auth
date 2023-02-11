import { Divider, Paper, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../helpers/AuthContextProvider';

interface SampleObject {
  stub: string, 
  email_verified: boolean, 
  name: string, 
  preferred_username: string, 
  given_name: string, 
  family_name: string, 
  email: string
}

const sampleInitData: SampleObject = {
  stub: '',
  email_verified: false,
  name: '',
  preferred_username: '',
  given_name: '',
  family_name: '',
  email: ''
}

const UserProfile: React.FC = () => {
  const [user, setUser] = useState(sampleInitData);
  const [roles, setRoles] = useState([]);
  
  const authContext = useContext(AuthContext);
  useEffect(() => {
    fetch('http://localhost:8081/user', { 
      headers:  new Headers({ 
        'x-token': authContext.keycloak.token || '',
        'Content-Type': 'application/json'
      })
    }).then((response) => response.json())
    .then((value: SampleObject) => {
      setUser(value);
    }).catch((e) => {
      console.error(e)
    })

    fetch(`http://localhost:8081/user/roles`, { 
      headers:  new Headers({ 
        'x-token': authContext.keycloak.token || '',
        'Content-Type': 'application/json'
      })
    }).then((response) => response.json())
    .then((r) => {
      setRoles(r);
    }).catch((e) => {
      console.error(e)
    })
  }, [])
 return (
   <main>
    <h1 className="text-black text-4xl">Welcome to the Protected Page</h1>
    <h3>{user?.name}</h3>
    <Divider />
    <h2>Roles Available:</h2>
    <TableContainer sx={{ width: 'fit-content' }} component={Paper}>
      <Table aria-label="simple table">
        <TableBody>
          {roles.map((role) => {
            return(
            <TableRow
              key={role}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {role}
              </TableCell>
            </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>  
   </main>
 );
};

export default UserProfile;
