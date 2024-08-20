import React from 'react'
import {Navbar,Container} from 'react-bootstrap';
 
function Header() {
  return (
    
    <>
    <Navbar style={{ backgroundColor: 'rgba(255, 255, 255, 0)' }}  >
        <Container>
          <Navbar.Brand href="#home">
            <img
              alt=""
              src="https://static.vecteezy.com/system/resources/thumbnails/008/854/797/small/sunny-and-rainy-cloudy-day-weather-forecast-icon-meteorological-sign-3d-render-png.png"
              width="80" 
              className="d-inline-block align-top"
            />{' '}
            <h1 className='fw-bolder mt-2'>Weather App</h1>
          </Navbar.Brand>
        </Container>
      </Navbar>
    </>
  )
}

export default Header