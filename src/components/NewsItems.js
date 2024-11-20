import React, { Component } from 'react';

export class NewsItems extends Component {
    render() {
        let { title, description, imageUrl, newsUrl, author, date, isDarkMode } = this.props;
        
        const cardClass = isDarkMode ? 'card bg-dark text-light' : 'card bg-light text-dark';

        return (
            <div className='my-3'>
                <div className={cardClass}>
                    <img src={imageUrl} className="card-img-top" alt="..." />
                    <div className="card-body">
                        <h5 className="card-title">{title}...</h5>
                        <p className="card-text">{description}...</p>
                        <p className="card-text">
                            <small className="text-muted">{`By ${author} on ${new Date(date).toGMTString()}`}</small>
                        </p>
                        <a href={newsUrl} target="_blank" rel="noreferrer" className="btn btn-sm btn-primary">Read More</a>
                    </div>
                </div>
            </div>
        );
    }
}

export default NewsItems;