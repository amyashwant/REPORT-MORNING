import React, { useEffect, useState } from "react";
import NewsItems from "./NewsItems";
import Spinner from "./Spinner";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {
  const capitalize = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const capitalizeOne = (string) => {
    return string.toUpperCase();
  };

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, settotalResults] = useState(0);

  document.title = `${capitalize(props.category)}-Newsmonkey`;

  const updateNews = async () => {
    console.log(props.apiKey);
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true);
    props.setProgress(10);
    let data = await fetch(url);
    let parseddata = await data.json();
    props.setProgress(50);
    setArticles(parseddata.articles);
    setLoading(false);
    settotalResults(parseddata.totalResults);

    props.setProgress(100);
  };

  useEffect(() => {
    updateNews();
  }, []);

  // handlenextbutton = async () => {
  //   this.setState({
  //     page: this.state.page + 1,
  //   });
  //   this.updateNews();
  // };

  // handleprevbutton = async () => {
  //   this.setState({
  //     page: this.state.page - 1,
  //   });
  //   this.updateNews();
  // };

  const fetchMoreData = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      props.country
    }&category=${props.category}&apiKey=${props.apiKey}&page=${
      page + 1
    }&pageSize=${props.pageSize}`;
    setPage(page + 1);
    setLoading(true);
    let data = await fetch(url);
    let parseddata = await data.json();
    setArticles(articles.concat(parseddata.articles));
    setLoading(false);
    settotalResults(parseddata.totalResults);
  };

  return (
    <>
      <h1 className="text-center" style={{ marginTop: "90px" }}>
        NEWS MONKEY-TOP {capitalizeOne(props.category)} HEADLINES{" "}
      </h1>
      {/* <div className="container"> */}
      <div className="text-center">{loading && <Spinner />}</div>

      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={
          <div className="text-center">
            {" "}
            <Spinner />{" "}
          </div>
        }
      >
        <div className="container">
          <div className="row">
            {articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItems
                    title={element.title ? element.title : ""}
                    description={element.description}
                    imageurl={element.urlToImage}
                    newsurl={element.url}
                    author={
                      element.author ? "By" + element.author : "By Unknown"
                    }
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </InfiniteScroll>
      {/* <div className="d-flex justify-content-between">
          <button
            type="button"
            disabled={this.state.page <= 1}
            className="btn btn-secondary "
            onClick={this.handleprevbutton}
          >
            previous
          </button>
          <button
            type="button"
            disabled={
              this.state.page + 1 >
              Math.ceil(this.state.totalarticles / props.pageSize)
            }
            className="btn btn-secondary"
            onClick={this.handlenextbutton}
          >
            next
          </button>
        </div> */}
    </>
  );
};

News.propTypes = {
  country: PropTypes.string.isRequired,
  pageSize: PropTypes.number.isRequired,
  category: PropTypes.string.isRequired,
};

News.defaultProps = {
  country: "in",
  pageSize: 8,
  category: "general",
};

export default News;
