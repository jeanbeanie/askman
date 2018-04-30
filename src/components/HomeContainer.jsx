/* src/components/HomeContainer.jsx */
/* @flow */

import React from 'react';

class HomeContainer extends React.Component <{}, {}> {
  constructor(props: {}) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.loadInitialData();
  }

  loadInitialData() {
    const promises = [];
    promises.push(this.props.loadInitialData());
    Promise.all(promises).then((data) => {
      this.setState(data[0]);
    }).catch(err => console.log('Error loading data in HomeContainer', err));
  }

  handleSubmit = (event) => {
    alert('Form submitted');
    event.preventDefault();
  }

  render() {
    return (
      <div className="text-center">
        <h1 id="headline"><span className="badge-pill title-badge">AskManager</span></h1>
        <strong id="subheadline">Set It and Forget It Asking Via SMS!</strong>
        <hr />
        <form onSubmit={this.handleSubmit}>
          <div className="row">
            <div className="col-sm form-group">
              <label>
              Task
                <input className="form-control" type="text" defaultValue="take out the trash" />
              </label>
            </div>
            {
              true ?
                (
                  <div className="col-sm form-group">
                    <label>
              Weekdays
                      <div className="col-sm form-check form-check-inline input">
                        <label>
              S <input className="form-check-input" type="checkbox" />
                        </label>
                        <label>
              M <input className="form-check-input" type="checkbox" />
                        </label>
                        <label>
              T <input className="form-check-input" type="checkbox" />
                        </label>
                        <label>
              W <input className="form-check-input" type="checkbox" />
                        </label>
                        <label>
              T <input className="form-check-input" type="checkbox" />
                        </label>
                        <label>
              F <input className="form-check-input" type="checkbox" />
                        </label>
                        <label>
              S <input className="form-check-input" type="checkbox" />
                        </label>
                      </div>
                    </label>
                  </div>
                )
                :
                (
                  <div className="col-sm form-group">
                    <label>
              Due Date
                      <input className="form-control" type="date" />
                    </label>
                  </div>
                )
            }
            <div className="col-sm form-group">
              <label>
              Due Time
                <input className="form-control" type="time" />
              </label>
            </div>

          </div>
          <div className="row">

            <div className="col-sm form-group">
              <label>
              Intros
                <input className="form-control" defaultValue="don't forget to, oh yea can you, I need a favor can you " type="text" />
              </label>
            </div>
          </div>
          <div className="row">

            <div className="col-sm form-group">
              <label>
              Endings
                <input className="form-control" defaultValue="thank you, thx so much, thanks, I appreciate it" type="text" />
              </label>
            </div>


          </div>

          <div className="row">
            <div className="col-sm form-group">
              <label>
              Phone Number (10 Digit)
                <input className="form-control" defaultValue="15555555555" type="tel" size="10" />
              </label>
            </div>
            <div className="col-sm form-group">
              <label>
              Names
                <input className="form-control" defaultValue="babe, baby, bae, boo, love" type="text" />
              </label>
            </div>

          </div>
          <input type="submit" className="btn" value="SUBMIT ASK" />
        </form>
      </div>
    );
  }
}
export default HomeContainer;
