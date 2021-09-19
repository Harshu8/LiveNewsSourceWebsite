import React, {useEffect, useState} from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";


const News= (props)=> {
      const [articles, setArticles] = useState([])
      const [loading, setLoading] = useState(true)
      const [page, setPage] = useState(1)
      const [totalResult, setTotalResult] = useState(0)

    

    const capitalizerFirstLetter = (string) =>{
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  const updateNews= async()=>  {

        props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=fc8d2cfe05394f659af4af07bee806a8&page=${page}&pageSize=${props.pageSize}`;
        
        setLoading(true)
        let data = await fetch(url);
        props.setProgress(30);
        let parsedData = await data.json();
        props.setProgress(70);

        setArticles(parsedData.articles)
        setTotalResult(parsedData.totalResult)
        setLoading(false)

        props.setProgress(100);

  }

  useEffect(() => {
    document.title = `${capitalizerFirstLetter(props.category)} - NewsSource`;
    updateNews();
    //eslint-disable-next-line
  }, [])

    const fetchMoreData = async() => {
      
      const url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page+1}&pageSize=${props.pageSize}`;
      setPage(page + 1);
      let data = await fetch(url);
      let parsedData = await data.json();
      setArticles(articles.concat(parsedData.articles))
      setTotalResult(parsedData.totalResult)
     
    }; 
  


    return (
      <>
        <h1 className="text-center" style={{margin: '35px 0px', marginTop: '90px' }}>NewsSource - Top {capitalizerFirstLetter(props.category)} Headlines</h1>
        <p className="text-center">By- <strong> Harsh Upadhyay </strong> </p> 
        {loading && <Spinner/>}
        
        <InfiniteScroll
            dataLength={articles.length}
            next={fetchMoreData}
            hasMore={articles.length !== totalResult}
            loader={<Spinner/>}
        >
          <div className="container">
              <div className="row">
                {articles.map((element) => {
                  return <div className="col-md-4" key={element.url}>
                      <NewsItem title={element.title ? element.title : ""} source={!element.source.name?"":element.source.name} description={element.description ? element.description : ""} imageUrl={element.urlToImage} author={element.author} date={element.publishedAt} newsUrl={element.url}/>
                    </div>
                })}
              </div>
            </div>
        </InfiniteScroll>

        
      </>
    );
  
}


News.defaultProps = {
  country: 'in',
  pageSize: 8, 
  category: 'general',
}

News.propTypes = {
  country : PropTypes.string,
  pageSize : PropTypes.number,
  category : PropTypes.string,
}

export default News;
