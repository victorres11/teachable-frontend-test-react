'use strict';
import React from 'react';
import GemSearchBar from './GemSearchBar';
import { Grid, PageHeader, Navbar, ListGroup, ListGroupItem } from 'react-bootstrap';

let GemSearchContainer = React.createClass({

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
    },

    listItemHelper() {
        let listItems = [];
        this.state.searchResults.dependencies.development.map(function(dep) {
            listItems.push(<ListGroupItem
                href={"https://rubygems.org/gems/" + dep.name }
                key={dep.name}
                target="_blank">{dep.name}</ListGroupItem>)
        });
        return listItems
    },

    render: function() {

      let gemSearchBar = (
            <GemSearchBar
                onApiSuccess={this.onApiSuccess}
            />
          ),

      navbar = (
      <Navbar>
        <Navbar.Header>
            <Navbar.Brand>
                Teachable Gem Search
            </Navbar.Brand>
        </Navbar.Header>
      </Navbar>
      ),

      listgroupInstance = (
        <ListGroup>
            <ListGroupItem header="Found Gem" href={"https://rubygems.org/gems/" + this.state.searchResults.name}>{this.state.searchResults.name}</ListGroupItem>
            <ListGroupItem header="Info" >{this.state.searchResults.info}</ListGroupItem>
            <ListGroupItem header="Dependencies" className="dependencies-list"></ListGroupItem>
            {this.state.searchResults ? this.listItemHelper() : null}
        </ListGroup>
      );


    return (
      <div>
          { navbar }
          <PageHeader>Gem Search</PageHeader>

      <Grid
        fluid={true}>
          {gemSearchBar}
      </Grid>
          {this.state.searchResults ? listgroupInstance : null}
      </div>
    )
    }

});

export default GemSearchContainer;
