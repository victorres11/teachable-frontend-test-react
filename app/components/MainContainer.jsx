'use strict';
import React from 'react';
import GemSearchContainer from './GemSearchContainer';
import GemFavoritesContainer from './GemFavoritesContainer'

const MainContainer = React.createClass({

    getInitialState: function() {
        return {
            favoriteGems: []
        }
    },

    propTypes: {
        favorites: React.PropTypes.string.isRequired
    },

    saveToFavorites(gemName) {
        let favoriteGems = this.loadFavoriteGems();
        favoriteGems.push(gemName);
        this.setState({
            favoriteGems: favoriteGems
        });
        window.localStorage.setItem('gems', JSON.stringify(favoriteGems));
    },

    handleFavoritesClick(event) {
        let existingGems = this.loadFavoriteGems(),
            currentGemName = event.currentTarget.parentElement.innerText;

        if (existingGems && existingGems.includes(currentGemName)) {
            this.removeFromFavorites(existingGems, currentGemName)
        } else {
            this.saveToFavorites(currentGemName)
        }
    },

    loadFavoriteGems() {
        let existingGems = window.localStorage.getItem('gems');
        existingGems = existingGems ? JSON.parse(existingGems) : [];
        return existingGems
    },

    generateStarIcon(gemName){
        let starIconType = this.isGemInFavorites(gemName) ? "fa fa-star fa-lg" : "fa fa-star-o fa-lg";
        return (
            <i className={starIconType}
               aria-hidden="true"
               onClick={this.handleFavoritesClick}></i>
        )
    },

    panelResultsHelper(gems, favorites=false) {
        let listItems = [];

        if (gems.length === 0) {
            return "None"
        }

        gems.map((gem) => {
            let name = favorites ? gem : gem.name ;

            let starIcon = this.generateStarIcon(name);
            listItems.push(
                <div className="dependency-list" key={name}>
                    <a
                        href={"https://rubygems.org/gems/" + name }
                        key={name}
                        target="_blank">{name}</a>
                    {starIcon}
                </div>
            )
        });
        return listItems
    },

    removeFromFavorites(existingGems, name) {
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
        let existingGems = this.loadFavoriteGems();
        return existingGems.includes(currentGemName)
    },

    render: function() {
        if (this.props.favorites === 'false') {
            var output = (
                <div>
                    <GemSearchContainer
                        saveToFavorites={this.saveToFavorites}
                        removeFromFavorites={this.removeFromFavorites}
                        panelResultsHelper={this.panelResultsHelper}
                        handleFavoritesClick={this.handleFavoritesClick}
                        generateStarIcon={this.generateStarIcon}
                    />
                </div>
            );
        } else {
            var output = (
            <div>
                <GemFavoritesContainer
                    removeFromFavorites={this.removeFromFavorites}
                    panelResultsHelper={this.panelResultsHelper}
                    handleFavoritesClick={this.handleFavoritesClick}
                    generateStarIcon={this.generateStarIcon}
                    loadFavoriteGems={this.loadFavoriteGems}
                />
            </div>
            )
        }

        return (
            <div>
                {output}
            </div>

        )
    }

});

export default MainContainer