import * as React from 'react';
import { Input, Button } from 'semantic-ui-react';

interface State {
  input: string;
}

interface Props {
  handleSearch: (input: string) => void;
}

export default class Search extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      input: ''
    };
  }

  handleOnChange = (event: any): any => {
    this.setState({
      input: event.target.value
    });
  } 

  render() {
    return (
      <div>
        <Input
          placeholder="Enter casino id"  
          onChange={this.handleOnChange}
        />
        <Button 
          content="Search draws"
          onClick={() => this.props.handleSearch(this.state.input)}
        />
      </div>
    );
  }
}