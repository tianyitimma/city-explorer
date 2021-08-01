import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class Weather extends React.Component{
  render() {
    return(

      <div className="weather">
        <Modal show={this.props.showWeather} onHide={this.props.closeWeather}>
          <Modal.Header closeButton>
          </Modal.Header>
          <Modal.Body>
            <Card style={{ width: '18rem' }}>
              
              <Card.Body>
              <Card.Title>The weather forecast of {this.props.location}</Card.Title>
              
              {this.props.forecast.map((data, idx) => {
                return <div key={idx}>
                
                  <Card.Text>
                    {data.date}
                  </Card.Text>
                  <Card.Text>
                    {data.description}
                  </Card.Text>
              
                  </div>
                  
                })
              } 
                </Card.Body>
              </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.props.closeWeather}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>

    )
  }
}



export default Weather;
