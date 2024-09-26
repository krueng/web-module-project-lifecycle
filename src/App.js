import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
    textInput: '',
    username: '',
    userImg: '',
    name: '',
    location: '',
    url: '',
    id: '',
    followers: []
  }

  componentDidMount() {
    axios.get('https://api.github.com/users/krueng')
      .then(resp => {
        this.setState({
          username: resp.data.login,
          userImg: resp.data.avatar_url,
          name: resp.data.name,
          location: resp.data.location,
          url: resp.data.html_url,
          id: resp.data.id
        })
      })
      .catch(err =>
        console.error(err)
      )
  }
  componentDidUpdate(prevProps, prevState) {
    if (this.state.username !== prevState.username) {
      axios.get(`https://api.github.com/users/${this.state.username}/followers`)
        .then(resp => {
          this.setState({
            followers: resp.data
          })
        })
        .catch(err =>
          console.error(err)
        )
    }
  }
  handleSearch = (e) => {
    e.preventDefault();
    this.state.textInput.length >= 1 && //Ensure something was typed
      axios.get(`https://api.github.com/users/${this.state.textInput}`)
        .then(resp => {
          this.setState({
            textInput: '', //clear input afterward
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

  handleInput = (e) => {
    this.setState({
      textInput: e.target.value
    });
  }

  render() {
    return (
      <div className="App">
        <form>
          <input value={this.state.textInput} onChange={this.handleInput} placeholder='search by username' />
          <button onClick={this.handleSearch}>Search User</button>
        </form>
        <header className="App-header">
          <h1>{this.state.name}</h1>
          <a href={this.state.url} target='_blank' rel='noreferrer'><img src={this.state.userImg} alt={this.state.name} /></a>
          <p>{this.state.location}</p>

          <h3> {`${this.state.name !== null ? this.state.name : ''} Has ${this.state.followers.length} Followers`} </h3>
          {this.state.followers.map(follower =>
            <div key={follower.id}>
              <h4>{follower.login}</h4>
              <a href={follower.html_url} target='_blank' rel='noreferrer'><img width='50%' src={follower.avatar_url} alt={follower.login} /></a>
            </div>
          )}
        </header>
      </div>
    );
  }
}

export default App;
