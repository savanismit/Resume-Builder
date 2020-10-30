import React, { useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { getCurrentProfile } from '../../actions/profile';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';
import Carousel from 'react-bootstrap/Carousel';
import Template from '../../img/temp.png';
import Badge from 'react-bootstrap/Badge';
import Template1 from '../../img/temp1.png';
import Template2 from '../../img/temp2.png';
import Template3 from '../../img/temp3.png';
const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <div>
      <Carousel>
        <Carousel.Item>
          <Link to="/home">
            <img className="d-block w-100" src={Template} alt="First slide" />
          </Link>
          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/home">
            <img className="d-block w-100" src={Template1} alt="Third slide" />
          </Link>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/home">
            <img className="d-block w-100" src={Template2} alt="Third slide" />
          </Link>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <Link to="/home">
            <img className="d-block w-100" src={Template3} alt="Forth Slide" />
          </Link>

          <Carousel.Caption></Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});
export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
