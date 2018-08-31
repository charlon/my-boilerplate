import * as React from 'react';
import {
  Card, CardText, CardBody,
  CardTitle
} from 'reactstrap';

export interface Props {
  compiler: string;
  framework: string;
}

interface State {
  loading: boolean;
  events : [];
}

class AcademicCalendar extends React.Component<Props, State> {

  constructor(props: Props) {
    super(props);
    this.state = {
      loading: true,
      events: []
    };
  }

  public componentDidMount() {

    fetch('/calendar.json')
    .then(results => {
        return results.json();
      }).then(data => {
        console.log(this.state.loading);
        this.setState({ events: data });
        console.log(this.state.events);
      });
  }

  public render() {

    return (
      <div>
        <Card className="shadow-sm">
          <CardBody>
            <CardTitle>Academic Calender</CardTitle>
            <CardText>Hello from {this.props.compiler} and {this.props.framework}!</CardText>
          </CardBody>
        </Card>
      </div>
    );

  }

}

export default AcademicCalendar;
