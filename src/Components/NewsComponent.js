import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";

export class NewsComponent extends Component {
  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  static defaultProps = {
    pageSize: 5,
    country: 'in',
    category: 'general'
  }
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      load: false,
      page: 1,
    };
    document.title=`Newisify-${this.capitalizeFirstLetter(this.props.category)}`
  }
  async componentDidMount() {
    this.props.setprogress(10)
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1ca59d2e61d4593a634859ed2bca3d9&page=1&pageSize=${this.props.pageSize}`;
    this.setState({ load: true });
    let data = await fetch(url);
    this.props.setprogress(30)
    let parseddata = await data.json();
    this.setState({
      articles: parseddata.articles,
      totalResults: parseddata.totalResults,
      load: false,
    });
    this.props.setprogress(100)
  }
  handleNextClick = async () => {
    if (
      !(this.state.page + 1 >
        Math.ceil(this.state.totalResults / this.props.pageSize))
    ) {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1ca59d2e61d4593a634859ed2bca3d9&page=${this.state.page + 1
        }&pageSize=${this.props.pageSize}`;
      this.setState({ load: true });
      let data = await fetch(url);
      let parseddata = await data.json();
      this.setState({
        page: this.state.page + 1,
        articles: parseddata.articles,
        load: false,
      });
    }
  };
  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=c1ca59d2e61d4593a634859ed2bca3d9&page=${this.state.page - 1
      }&pageSize=${this.props.pageSize}`;
    this.setState({ load: true });
    let data = await fetch(url);
    let parseddata = await data.json();
    this.setState({
      page: this.state.page - 1,
      articles: parseddata.articles,
      load: false,
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center" style={{ margin: "30px 0px",marginTop:"70px" }}>Newsify-{this.capitalizeFirstLetter(this.props.category)} Top Headlines</h1>
        {this.state.load && <Spinner />}
        <div className="row">
          {!this.state.load && this.state.articles.map((element) => {
            return (
              <div className="col-md-4 my-2" key={element.url}>
                <NewsItem
                  source={element.source.name}
                  title={element.title}
                  desc={element.description}
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                  author={element.author}
                  date={element.publishedAt}
                ></NewsItem>
              </div>
            );
          })}
        </div>
        <div className="my-5">
          <div className="d-flex justify-content-between">
            <button
              type="button"
              disabled={this.state.page <= 1}
              onClick={this.handlePrevClick}
              className="btn btn-dark">&larr; Previous</button>
            <button
              type="button" disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
              onClick={this.handleNextClick}
              className="btn btn-dark"
            >
              Next &rarr;
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default NewsComponent;
