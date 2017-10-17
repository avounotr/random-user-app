import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Modal } from 'react-bootstrap';

import { removeCurrentUser } from '../../redux/actions/actions_users';

class ViewContactContainer extends Component {
  constructor(props) {
    super(props);
    this.hideModal = this.hideModal.bind(this);
  }

  hideModal() {
    this.props.dispatch(removeCurrentUser());
  }

  render() {
    const { currentUser } = this.props;
    const {
      id, cell, dob, email, gender, location, login, name, nat, phone, picture,
    } = currentUser;

    return (
      <Modal show={id !== undefined} onHide={this.hideModal}>
        <Modal.Header closeButton>
          <img src="https://lorempixel.com/50/50/?83169" className="image-circle" />
          { name !== undefined &&
            <h3> {name.title} {name.first} {name.last} </h3>
          }
        </Modal.Header>
        <Modal.Body>
          <h5> General </h5>
          <hr />
          <div>
            <div>
              <span className="contact-type">
                Gender
              </span>
              <span className="contact-value"> {gender} </span>
            </div>
            <div>
              <span className="contact-type">
                DOB <i className="glyphicon glyphicon-gift"></i>
              </span>
              <span className="contact-value"> {dob} </span>
            </div>
            <div>
              <span className="contact-type">
                Email <i className="glyphicon glyphicon-envelope"></i>
              </span>
              <span className="contact-value"> {email} </span>
            </div>
            <div>

              <span className="contact-type">
                Phone <i className="glyphicon glyphicon-phone-alt"></i>
              </span>
              <span className="contact-value"> {phone} </span>
            </div>
            <div>

              <span className="contact-type">
                Cell Phone <i className="glyphicon glyphicon-phone"></i>
              </span>
              <span className="contact-value"> {cell} </span>
            </div>
            { location !== undefined &&
              <div>
                <span className="contact-type">
                  Location <i className="glyphicon glyphicon-map-marker"></i>
                </span>
                <span className="contact-value">
                  {location.street}, {location.city}
                  ({location.postcode}), {location.state}
                </span>
              </div>
            }
            <div>
              <span className="contact-type">
                Nationality
              </span>
              <span className="contact-value"> {nat} </span>
            </div>
          </div>
          <hr />

          { login !== undefined &&
            <div>
              <h5> Login </h5>
              <hr />
              <div>
                <div>
                  <span className="contact-type"> Username </span>
                  <span className="contact-value"> {login.username} </span>
                </div>
                <div>
                  <span className="contact-type"> Password </span>
                  <span className="contact-value"> {login.password} </span>
                </div>
                <div>
                  <span className="contact-type"> Salt </span>
                  <span className="contact-value"> {login.salt} </span>
                </div>
                <div>
                  <span className="contact-type"> Md5 </span>
                  <span className="contact-value"> {login.md5} </span>
                </div>
                <div>
                  <span className="contact-type"> Sha1 </span>
                  <span className="contact-value"> {login.sha1} </span>
                </div>
                <div>
                  <span className="contact-type"> Sha256 </span>
                  <span className="contact-value"> {login.sha256} </span>
                </div>
              </div>
            </div>
          }
        </Modal.Body>
      </Modal>
    );
  }
}

ViewContactContainer.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currentUser: PropTypes.shape().isRequired,
};

function mapStateToProps(state) {
  const currentUser = state.userState.user.currentUser !== undefined ?
    state.userState.user.currentUser : {};
  return { currentUser };
}

export default connect(mapStateToProps)(ViewContactContainer);
