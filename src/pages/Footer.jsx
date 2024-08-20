import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';

function Footer() {
  return (
     
    <MDBFooter
      style={{ backgroundColor: 'rgba(255, 255, 255, 0.5)' }} // Adjust opacity as needed
      className='text-center text-lg-left'
    >
      <div className='text-center p-3'  >
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://watherapp.com/'>
          WeatherApp,com
        </a>
      </div>
    </MDBFooter> 
  )
}

export default Footer