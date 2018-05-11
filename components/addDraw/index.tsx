import * as React from 'react';
import DateTimePicker from 'react-datepicker';
import * as moment from 'moment';
import { Button } from 'semantic-ui-react';
import axios from 'axios';
import { ROOT_URL } from '../types';

import 'react-datepicker/dist/react-datepicker.css';

interface State {
  date: any;
  response: string;
}

export default class AddDraw extends React.Component<{}, State> {

  constructor(props: any) {
    super(props);
    this.state = {
      date: moment.utc(),
      response: ''
    };
  }

  onDateChange = (date: any) => this.setState( { date });

  onAddDraw = () => {
    let timestamp = Math.round(this.state.date.toDate().getTime() / 1000);
    let URL = ROOT_URL + '/draws/new';
    axios.post(URL, {
      DrawStart: timestamp
    }).then(() => this.setState({
      response: 'draw added'
    })).catch(() => this.setState({
      response: 'failed to add draw'
    }));
  }

  render() {
    const { response } = this.state;
    return (
      <div>
        <DateTimePicker
          showTimeSelect={true}
          timeFormat={'HH:mm'}
          timeIntervals={60}
          dateFormat={'LLL'}
          selected={this.state.date}
          onChange={this.onDateChange}
          utcOffset={3}
        />
        <Button 
          content="add draw"
          onClick={this.onAddDraw}
        />
        { response !== '' ? 
          <div>{response}</div> : null }
      </div>
    );
  }
}