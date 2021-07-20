import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      location: {},
      map: {},
      showModal: false
    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;

    const response = await axios.get(API);

    console.log('LOCATION IQ DATA:', response);
    
    this.setState({
    location: response.data[0]
    })
    console.log('current location', this.state.location);
  }

  getMap = () => {
    // const API = `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`;

    // const response = await axios.get(API);
    // console.log('map:', response);
    this.setState({
      map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`,
      showModal: true
    })

  }

  handleClose = () => {
    this.setState({
      showModal: false
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
          
          <Card.Body>
            <Card.Title>The name of this location: {this.state.location.display_name}</Card.Title>
            <Card.Text>
              The latitude: {this.state.location.lat}
            </Card.Text>
            <Card.Text>
              The longitude: {this.state.location.lon}
            </Card.Text>
            <Button variant="primary" onClick={this.getMap}>See map</Button>
          </Card.Body>
        </Card>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.location.display_name}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card style={{ width: '28rem' }}>
            <Card.Img variant="top" src={this.state.map} />
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        
      </>
    )
  }



}

export default App;


