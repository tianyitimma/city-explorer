import React from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import 'bootstrap/dist/css/bootstrap.min.css';
import Alert from 'react-bootstrap/Alert'
import Weather from './Weather'


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      location: {},
      map: {},
      dailyWeather: [],
      showModal: false,
      error: false,
      errorMessage: ''
    }
  }

  getLocation = async () => {
    const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;

    

    const response = await axios.get(API);

    // console.log('LOCATION IQ DATA:', response);
    
    if (response.statusCode === "400" || response.statusCode === "404" || response.statusCode === "500") {
      //do some thing , error  handling
      this.setState({
        error: true,
        errorMessage: response.createError

      })
    };

    this.setState({
    location: response.data[0]
    })

    const weatherAPI = `http://localhost:3001/weather?city=${this.state.searchQuery}&lon=${this.state.location.lon}&lat=${this.state.location.lat}`

    const weatherResponse = await axios.get(weatherAPI);

    this.setState({
      dailyWeather: weatherResponse
    })
    // console.log('current location', this.state.location);
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

  closeError = () => {
    this.setState({
      error: false
    })
  }

  render() {
    return (
      <>
        <Form>
          <Form.Group >
            <Form.Label>
              Location Name
            </Form.Label>
            <Form.Control type="text" onChange={(e) => this.setState({searchQuery: e.target.value})} />
            <Button  onClick={this.getLocation} >Explore!</Button>
          </Form.Group>
        </Form>

        <Card style={{ width: '18rem' }}>
          
          <Card.Body>
            <Card.Title>The location: {this.state.location.display_name}</Card.Title>
            <Card.Text>
              The latitude: {this.state.location.lat}
            </Card.Text>
            <Card.Text>
              The longitude: {this.state.location.lon}
            </Card.Text>
            <Button variant="primary" onClick={this.getMap}>See map</Button>
          </Card.Body>
        </Card>
        {this.state.dailyWeather.length && 
          <Weather forecast={this.state.dailyWeather} />
        }
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
        
        <Alert variant="danger" show={this.state.error} >
          <Alert.Heading>Oh snap! It's not a valid city</Alert.Heading>
          <p>
            {this.errorMessage}
          </p>
          <Button onClick={this.closeError} >
            Close and try again
          </Button>
        </Alert>

        {/* <httpErrors errorMode="Custom" existingResponse="Replace"  >
          <remove statusCode="500"/>
          <error statusCode="500" path="500.html" responseMode="File"/>
          <remove statusCode="404"/>
          <error statusCode="404" path="404.html" responseMode="File"/>
          <remove statusCode="400"/>
          <error statusCode="400" value="fail">
            <Alert variant="danger" >
              <Alert.Heading>Oh snap! It's not a valid city</Alert.Heading>
            
            </Alert>
          </error>
        </httpErrors>  */}
      </>
    )
  }



}

export default App;


