import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { setUsers, setCurrentUser, setRandomUser } from '../../redux/actions/actions_users';
import Contact from './Contact';

class ContactListContainer extends Component {
  constructor(props) {
    super(props);
    this.clickOnUser = this.clickOnUser.bind(this);
    this.clickOnRandom = this.clickOnRandom.bind(this);
  }

  componentWillMount() {
    this.props.user.logged.then(() => {
      this.props.dispatch(setUsers());
    });
  }

  clickOnUser(user) {
    this.props.dispatch(setCurrentUser(user));
  }

  clickOnRandom() {
    this.props.dispatch(setRandomUser());
  }

  render() {
    const { users } = this.props.user;
    const listItems = users.map((user) => {
      const { id } = user;
      return <Contact key={id.toString()} user={user} getUser={this.clickOnUser} />;
    });

    return (
      <div id="contact-list">
        <div className="row">
          <div className="col-md-10 col-md-offset-1">
            <div className="panel panel-primary">
              <div className="panel-heading">
                <ul className="list-group">
                  <li className="list-group-item">
                    <div className="user-data">
                      <div className="flex-item flex-item-name"> Full Name </div>
                      <div className="flex-item flex-item-email"> Email </div>
                      <div className="flex-item flex-item-phone"> Phone Number </div>
                      <div className="flex-item flex-item-phone"> Mobile Number </div>
                      <div className="flex-item flex-item-random">
                      </div>
                      <button className="btn-danger" onClick={() => { this.clickOnRandom(); }}> Random! </button>
                    </div>
                  </li>
                </ul>
              </div>
              <div className="panel-body">
                <ul className="list-group">
                  { listItems }
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ContactListContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  user: PropTypes.shape().isRequired,
  pendingFlag: PropTypes.bool.isRequired,
};

function mapStateToProps(state) {
  const user = state.userState.user.users !== undefined ?
    state.userState.user : state.userInitialState.user;

  const pendingFlag = state.userState.pendingFlag !== undefined ?
    state.userState.pendingFlag : true;

  return { user, pendingFlag };
}

export default connect(mapStateToProps)(ContactListContainer);
