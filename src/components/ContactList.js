import React, { useState } from 'react';
import {gql, useLazyQuery } from '@apollo/client';
import { Typography, Grid } from '@mui/material';
import Box from '@mui/material/Box';
import ContactsIcon from '@mui/icons-material/Contacts';


const SEARCH_CONTACTS = gql`
query SearchContacts($name: String!) {
  searchByName(name: $name) {
    name
    phone
  }
}
`;

const ContactSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchContacts,{ data, loading }] = useLazyQuery(SEARCH_CONTACTS);
  
  const handleSearch = (e) => {
    const {value} = e.target;
    setSearchTerm(value);
    searchContacts({ variables : {name: value} });
  };
  
  return (
    <Grid
    container
    direction="column"
    alignItems="center"
    justifyContent="center"
    textAlign="center"
    spacing={2}
  >
    <Grid item>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <ContactsIcon sx={{ width: 150, height: 70 }} />
        <Typography variant='h3' component="h2">Phone Book</Typography>
      </Box>
      </Grid>
      <Grid item>
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearch}
        placeholder="Search contacts..."
        style={{ width: '100%', maxWidth: '400px' }} /* Adjust input width */
      />
      </Grid>
      {loading ? <p>Loading...</p> : null}
      {data && data.searchByName ? (
         <Grid item container direction="column" alignItems="stretch">
           {data.searchByName.map((contact, index) => (
            <Grid item key={index} style={{ marginBottom: '10px' }}>
            <Typography variant="body1">
              <strong>Name:</strong> {contact.name}, <strong>Phone:</strong> {contact.phone}
            </Typography>
          </Grid>
          ))}
        </Grid>
      ) : null}
    </Grid>
  );
};

export default ContactSearch;
