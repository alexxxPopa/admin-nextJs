import * as React from 'react';
import { Input, Button } from 'semantic-ui-react';
import axios from 'axios';
import { ROOT_URL } from '../types';

interface State {
  jackpot: any;
  label: string;
  id: string;
  response: string;
}

export default class AddCasino extends React.Component<{}, State> {
  
  constructor(props: any) {
    super(props);
    this.state = {
      jackpot: 0,
      label: '',
      id: '',
      response: '',
    };
  }

  handleLabelChange = (event: any): any => {
    this.setState({
      label: event.target.value
    });
  }

  handleJackpotChange = (event: any): any => {
    this.setState({
      jackpot: event.target.value
    });
  }

  handleCasinoIdChange = (event: any): any => {
    this.setState({
      id: event.target.value
    });
  }

  handleAddDraw = (): any => {
    let URL = ROOT_URL + '/draws/jackpot';
    axios.post(URL, {
      label: this.state.label,
      jackpot: parseInt(this.state.jackpot, 10)
    }).then(() => this.setState({
      response: 'casino added'
    })).catch(() => this.setState({
      response: 'failed to add draw'
    }));
  } 

  render() {
    const { response } = this.state;
    return (
      <div>
        <Input 
          placeholder="Name"  
          onChange={this.handleLabelChange}
        />
        <Input
          placeholder="Jackpot"  
          onChange={this.handleJackpotChange}
        />
        <Input
          placeholder="Casino Id"  
          onChange={this.handleCasinoIdChange}
        />
      <Button
        content="Add casino"
        onClick={this.handleAddDraw}
      />
      { response !== '' ? 
        <div>{response}</div> : null }  
    </div>  
    );
  }
}