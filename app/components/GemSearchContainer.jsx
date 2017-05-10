'use strict';
import React from 'react';
import GemSearchBar from './GemSearchBar';
import OCRContainer from './OCRContainer';
import { Grid, Row, Col, Alert, Jumbotron, Navbar } from 'react-bootstrap';

let LasikContainer = React.createClass({

    getInitialState: function() {
        return {
            searchResults: ''
            }
    },

    handleAlertType: function (value) {
        this.setState({
            alertType: value
        })
    },

    onApiSuccess(response) {
        this.setState({
            searchResults: JSON.parse(response.text)
        });

        console.log("onApiSuccess!!");
        console.log(this.state);
    },

    render: function() {
      let alertStyle = "",
          alertText  = "";

      switch (this.state.alertType) {
          case "success":
              alertStyle = "success";
              alertText  = "File has been uploaded successfully!";
              break;
          case "failure":
              alertStyle = "danger";
              alertText  = "We were unable to perform OCR on the uploaded file. Please try another.";
              break;
      }

      let alertInstance = (
            <Alert
              bsStyle={alertStyle}>
                {alertText}
            </Alert>
          ),

          gemSearchBar = (
            <GemSearchBar
                onApiSuccess={this.onApiSuccess}
              // onDrop={this.onDrop}
              // uploadedFile={this.state.file}
              // apiVersion={API_VERSION}
              // storeImageRoute={STORE_IMAGE_ROUTE}
            />
          ),

          // ocrContainer = (
          //   <OCRContainer
          //       uploadedFile={this.state.file}
          //       apiVersion={API_VERSION}
          //       processImageRoute={PROCESS_IMAGE_ROUTE}
          //       handleAlertType={ this.handleAlertType }
          //   />
          // ),

          navbar = (
          <Navbar>
            <Navbar.Header>
                <Navbar.Brand>
                    Teachable Gem Search
                </Navbar.Brand>
            </Navbar.Header>
          </Navbar>
      ),

          jumbotron = (
            <Jumbotron>
              <h2>Gem Search</h2>
            </Jumbotron>
      ),
          uploadAlert = (
            <span>
              {this.state.file ? alertInstance : null}
            </span>
      );

    return (
      <div>
          { navbar }
          { jumbotron }

      <Grid
        fluid={true}>
          {gemSearchBar}
      </Grid>
          <p>{this.state.searchResults.name}</p>
          <p>{this.state.searchResults.info}</p>
      </div>
    )
    }

});

export default LasikContainer;
