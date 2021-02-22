import React, { Component } from 'react';

import logo from './logo.svg';

import './App.css';

class App extends Component {
  state = {
    response: '',
    post: '',
    name: '',
    email: '',
    responseToPost: '',
  };

  handleMailchimp = async e => {
    const thankYouMessage = document.querySelector('#thank-you-message');
    e.preventDefault();
    const response = await fetch('.netlify/lambda/test', {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: this.state.name, email: this.state.email }),
    })

    const body = await response.json();

    if (body === "success") {
      thankYouMessage.classList.add('show');
    }

    this.setState({ responseToPost: body }); 
    
  };

  render() {
    return (
      <div className="App">
        <form onSubmit={this.handleMailchimp} class="centered mt-10 ml-10 mr-10">
            <div class="form-group">
                <label class="form-label" for="firstname">First Name</label>
                <input class="form-input" type="text" value={this.state.name} onChange={e => this.setState({ name: e.target.value })} id="firstname"/>
            </div>
            <div class="form-group">
                <label class="form-label" for="email">Email</label>
                <input class="form-input" type="text" value={this.state.email} onChange={e => this.setState({ email: e.target.value })} name="email" id="email"/>
            </div>
            <input type="submit" class="btn btn-primary" value="Submit"/>
            <p id="thank-you-message">
            Obrigada pela tua subscrição! <strong>Faz o download do teu guia <a href="https://drive.google.com/uc?export=download&id=18q_SSC1y46mJIEQZeeeRaJwTorSij-SO">neste link.</a></strong>            
            </p>
        </form>
        <p>{this.state.responseToPost}</p>

      </div>
    );
  }
}

export default App;