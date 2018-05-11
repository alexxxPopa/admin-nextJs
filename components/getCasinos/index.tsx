import * as React from 'react';
import axios from 'axios';
import { List } from 'semantic-ui-react';
import { Casino } from '../model';
import { ROOT_URL } from '../types';

interface State {
  casinos: Array<Casino>;
  error: boolean;
}

export default class GetCasinos extends React.Component<{}, State> {
  
  constructor(props: any) {
    super(props);
    this.state = {
      casinos: new Array<Casino>(),
      error: false
    };
  }

  componentDidMount() {
    axios.get(ROOT_URL + '/draws/jackpot')
      .then(response => this.setState({
        casinos: response.data
      }))
      .catch(() => this.setState({
        error: true
      }));
  }

  renderCasinos = (): any => {
    if (this.state.casinos.length === 0) {
      return 'no casinos!';
    } else {
      return this.state.casinos.map ( (casino: Casino) => {
        return (
          <List.Item key={casino.id}>
            <List.Content>
              <List.Description>
                Name: {casino.label}, Jackpot: {casino.jackpot}, Id: {casino.id}
              </List.Description>
            </List.Content>
          </List.Item>
        );
      });
    }
  }

  render() {
    const { error } = this.state;
    return(
      <div>
        {error ? 'unable to get casinos' : 
          <List>{this.renderCasinos()}</List>
        }
      </div>
    );
  }
}