import React from 'react';
import './Business.css';

export class Business extends React.Component {
  render() {
    let categoryArray = this.props.business.category;
    let categories = categoryArray.map(function (category, i) {
      return <h3 key={i}>{category.title}</h3>;
    });
    return (
      <div className="Business">
        <div className="image-container">
          <a href={this.props.business.url} target="_blank" rel="noopener noreferrer"><img src={this.props.business.imageSrc} alt=''/></a>
        </div>
        <h2>{this.props.business.name}</h2>
        <div className="Business-information">
          <div className="Business-address">
            <a href={"https://maps.google.com/?q="+this.props.business.coordinates.latitude +','+this.props.business.coordinates.longitude}
               target="_blank"
               rel="noopener noreferrer">
              <p>{this.props.business.address}</p>
              <p>{this.props.business.city}</p>
              <p>{this.props.business.state} {this.props.business.zipCode}</p>
            </a>
          </div>
          <div className="Business-reviews">
            {categories}
            <h3 className="rating">{this.props.business.rating} stars</h3>
            <p>{this.props.business.reviewCount} reviews</p>
          </div>
        </div>
      </div>
    );
  }
}
