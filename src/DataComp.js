import InputSearch from './InputSearch';
import React from 'react';
import Geolocation from './Gelocation';
import Switch from 'react-switch';
import {Navbar,Nav,Form} from 'react-bootstrap';

class DataComp extends React.Component {
  state = {
    checked: false,
    dailyData: {},
    city:[]
  }

  parentCallBackFunct = (data) => {
    if(data.cod ==="404")
    {
      alert("No weather forecast found!");
      return;
    }
    const dailyData = data.list.filter(reading => {
      return reading.dt_txt.includes("18:00:00")
    })
    let city = data.city;
    const infArray = {
      temp: [],
      feels_like: [],
      weather: [],
      icon:[],
      datetime: [],
      description: [],
    }
    dailyData.map(
      (t) => {
        infArray.temp.push(t.main.temp);
        infArray.feels_like.push(t.main.feels_like);
        infArray.weather.push(t.weather[0].main);
        infArray.icon.push(t.weather[0].id)
        infArray.description.push(t.weather[0].description);
        infArray.datetime.push(t.dt);
        return infArray;
      }
    )  
    this.setState({ city: city, dailyData: infArray });
    this.props.fillStates(this.state.dailyData, this.state.city)

  }

  handleChange = (checked) => {
    this.setState({ checked });
  }

  render() {
    return (
    <div>
      <Navbar bg="dark" variant="dark" expand="lg" style={{padding:"10"}}>
        <Navbar.Brand href="#home">
          <img alt="logo" src="https://lh3.googleusercontent.com/napgxTBO7Efx-5NrdG_Mrfh6tISWc7Q1V6mXhQl-yDMOCPQIeioaTnUG5-zAjnFP-_o=w300" style={{width:40, marginTop: -7}} />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <label>
            <span style={{paddingBottom:"10px",color:"white"}}></span>
            <Switch onChange={this.handleChange} checked={this.state.checked} className="react-switch"  />
          </label>
          <span class="nav-title"> Weather Application</span>
          </Nav>
          
          <Form inline>
            <InputSearch getData={this.parentCallBackFunct} />
          </Form>
        </Navbar.Collapse>
      </Navbar>
      <div>

        {this.state.checked === false ?
          "":
          <Geolocation getData={this.parentCallBackFunct} />}
      </div>
    </div>

    )
  }
}

export default DataComp;