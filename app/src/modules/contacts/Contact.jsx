import React from 'react';
import PropTypes from 'prop-types';

const Contact = ({ user, getUser }) => {
  const { name, email, phone, cell } = user;
  const fullname = `${name.first} ${name.last}`;

  return (
    <li className="list-group-item">
      <div className="user-data" onClick={() => { getUser(user); }}>
        <div className="flex-item flex-item-name"> {fullname} </div>
        <div className="flex-item flex-item-email"> {email} </div>
        <div className="flex-item flex-item-phone"> {phone} </div>
        <div className="flex-item flex-item-phone"> {cell} </div>
        <div className="flex-item flex-item-random"></div>
      </div>
    </li>
  );
}

Contact.propTypes = {
  user: PropTypes.shape().isRequired,
  getUser: PropTypes.func,
};

export default Contact;
