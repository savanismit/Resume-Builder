import React, { Component } from 'react'

export default class Success extends Component {
    
   
  
    render() {
    return (
      <div className="card animated bounceIn">
        <div className="card-body text-center pt-8 pb-5 mt-10">
            <i className="fas fa-check-circle fa-7x text-success"></i>
            <h2>Your Resume is Ready!</h2>
            <br/>
            
        </div>  
        
      </div>
    )
  }
}
