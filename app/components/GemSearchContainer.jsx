'use strict';
import React from 'react';
import GemSearchBar from './GemSearchBar';
import { Grid, PageHeader, Navbar, Nav, NavItem, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom'

let GemSearchContainer = React.createClass({

    getInitialState: function() {
        return {
            searchResults: '',
            favoriteGems: []
            }
    },

    onApiSuccess(response) {
        this.setState({
            searchResults: JSON.parse(response.text)
        });
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
        <Nav>
            <NavItem eventKey={1} ><Link to='/favorites' className="nav-link">Favorites</Link></NavItem>
        </Nav>
      </Navbar>
      ),

      resultsPanel = (
          <div>
              <Panel header="Found Gem" >
                  <a
                      href={"https://rubygems.org/gems/" + this.state.searchResults.name}
                      target="_blank"> {this.state.searchResults.name}</a>
                  {this.props.generateStarIcon(this.state.searchResults.name)}
              </Panel>
              <Panel header="Info" >{this.state.searchResults.info}</Panel>
              <Panel header="Dependencies" >
                  {this.state.searchResults ? this.props.panelResultsHelper(this.state.searchResults.dependencies.development) : null }
              </Panel>
          </div>
      );

    return (
      <div>
          {navbar}
          <PageHeader>Gem Search</PageHeader>

      <Grid
        fluid={true}>
          {gemSearchBar}
      </Grid>
          {this.state.searchResults ? resultsPanel : null}
      </div>
    )
    }

});

export default GemSearchContainer;
