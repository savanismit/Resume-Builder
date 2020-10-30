import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';  
import ProgressBar from 'react-bootstrap/ProgressBar';

export default class Success extends Component {
  render() {
    return (
      <div className="card animated bounceIn">
        <ProgressBar now={100} />
        <div className="card-body text-center pt-8 pb-5 mt-10">
          <i className="fas fa-check-circle fa-7x text-success"></i>
          <h2>Your Resume is Ready!</h2>
          <br />
          <h3>Your Feedback Would be Valueable to Us!</h3>
          <p className="my-1">
            <Link to="/feedback">Feedback</Link>
          </p>
        </div>
      </div>
    );
  }
}
