
import React, { Component } from 'react';
import NewsItem from './NewsItem';
import Spinner from './Spinner';
import PropTypes from 'prop-types';
import InfiniteScroll from 'react-infinite-scroll-component';

export class News extends Component {
    static defaultProps = {
        country: 'in',
        pageSize: 8,
        category: 'general',
    }

    static propTypes = {
        country: PropTypes.string,
        pageSize: PropTypes.number,
        category: PropTypes.string,
        apiKey: PropTypes.string.isRequired,
    }

    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            loading: false,
            page: 1,
            totalResults: 0,
            retryCount: 0
        };
        document.title = `${this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} - NewsBee`;
    }

    async updateNews() {
        this.props.setProgress(10);
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page}&pageSize=${this.props.pageSize}`;

        this.setState({ loading: true });
        let data = await fetch(url);
        this.props.setProgress(30);
        let parsedData = await data.json()
        this.props.setProgress(70);

        
        this.setState({
            articles: parsedData.articles,
            totalResults: parsedData.totalResults,
            loading: false, 
        })
        this.props.setProgress(100);

    }


    async componentDidMount() {
        console.log("Component did mounted with category:", this.props.category);

        this.updateNews();
    }

    

    handlePrevClick = async () => {
        this.setState({ page: this.state.page - 1 }, () => {
            this.updateNews();
        });
    }
    
    handleNextClick = async () => {
        this.setState({ page: this.state.page + 1 }, () => {
            this.updateNews();
        });
    }
    fetchMoreData = async () => {  
        this.setState({page: this.state.page + 1})
        const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json()
        this.setState({
            articles: this.state.articles.concat(parsedData.articles),
            totalResults: parsedData.totalResults
        })
      };

    render() { 
        return (
            <div className="container my-5">
                <h1 className="text-center" style={{margin: '35px 0px'}}>
                    NewsBee - Top {this.props.category.charAt(0).toUpperCase() + this.props.category.slice(1)} Headlines
                </h1>
                {this.state.loading && <Spinner/>}
                <InfiniteScroll
                dataLength={this.state.articles.length}
                next={this.fetchMoreData}
                hasMore = {this.state.articles.length !== this.state.totalResults}
                loader = {<Spinner/>} >

                <div className='container'>
                <div className="row"> 
                {!this.state.loading && this.state.articles.map((element) => {
                    return <div className="col-md-4" key={element.url}>
                        <NewsItem title={element.title?element.title:""} description={element.description?element.description:""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name}/>
                    </div> 
                })} 
                </div> 
                </div>
                </InfiniteScroll>

                
            </div>
        )
    }


}

export default News;