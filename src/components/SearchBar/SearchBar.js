import React from 'react';
import PlacesAutocomplete from 'react-places-autocomplete';
import './SearchBar.css';

const sortByOptions = {
  "Best Match": "best_match",
  "Highest Rated": "rating",
  "Most Reviewed": "review_count",
};

export class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      term: '',
      location: '',
      sortBy: 'best_match'
    };
    this.handleTermChange = this.handleTermChange.bind(this);
    this.handleLocationChange = this.handleLocationChange.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
  }

  getSortByClass(sortByOption) {
    if (this.state.sortBy === sortByOption) {
      return 'active';
    } else {
      return '';
    }
  }

  handleSortByChange(sortByOption) {
    this.setState({
      sortBy: sortByOption
    });
    if(this.state.term !== '' && this.state.location !== '') {
      this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
    }
  }

  handleTermChange(event) {
    this.setState({
      term: event.target.value
    });
  }

  handleSelect = address => {
    this.setState({location: address});
  };

  handleLocationChange(location) {
    this.setState({location});
  }

  handleSearch(event) {
    event.preventDefault();
    this.props.searchYelp(this.state.term, this.state.location, this.state.sortBy);
  }

  renderSortByOptions() {
    return Object.keys(sortByOptions).map(sortByOption => {
      let sortByOptionValue = sortByOptions[sortByOption];
      return <li onClick={this.handleSortByChange.bind(this, sortByOptionValue)}
                 className={this.getSortByClass(sortByOptionValue)} key={sortByOptionValue}>{sortByOption}</li>
    });
  }

  render() {
    return (
      <form onSubmit={this.handleSearch.bind(null)} className="SearchBar">
        <div className="SearchBar-sort-options">
          <ul>
            {this.renderSortByOptions()}
          </ul>
        </div>
        <div className="SearchBar-fields">
          <input onChange={this.handleTermChange} placeholder="Search Businesses"/>
          <PlacesAutocomplete
            value={this.state.location}
            onChange={this.handleLocationChange}
            onSelect={this.handleSelect}
          >
            {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
              <div className="location-search">
                <input
                  {...getInputProps({
                    placeholder: 'Search Places',
                    className: 'location-search-input',
                  })}
                />
                <div className="autocomplete-dropdown-container">
                  {suggestions.map(suggestion => {
                    const className = suggestion.active
                      ? 'suggestion-item--active'
                      : 'suggestion-item';
                    // inline style for demonstration purpose
                    const style = suggestion.active
                      ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                      : { backgroundColor: '#ffffff', cursor: 'pointer' };
                    return (
                      <div
                        {...getSuggestionItemProps(suggestion, {
                          className,
                          style,
                        })}
                      >
                        <span>{suggestion.description}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}
          </PlacesAutocomplete>
          {/*<input onChange={this.handleLocationChange} placeholder="Where?"/>*/}
        </div>
        <div className="SearchBar-submit">
          <button type="submit">Let's Go</button>
        </div>
      </form>
    );
  }
}
