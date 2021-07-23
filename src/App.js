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
      showMap: false,
      showMovie: false,
      error: false,
      errorMessage: '',
      movies: {}
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
      showMap: true
    })

  }

  getMovies = async () => {
    const API = `https://city-explorer-api-app.herokuapp.com/movies?city=${this.state.searchQuery}`

    let response = await axios.get(API)
      
    let data = response.data;
    this.setState({movies: data[0]})

    this.setState({
      showMovie: true
    })
    
    // console.log(this.state.movies[0].title);
      
  }

  handleClose = () => {
    this.setState({
      showMap: false,
      showMovie: false
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
            <Button variant="primary" onClick={this.getMovies}>Find Movies about this City</Button>
          </Card.Body>
        </Card>
        {this.state.dailyWeather.length && 
          <Weather forecast={this.state.dailyWeather} />
        }
        <Modal show={this.state.showMap} onHide={this.handleClose}>
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
        
        <Modal show={this.state.showMovie} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{this.state.movies.title}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card style={{ width: '28rem' }}>
            <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${this.state.movies.image_url}`} />
            </Card>
            <Card.Text>
              {this.state.movies.overview}
            </Card.Text>
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

      </>
    )
  }



}

export default App;


