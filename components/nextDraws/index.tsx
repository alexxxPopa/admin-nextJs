import * as React from 'react';
import { Draw } from '../model';
import axios from 'axios';
import { ROOT_URL } from '../types';
import { List } from 'semantic-ui-react';

interface State {
  draws: Array<Draw>;
  error: boolean;
}

export default class NextDraws extends React.Component<{}, State> {

  constructor (props: any) {
    super(props);
    this.state = {
      draws: new Array<Draw>(),
      error: false
    };
  }

  componentDidMount() {
    axios.get(ROOT_URL + '/draws')
      .then( (response) => this.setState(
        {draws: response.data}))
      .catch( () => this.setState(
        {error: true}));
      }

  renderDraws = (): any => {
    if (this.state.draws.length === 0) {
      return 'no draws available';
    } else {
      return this.state.draws.map ((draw: Draw) => {
        let date = new Date(draw.drawStart);
        return (
          <List.Item key={draw.id}>
            <List.Content>
              <List.Description>
                Id: {draw.id}; Start: {date.getUTCDate()}/{date.getUTCDay()}/
                {date.getUTCFullYear()} {date.getUTCHours()}:{date.getMinutes()} UTC 
              </List.Description>
            </List.Content>
          </List.Item>
        );
      });
    }
  }

  render() {
    const { error } = this.state;
    return (
      <div>
        {error ? 'unable to get draws' : 
          <List> {this.renderDraws()}</List>
        }
      </div>
    );
  }
}