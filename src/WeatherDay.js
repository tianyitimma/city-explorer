import React from 'react';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class WeatherDay extends React.Component {
  render() {
    return (
      <Card style={{ width: '18rem' }} key={this.props.key}>
        <Card.Body>
          <Card.Text>
            {this.props.data.date}
          </Card.Text>
          <Card.Text>
            {this.props.data.description}
          </Card.Text>
        </Card.Body>
      </Card>
    )
  }
}

export default WeatherDay;
