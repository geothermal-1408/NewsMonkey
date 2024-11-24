import './App.css';
import React, { Component } from 'react';
import Navbar from './components/Navbar';
import News from './components/News';
import {
  //BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';
import About from './components/About';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isDarkMode: false,
      searchTerm: ''
    };
  }

  // Toggle dark mode
  handleThemeToggle = () => {
    this.setState(prevState => ({ isDarkMode: !prevState.isDarkMode }), () => {
      if (this.state.isDarkMode) {
        document.body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
      } else {
        document.body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
      }
    });
  };

  // Check localStorage for theme preference on component mount
  componentDidMount() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.setState({ isDarkMode: true });
      document.body.classList.add('dark-mode');
    }
  }

  handleSearch = (searchTerm) => {
    this.setState({ searchTerm });
  };

  render() {
    const { isDarkMode } = this.state;

    return (
      <div>
        <Navbar isDarkMode={isDarkMode} handleThemeToggle={this.handleThemeToggle} onSubmit={this.handleSearch}/>
        <div className={`${isDarkMode ? 'bg-dark text-light' : 'bg-light text-dark'}`}>
          <Routes>
            <Route path="/" element={< News  pageSize={8} country="us" category="general" isDarkMode={isDarkMode} searchTerm={this.state.searchTerm}/>} />
            <Route path="/about" element={<About />}/>
            <Route path="/business" element={<News  pageSize={8} country="us" category="business" isDarkMode={isDarkMode} searchTerm={this.state.searchTerm} />} />
            <Route path="/entertainment" element={<News  pageSize={8} country="us" category="entertainment" isDarkMode={isDarkMode} searchTerm={this.state.searchTerm} />} />
            <Route path="/general" element={<News  pageSize={8} country="us" category="general" isDarkMode={isDarkMode} searchTerm={this.state.searchTerm} />} />
            <Route path="/health" element={<News  pageSize={8} country="us" category="health" isDarkMode={isDarkMode} searchTerm={this.state.searchTerm} />} />
            <Route path="/science" element={<News pageSize={8} country="us" category="science" isDarkMode={isDarkMode} searchTerm={this.state.searchTerm} />} />
            <Route path="/sports" element={<News  pageSize={8} country="us" category="sports" isDarkMode={isDarkMode} searchTerm={this.state.searchTerm} />} />
            <Route path="/technology" element={<News  pageSize={8} country="us" category="technology" isDarkMode={isDarkMode} searchTerm={this.state.searchTerm} />} />
          </Routes>
        </div>
        </div>
    );
  }
}