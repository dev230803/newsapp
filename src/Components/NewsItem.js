import React, { Component } from 'react'

export class NewsItem extends Component {
  render() {
    let {title,desc,imageUrl,newsUrl,author,date,source}=this.props;
    return (
      <div>
       
            <div className="card" >
            <div>
            <span className="badge rounded-pill bg-danger" style={{display:'flex',justifyContent:'flex-end',position:'absolute',right:'0'}}>{source}</span>
          </div>
            
            <img src={!imageUrl?"https://e3.365dm.com/23/08/768x432/skynews-breaking-breaking-news_6264872.jpg?20240118114847":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
            <h5 className="card-title">{title}</h5>
            <p className="card-text">{desc}</p>
            <p>By {!author?"Unknown":author} on {new Date(date).toGMTString()}</p>
            <a rel="noreferrer" href={newsUrl} target='_blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
            </div>
      </div>
    )
  }
}

export default NewsItem
