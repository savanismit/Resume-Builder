import React, { Component } from 'react';
import ProgressBar from 'react-bootstrap/ProgressBar';

class PersonalDetails extends Component {
  continue = (e) => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, handleChange } = this.props;
    return (
      <div className="card animated fadeInLeft">
        <ProgressBar now={0} />
        <div className="col-lg-12 mx-auto text-center mt-2">
          <h1>
            <b>What’s the best way for employers to contact you?</b>
          </h1>
          <p className="lead">
            We suggest including an email and phone number.
          </p>
          <hr />
        </div>

        {/* <div className="card-body">

                    <h3 className="card-title">Personal Info</h3>
                    <hr />
                </div> */}

        <form onSubmit={this.continue}>
          <div className="row col-lg-10 mx-auto">
            <div className="col-lg-4 text-left">
              <label>Name*</label>
              <input
                type="text"
                name="name"
                className="form-control"
                onChange={handleChange}
                defaultValue={values.status === 1 ? '' : values.name}
                required
              />
            </div>
            <div className="col-lg-4 text-left">
              <label>Email*</label>
              <input
                type="email"
                name="email"
                className="form-control"
                onChange={handleChange}
                defaultValue={values.status === 1 ? '' : values.email}
                required
              />
            </div>
            <div className="col-lg-4 text-left">
              <label>Mobile*</label>
              <input
                type="text"
                name="phone"
                className="form-control"
                onChange={handleChange}
                defaultValue={values.status === 1 ? '' : values.phone}
                required
              />
            </div>
          </div>
          <br />
          <div className="row col-lg-10 mx-auto">
            <div className="col-lg-6 text-left">
              <label>Linkedin</label>
              <input
                type="text"
                name="linkedin"
                className="form-control"
                defaultValue={values.status === 1 ? '' : values.linkedin}
                onChange={handleChange}
              />
            </div>
            <div className="col-lg-6 text-left">
              <label>Github</label>
              <input
                type="text"
                name="github"
                className="form-control"
                defaultValue={values.status === 1 ? '' : values.github}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          <div className="row col-lg-10 mx-auto">
            <div className="col-lg-12 text-left">
              <label>
                Skills* (Separate each skill with a space and a comma)
              </label>
              <input
                type="text"
                name="skills"
                className="form-control"
                defaultValue={values.status === 1 ? '' : values.skills}
                onChange={handleChange}
              />
            </div>
          </div>
          <br />
          <div className="container text-center">
            <button type="submit" className="btn btn-info">
              Next<i className="fas fa-angle-right ml-1"></i>
            </button>
          </div>
          <br />
        </form>
      </div>
    );
  }
}

export default PersonalDetails;
