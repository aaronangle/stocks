import React, { useState, useEffect } from 'react';
import Home from "./pages/Home"
import ApolloClient from "apollo-boost";
import { ApolloProvider } from '@apollo/react-hooks';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
  })

  return (
    <ApolloProvider client={client}>
      <Home />
    </ApolloProvider>
  )

}

export default App;
