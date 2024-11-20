import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Navbar extends Component {
    state = {
        searchTerm: '',
    };

    handleInputChange = (e) => {
        //console.log(e.target.value);
        this.setState({ searchTerm: e.target.value });

    };

    handleSearch = (e) => {
        e.preventDefault();

        const { searchTerm } = this.state;
        if (searchTerm.trim()) {
            //console.log(searchTerm);

            this.props.onSubmit(searchTerm); // Call the parent's search function
        }
    };
    handleCategoryClick = () => {
        this.setState({ searchTerm: '' });
        this.props(this.state.searchTerm);
    }

    render() {
        const { isDarkMode, handleThemeToggle } = this.props;

        return (
            <nav
                className={`navbar fixed-top navbar-expand-lg ${isDarkMode ? 'navbar-dark bg-dark' : 'navbar-light bg-light'
                    }`}
            >
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                        News Monkey
                    </Link>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav mb-5 mb-lg-0">
                            <li className="nav-item">
                                <Link className="nav-link active" aria-current="page" to="/" onClick={this.handleCategoryClick}>
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/about">About</Link>
                            </li>
                            <li className="nav-item dropdown">
                                <Link
                                    className="nav-link dropdown-toggle"
                                    to="#"
                                    role="button"
                                    data-bs-toggle="dropdown"
                                    aria-expanded="false"
                                >
                                    Categories
                                </Link>
                                <ul className="dropdown-menu">
                                    <li>
                                        <Link className="dropdown-item" to="/business" onClick={this.handleCategoryClick}>
                                            Business
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/entertainment" onClick={this.handleCategoryClick}>
                                            Entertainment
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/general" onClick={this.handleCategoryClick}>
                                            General
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/health" onClick={this.handleCategoryClick}>
                                            Health
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/science" onClick={this.handleCategoryClick}>
                                            Science
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/sports" onClick={this.handleCategoryClick}>
                                            Sports
                                        </Link>
                                    </li>
                                    <li>
                                        <Link className="dropdown-item" to="/technology" onClick={this.handleCategoryClick}>
                                            Technology
                                        </Link>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        <form className="d-flex ms-3" role="search" onSubmit={this.handleSearch}>
                            <input
                                className="form-control me-2"
                                type="text"
                                placeholder="Search"
                                aria-label="Search"
                                value={this.state.searchTerm}
                                onChange={this.handleInputChange}
                            />
                            <button className="btn btn-outline-success" type="submit">
                                Search
                            </button>
                        </form>
                        <div className="form-check form-switch ms-auto">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                role="switch"
                                id="flexSwitchCheckDefault"
                                checked={isDarkMode}
                                onChange={handleThemeToggle}
                            />
                            <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
                                {isDarkMode ? 'Disable Dark Mode' : 'Enable Dark Mode'}
                            </label>
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navbar;