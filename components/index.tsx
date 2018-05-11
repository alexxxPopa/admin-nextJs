import * as React from 'react';
import { Grid, Menu, Segment } from 'semantic-ui-react';
import NextDraws from './nextDraws';
import PastDraws from './pastDraws';
import AddDraw from './addDraw';
import AddCasino from './addCasino';
import GetCasinos from './getCasinos';

interface State {
  activeItem: string;
}

export default class Navigation extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      activeItem: 'add draw'
    };
  }

  renderMenuComponent = (): any => {
    var components = {
      'add draw': <AddDraw />,
      'next draws': <NextDraws />,
      'past draws': <PastDraws />,
      'add casino': <AddCasino />,
      'casinos': <GetCasinos />
    };

    return components[this.state.activeItem];
  }

  handleItemClick = ( e:any, { name }: any ) => this.setState({ activeItem: name });

  render() {
    const { activeItem } = this.state;

    return (
      <Grid>
        <Grid.Column width={4}>
          <Menu fluid={true} vertical={true} tabular={true}>
            <Menu.Item name="add draw" active={activeItem === 'add draw'} onClick={this.handleItemClick} />
            <Menu.Item name="past draws" active={activeItem === 'past draws'} onClick={this.handleItemClick} />
            <Menu.Item name="next draws" active={activeItem === 'next draws'} onClick={this.handleItemClick} />
            <Menu.Item name="casinos" active={activeItem === 'casinos'} onClick={this.handleItemClick} />
            <Menu.Item name="add casino" active={activeItem === 'add casino'} onClick={this.handleItemClick} />
          </Menu>
          </Grid.Column>

          <Grid.Column stretched={true} width={12}>
            <Segment>
              {this.renderMenuComponent()}
            </Segment>
          </Grid.Column>
      </Grid>
    );
  }
}