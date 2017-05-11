import React from 'react';
import { Grid, PageHeader, Navbar, Nav, NavItem, Panel } from 'react-bootstrap';
import { Link } from 'react-router-dom'

const GemFavoritesContainer = React.createClass({

    render: function() {

        let favoritesPanel = (
            <div>
                <Panel header="Favorite Gems" >
                    { this.props.panelResultsHelper(this.props.loadFavoriteGems(), true)}
                </Panel>
            </div>
        ),

        navbar = (
            <Navbar>
                <Navbar.Header>
                    <Navbar.Brand>
                        Teachable Gem Search
                    </Navbar.Brand>
                </Navbar.Header>
                <Nav>
                    <NavItem eventKey={1} ><Link to='/' className="nav-link">Search Gems</Link></NavItem>
                </Nav>
            </Navbar>
        );

        return (
            <div>
                {navbar}
                <PageHeader>Gem Favorites</PageHeader>
                {favoritesPanel}
            </div>
        )
    }
});


export default GemFavoritesContainer;