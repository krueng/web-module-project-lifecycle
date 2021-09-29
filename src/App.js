import React from 'react';
import axios from 'axios';
import './App.css';

class App extends React.Component {
  state = {
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
      .catch(
        console.error('error')
      )
  }
  componentDidUpdate(prevProps, prevState) {
    // console.log(prevState.username, this.state.username)
    if (this.state.username !== prevState.username) {
      axios.get(`https://api.github.com/users/${this.state.username}/followers`)
        .then(resp => {
          this.setState({
            followers: resp.data
          })
        })
        .catch(
          console.error('error')
        )
    }

  }
  handleSearch = (e) => {
    e.preventDefault();
    this.state.username.length >= 1 && //Ensure something was typed
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
  }

  render() {
    return (
      <div className="App">
        <form>
          <input value={this.state.username} onChange={this.handleInput} placeholder='search by username' />
          <button onClick={this.handleSearch}>Search User</button>
        </form>
        <header className="App-header">
          <h1>{this.state.name}</h1>
          <a key={this.state.id} href={this.state.url} target='_blank' rel='noreferrer'><img src={this.state.userImg} alt={this.state.name} /></a>
          <p>{this.state.location}</p>

          <h3> {`${this.state.name !== null ? this.state.name : ''} Has ${this.state.followers.length} Followers`} </h3>
          {this.state.followers.map(follower =>
            <>
              <h4>{follower.login}</h4>
              <a key={follower.id} href={follower.html_url} target='_blank' rel='noreferrer'><img width='50%' src={follower.avatar_url} alt={follower.login} /></a>
            </>
          )}
        </header>
      </div>
    );
  }
}

export default App;
