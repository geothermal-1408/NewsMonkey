import React, { Component } from 'react';
import NewsItems from './NewsItems';
import Spinner from './spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

export default class News extends Component {
  static defaultProps = {
    country: 'us',
    pageSize: 8,
    category: 'general',
  };

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
    //searchTerm: PropTypes.string

  };

  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      loading: false,
      page: 1,
      searchTerm: props.searchTerm || '',
      totalResults: 0,
      error: null, // New error state
    };
  }

  async fetchNewsData(page, searchTerm = '') {
    console.log(process.env.REACT_APP_NEWSORG_API_KEY);
    
    try {
      const { country, category, pageSize } = this.props;
      let url = searchTerm
        ? `https://newsapi.org/v2/everything?q=${searchTerm}&apikey=${process.env.REACT_APP_NEWSORG_API_KEY}&page=${page}&pageSize=${pageSize}`
        : `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&apikey=${process.env.REACT_APP_NEWSORG_API_KEY}&page=${page}&pageSize=${pageSize}`;

      this.setState({ loading: true });
      let data = await fetch(url);
      

      if (data.status === 429) {
        throw new Error('Rate limit exceeded. Please wait and try again.');
      }
      if (!data.ok) {
        throw new Error(`Failed to fetch news: ${data.statusText}`);
      }

      let parsedData = await data.json();
      this.setState({
        articles: parsedData.articles || [],
        totalResults: parsedData.totalResults || 0,
        loading: false,
        page: this.state.page + 1, 
        error: null, // Reset error state
      });
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false, error: error.message }); // Update error state
    }
  }

  componentDidMount() {
    this.fetchNewsData(1, this.state.searchTerm);
  }

  componentDidUpdate(prevProps) {
    // Check if the searchTerm prop has changed
    if (prevProps.searchTerm !== this.props.searchTerm) {
      this.fetchNewsData(1, this.props.searchTerm); // Fetch new data if the search term changes
    }
  }

  // Handle search function
  handleSearch = (searchTerm) => {
    this.setState({ searchTerm }, () => {
      this.fetchNewsData(1, searchTerm);
    });
  };

  handlePreviousButton = () => {
    const { page } = this.state;
    if (page > 1) {
      this.fetchNewsData(page - 1);
      this.setState({ page: page - 1 });
    }
  };

  handleNextButton = () => {
    const { page, totalResults } = this.state;
    const { pageSize } = this.props;
    if (page < Math.ceil(totalResults / pageSize)) {
      this.fetchNewsData(page + 1);
      this.setState({ page: page + 1 });
    }
  };
  fetchMoreData = async () => {
    try {
      const nextPage = this.state.page + 1; // Calculate the next page number
      let url = this.props.searchTerm
        ? `https://newsapi.org/v2/everything?q=${this.props.searchTerm}&apikey=${process.env.REACT_APP_NEWSORG_API_KEY}&page=${nextPage}&pageSize=${this.props.pageSize}`
        : `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apikey=${process.env.REACT_APP_NEWSORG_API_KEY}&page=${nextPage}&pageSize=${this.props.pageSize}`;
  
      let data = await fetch(url);
  
      if (data.status === 429) {
        throw new Error('Rate limit exceeded. Please wait and try again.');
      }
      if (!data.ok) {
        throw new Error(`Failed to fetch news: ${data.statusText}`);
      }
  
      let parsedData = await data.json();
  
      // Append new articles to existing ones
      this.setState((prevState) => ({
        articles: prevState.articles.concat(parsedData.articles || []),
        totalResults: parsedData.totalResults || 0,
        page: nextPage, // Update page after successful fetch
        error: null,
      }));
    } catch (error) {
      console.error('Error fetching news:', error);
      this.setState({ loading: false, error: error.message });
    }
  };
  
  render() {
    const { articles, loading, error, page } = this.state;

    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: '3.1rem', paddingTop: '2rem'}}>
          NewsMonkey -
          {this.props.searchTerm
            ? `Search Results for ${this.props.searchTerm}`
            : `Top Headlines for ${this.props.category}`}
        </h1>

        {/* Show spinner only during initial loading */}
        {loading && page === 1 && <Spinner />}

        {/* Error handling UI */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Infinite Scroll */}
        {!loading && !error && (
          <InfiniteScroll
            dataLength={this.state.articles.length}
            next={this.fetchMoreData}
            hasMore={this.state.articles.length < this.state.totalResults}
            loader={<Spinner />} // Spinner for when loading more data on scroll
          >
            <div className="row">
              {articles.length === 0 ? (
                <p>No articles available.</p>
              ) : (
                articles.map((element) => (
                  <div className="col-md-3" key={element.url}>
                    <NewsItems
                      title={
                        element.title ? element.title.slice(0, 48) : 'No Title'
                      }
                      description={
                        element.description
                          ? element.description.slice(0, 120)
                          : 'No Description'
                      }
                      imageUrl={
                        element.urlToImage
                          ? element.urlToImage
                          : 'https://www.freeiconspng.com/thumbs/no-image-icon/no-image-icon-6.png'
                      }
                      newsUrl={element.url}
                      author={element.author ? element.author : 'Unknown'}
                      date={element.publishedAt}
                    />
                  </div>
                ))
              )}
            </div>
          </InfiniteScroll>
        )}
      </div>
    );
  }
}