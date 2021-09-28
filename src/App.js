import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    username: '',
    userImg: [],
    name: '',
    location: '',
    url: '',
    id: ''
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/krueng')
      .then(resp => {
        console.log(resp)
        this.setState({
          username: resp.data.login,
          userImg: resp.data.avatar_url,
          name: resp.data.name,
          location: resp.data.location,
          url: resp.data.html_url,
          id: resp.data.id
        })
      })
      .catch(
        console.error('error')
      )
  }

  handleSearch = (e) => {
    e.preventDefault();
    this.state.username.length >= 1 && //Ensure something was typed
      // console.log(`${this.state.user}`);
      axios.get(`https://api.github.com/users/${this.state.username}`)
        .then(resp => {
          this.setState({
            username: '',//clear input afterward
            userImg: resp.data.avatar_url,
            name: resp.data.name,
            location: resp.data.location,
            url: resp.data.html_url,
            id: resp.data.id
          })
        })
        .catch(
          console.error('error')
        )
  }

  handleInput = (e) => {
    this.setState({
      ...this.state,
      username: e.target.value

    });
    // console.log(`${e.target.value}`);
  }

  render() {
    return (
      <div className="App">
        <form>
          <input value={this.state.username} onChange={this.handleInput} placeholder='search by username'/>
          <button onClick={this.handleSearch}>Search User</button>
        </form>
        <header className="App-header">
          {/* this.state.userImg.map(img) */}
          <h1>{this.state.name}</h1>
          <a href={this.state.url} target='_blank' rel='noreferrer'><img src={this.state.userImg} alt={this.state.name} /></a>
          <p>{this.state.location}</p>
        </header>
      </div>
    );
  }
}

export default App;
