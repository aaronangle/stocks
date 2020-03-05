import React from 'react';
import Home from "./pages/Home";
import CompanyInformation from "./pages/CompanyInformation/CompanyInformation";
import GeneralNews from "./pages/GeneralNews/GeneralNews";
import ApolloClient from "apollo-boost";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { ApolloProvider } from '@apollo/react-hooks';

function App() {
  const client = new ApolloClient({
    uri: 'http://localhost:3001/graphql',
  });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/information/:name" component={CompanyInformation} />
          <Route exact path="/news" component={GeneralNews} />
        </Switch>
      </Router>
    </ApolloProvider>
  )

}

export default App;
