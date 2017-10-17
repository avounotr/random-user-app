import React from 'react';
import PropTypes from 'prop-types';

import ContactListContainer from '../contacts/ContactListContainer';
import ViewContactContainer from '../contacts/ViewContactContainer';

const App = () => {
  return (
    <div id="random-users">
      <ContactListContainer />
      <ViewContactContainer />
    </div>
  );
}

App.propTypes = {};

export default App;
