'use strict';
import React from 'react';
import GemSearchBar from './GemSearchBar';
import { Grid, PageHeader, Navbar, Nav, NavItem, Panel } from 'react-bootstrap';

let GemSearchContainer = React.createClass({

    getInitialState: function() {
        return {
            searchResults: '',
            favoriteGems: []
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

    saveToFavorites(gemName) {
        console.log("saveToFavorites invoked!");
        let favoriteGems = this.loadExistingGems();
        favoriteGems.push(gemName);
        console.log(favoriteGems);
        this.setState({
           favoriteGems: favoriteGems
        });
        window.localStorage.setItem('gems', JSON.stringify(favoriteGems));
    },

    handleFavoritesClick(event) {
        let existingGems = this.loadExistingGems(),
            currentGemName = event.currentTarget.parentElement.innerText;

        if (existingGems && existingGems.includes(currentGemName)) {
            this.removeFromFavorites(existingGems, currentGemName)
        } else {
            this.saveToFavorites(currentGemName)
        }
    },

    loadExistingGems() {
        let existingGems = window.localStorage.getItem('gems');
        existingGems = existingGems ? JSON.parse(existingGems) : [];
        return existingGems
    },

    removeFromFavorites(existingGems, name) {
        console.log("removeFromFavorites invoked!");
        // remove this gem from existing gems
        if (existingGems.includes(name)) {
            let index = existingGems.indexOf(name);
            existingGems.splice(index, 1)
        }

        if (existingGems) {
            window.localStorage.clear();
            window.localStorage.setItem('gems', JSON.stringify(existingGems));
            this.setState({
                favoriteGems: existingGems
            });
            }
    },

    isGemInFavorites(currentGemName){
        let existingGems = this.loadExistingGems();
        console.log(existingGems.includes(currentGemName));
        return existingGems.includes(currentGemName)
    },

    generateStarIcon(gemName){
        let starIconType = this.isGemInFavorites(gemName) ? "fa fa-star fa-lg" : "fa fa-star-o fa-lg";
        return (
            <i className={starIconType}
               aria-hidden="true"
               onClick={this.handleFavoritesClick}></i>
        )
    },

    listItemHelper() {
        let listItems = [];
        let dependencyGems = this.state.searchResults.dependencies.development;

        if (dependencyGems.length === 0) {
            return "None"
        }

        this.state.searchResults.dependencies.development.map((dep) => {
            let starIcon = this.generateStarIcon(dep.name);
            listItems.push(
                <div className="dependency-list">
                    <a
                    href={"https://rubygems.org/gems/" + dep.name }
                    key={dep.name}
                    target="_blank">{dep.name}</a>
                    {starIcon}
                </div>
            )
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
        <Nav>
            <NavItem eventKey={1} href="#">Favorites</NavItem>
        </Nav>
      </Navbar>
      ),

      panelInstance = (
          <div>
              <Panel header="Found Gem" >
                  <a href={"https://rubygems.org/gems/" + this.state.searchResults.name}> {this.state.searchResults.name}</a>
                  {this.generateStarIcon(this.state.searchResults.name)}
              </Panel>
              <Panel header="Info" >{this.state.searchResults.info}</Panel>
              <Panel header="Dependencies" >
                  {this.state.searchResults ? this.listItemHelper() : null }
              </Panel>
          </div>
      )
      ;


    return (
      <div>
          { navbar }
          <PageHeader>Gem Search</PageHeader>

      <Grid
        fluid={true}>
          {gemSearchBar}
      </Grid>
          {this.state.searchResults ? panelInstance : null}
      </div>
    )
    }

});

export default GemSearchContainer;
