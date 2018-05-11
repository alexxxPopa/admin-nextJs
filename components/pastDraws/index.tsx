import * as React from 'react';
import { Draw } from '../model';
import { ROOT_URL } from '../types';
import axios from 'axios';
import { List } from 'semantic-ui-react';
import Search from './search';

interface State {
  draws: Array<Draw>;
  error: boolean;
  toggleSearch: boolean;
}

export default class PastDraws extends React.Component<{}, State> {

  constructor (props: any) {
    super(props);
    this.state = {
      draws: new Array<Draw>(),
      error: false,
      toggleSearch: false,
    };
  }

  handleSearchPastDraws = (casinoId: string): any => {
    // hardcoded offset 
    this.setState({ toggleSearch: true });
    axios.get(ROOT_URL + '/draws/concluded/0/' + casinoId)
      .then( (response) => this.setState(
        {draws: response.data}))
      .catch( () => this.setState(
        {error: true}));
      }

  renderDraws = (): any => {
    return this.state.draws.map ((draw: Draw) => {
      let date = new Date(draw.drawStart);
      return (
        <List.Item key={draw.id}>
          <List.Content>
            <List.Description>
              Id: {draw.id}; Start: {date.getUTCDate()}/{date.getUTCDay()}/
              {date.getUTCFullYear()} {date.getUTCHours()}:{date.getMinutes()} UTC;
              Won Amount: {draw.won}; White Numbers:{draw.whiteResult.reduce ((r, a) => r.concat(',', a))};
              Red Number: {draw.redResult} 
            </List.Description>
          </List.Content>
        </List.Item>
      );
    });
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        {!this.state.toggleSearch ? 
          <Search handleSearch={(casinoId: string) => this.handleSearchPastDraws(casinoId)} /> :
            error ? 'unable to get draws' : 
             <List> {this.renderDraws()}</List>
        }
      </div>
    );
  }
}