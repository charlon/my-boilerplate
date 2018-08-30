import * as React from 'react';
import * as ReactDOM from 'react-dom';

import ExampleCard from './ExampleCard';
import AcademicCalendar from './AcademicCalendar';
import ButtonCounter from './ButtonCounter';

import './home.scss';

const root = document.getElementById('home');

class Home extends React.Component<any, any> {

    constructor(props: any){
        super(props);
    }

    public render() {
        return (
          <div>

            <div className="myuw-ticker">
              <div className="myuw-ticker-left">
                <div className="myuw-ticker-card">
                  <a href="#"><i className="far fa-grimace"></i> make a <span>tickker component</span></a>
                </div>
              </div>
              <div className="myuw-ticker-right">
                <div className="myuw-ticker-card">
                  <a href="#">make a <span>component</span></a>
                </div>
                <div className="myuw-ticker-card">
                  <a href="#">make a <span>component</span></a>
                </div>
                <div className="myuw-ticker-card">
                  <a href="#">make a <span>component</span></a>
                </div>
                <div className="myuw-ticker-card">
                  <a href="#">make a <span>component</span></a>
                </div>
              </div>
            </div>

            <div className="myuw-home">
              <ExampleCard />
              <ButtonCounter cardTitle="Button Counter" cardSubTitle="This is subtitle text!" />
              <ExampleCard />
              <AcademicCalendar />
            </div>

          </div>
        );
    }
}

ReactDOM.render(<Home />, root);