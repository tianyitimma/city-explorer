import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      location: {}
    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;

    const response = await axios.get(API);

    console.log('LOCATION IQ DATA:', response);
    
    this.setState({
    location: response.data[0]
    })
  }

  render() {
    return (
      <>
        <Form>
          <Form.Group >
            <Form.Label>
              location Name
            </Form.Label>
            <Form.Control type="text" onChange={(e) => this.setState({searchQuery: e.target.value})} />
            <Button  onClick={this.getLocation} >Explore!</Button>
          </Form.Group>
        </Form>
        <Card style={{ width: '18rem' }}>
          <Card.Img variant="top" src="holder.js/100px180" />
          <Card.Body>
            <Card.Title>The name of this location: {this.state.location.display_name}</Card.Title>
            <Card.Text>
              The latitude: {this.state.location.lat}
            </Card.Text>
            <Card.Text>
              The longitude: {this.state.location.lon}
            </Card.Text>
          </Card.Body>
        </Card>

        
      </>
    )
  }



}

export default App;


