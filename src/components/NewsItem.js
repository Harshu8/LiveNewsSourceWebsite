import React from 'react'

const NewsItem = (props)=> {

    
        let {title, source, description, imageUrl, newsUrl, author, date} = props;
        return (
            <div className="my-3">
                <div  className="card">
                    <div style={ {display:'flex', 
                    justifyContent: 'flex-end', 
                    position: 'absolute', 
                    right:'0' }
                    }>
                         <span className="badge rounded-pill bg-danger" style={{left:'90%',zIndex:'1'}}>{source}</span>
                    </div>
                    <img src={!imageUrl?"https://tinyurl.com/wyjjbjkm":imageUrl}  className="card-img-top" alt="..."/>
                    {/* //This url ( https://tinyurl.com/wyjjbjkm ) is run when the image url is null */}
                    <div  className="card-body">
                        <h5  className="card-title">{title}</h5><span className="badge rounded-pill bg-success">{source}</span>
                        <p  className="card-text">{description}</p>
                        <p className="card-text">By {!author ? "unknown":author} on {new Date(date).toGMTString()}</p>
                        
                        <a rel="noreferrer" href={newsUrl} target="_blank"  className="btn btn-sm btn-dark">Read More</a>
                    </div>
                </div>
            </div>
        ) 
}

export default NewsItem
