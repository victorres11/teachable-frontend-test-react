import React from 'react';
import request from 'superagent';
import { Form, FormGroup, FormControl, Button, HelpBlock } from 'react-bootstrap';

const GemSearchBar = React.createClass({

    getInitialState: function() {
        return {
            searchBarContents: '',
            searchResults: '',
            validationState: null,
            validationErrorMessage: null,
        }
    },

    onSuccess(response) {
      this.props.onApiSuccess(response);
        this.setState({
            validationState: "",
            validationErrorMessage: ""
        })
    },

    onFailure() {
        this.setState({
            validationState: "error",
            validationErrorMessage: "Uh oh! Looks like your gem wasn't found. \nPlease check your spelling and try again."
        })
    },

    handleButtonClick: function() {
        /***
         * On button click we'll submit the gem search api request (routed through our own backend to deal with CORS issues)
         */
        request.get('/gem_search?gem_to_search=' + this.state.searchBarContents)
            .then(this.onSuccess, this.onFailure)
    },

    handleOnChange: function(ev) {
        this.setState({
                searchBarContents: ev.target.value
            }
        )
    },

    handleOnSubmit(ev){
        ev.preventDefault();
        this.handleButtonClick()
    },

    render: function () {


    const formInstance = (
            <Form inline onSubmit={(ev) => this.handleOnSubmit(ev)}>
              <FormGroup
                  bsSize="large"
                  controlId="formInlineSearch"
                  validationState={this.state.validationState ? this.state.validationState : null }
                  onSubmit={() => console.log('hi')}
              >
                <FormControl
                    type="text"
                    placeholder="Search Ruby Gems"
                    onChange={this.handleOnChange}
                    onSubmit={this.handleButtonClick}
                />
                 <HelpBlock>{this.state.validationErrorMessage}</HelpBlock>
              </FormGroup>

               <Button
                   id={this.state.validationState ? 'error-search-button'  : 'search-button'}
                   bsStyle="primary"
                   onClick={this.handleButtonClick}>
                   Submit
               </Button>
            </Form>
    );

      return (
          <div className="search-bar">
              {formInstance}
          </div>
      );
    }
});

export default GemSearchBar;
