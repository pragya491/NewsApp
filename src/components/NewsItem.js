import React, { Component } from 'react'

export class NewsItem extends Component {
  
  render() {
    let { title, description, imageUrl, newsUrl, author, date, source } = this.props;
    
    return (
      <div className="my-3">
        <div className="card" style={{width: "18rem"}}>
        <div style={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        position: 'absolute',
                        right: '0'
                    }
                    }>

                    
        <span class="position-absolute top-0 translate-middle badge rounded-pill bg-danger" style={{left: '90%', zIndex: '1'}}> {source}
        </span>
        </div>
        <img src={! imageUrl?"https://static.vecteezy.com/system/resources/previews/022/845/864/original/breaking-news-icon-design-free-vector.jpg":imageUrl} className="card-img-top" alt="..."/>
        <div className="card-body">
        <h5 className="card-title">{title}...</h5>
        <p className="card-text">{description}...</p>
        <p className="card-text"><small className="text-muted">By {!author ? "Unknown" : author} on  {new Date(date).toGMTString()}</small></p>
        <a href={newsUrl} target='_blank' rel="noreferrer" className="btn btn-sm btn-dark">Read More</a>
        </div>
        </div>
        
      </div>
    )
  }
}

export default NewsItem
