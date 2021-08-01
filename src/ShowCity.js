import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.min.css';

class ShowCity extends React.Component {
  
  render() {
    return(
      <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title>The location: {this.props.location.display_name}</Card.Title>
            <Card.Text>
              The latitude: {this.props.location.lat}
            </Card.Text>
            <Card.Text>
              The longitude: {this.props.location.lon}
            </Card.Text>
            <Button variant="primary" onClick={this.props.showMap}>See Map</Button>
            <Button variant="primary" onClick={this.props.showMovies}>Find Movies about this City</Button>
            <Button variant="primary" onClick={this.props.getWeather}>See Forecast</Button>
          </Card.Body>
        </Card>
    )
  }
}

export default ShowCity;