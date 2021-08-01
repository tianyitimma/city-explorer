import React from 'react';
import axios from 'axios';

import 'bootstrap/dist/css/bootstrap.min.css';
import Weather from './Weather';
import FindCity from './FindCity';
import Movies from './Movies';
import ShowCity from './ShowCity';
import ShowMap from './ShowMap';


class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      searchQuery: '',
      location: {},
      map: {},
      dailyWeather: [],
      showMap: false,
      movies: [],
      showMovies: false,
      showWeather: false
    }
  }

  getLocation = async () => {
    try{
      const API = `https://us1.locationiq.com/v1/search.php?key=${process.env.REACT_APP_API_KEY}&q=${this.state.searchQuery}&format=json`;
      const response = await axios.get(API);
      this.setState({
        location: response.data[0]
        })
    } catch(err) {
      console.error(err);
    }
  }

  getWeather = async () => {
    try{
      const weatherAPI = `https://city-explorer-api-app.herokuapp.com/weather?lon=${this.state.location.lon}&lat=${this.state.location.lat}`

      const weatherResponse = await axios.get(weatherAPI);
      this.setState({
        dailyWeather: weatherResponse.data,
        showWeather: true
      })
      
    } catch(err) {
      console.error(err);
    }
  }
  updateCity = (e) => {
    this.setState({ searchQuery: e.target.value});
  }
  submitCity = () => {
    this.getLocation();
    this.getMap();
    this.getMovies();

  }

  getMap = () => {
      this.setState({map: `https://maps.locationiq.com/v3/staticmap?key=${process.env.REACT_APP_API_KEY}&center=${this.state.location.lat},${this.state.location.lon}&zoom=10`})
  }

  getMovies = async () => {
    try{
      const API = `https://city-explorer-api-app.herokuapp.com/movies?city=${this.state.searchQuery}`

      let response = await axios.get(API)
        
      let data = response.data;
      this.setState({movies: data})
    } catch(err){
      console.error(err);
    }
      
  }
  showMap = () =>{
    this.getMap();
    this.setState({
      showMap: true
    })
  }
  closeMap = () => this.setState({
    showMap: false
  })
  showMovies = () => this.setState({
    showMovies: true
  })
  closeMovies = () => this.setState({
    showMovies: false
  })
  closeWeather = () => this.setState({
    showWeather: false
  })


  render() {
    return (
      <>
        <FindCity updateCity={this.updateCity} submitCity={this.submitCity} />
        <ShowCity location={this.state.location} showMap={this.showMap} showMovies={this.showMovies} getWeather={this.getWeather} />
        
        
        <Weather location={this.state.searchQuery} forecast={this.state.dailyWeather} showWeather={this.state.showWeather} closeWeather={this.closeWeather}/>
        
        
        <ShowMap location={this.state.location} map={this.state.map} showMap={this.state.showMap} closeMap={this.closeMap} />
        
        {this.state.showMovies && 
          <Movies movies={this.state.movies} showMovies={this.state.showMovies} closeMovies={this.closeMovies}/>
        } 

      </>
    )
  }



}

export default App;


