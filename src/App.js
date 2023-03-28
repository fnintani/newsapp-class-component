import { Component } from "react";
import axios from "axios";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news: [],
      search: "",
      isLoading: true,
    };
  }

  getNews = async (query) => {
    try {
      this.setState({ isLoading: true });
      let url = ""
    // console.log(query)
      if(query) {
        url = `https://newsapi.org/v2/everything?q=${query}&language=id&pageSize=24&apiKey=15a2a125b22b4c6a930c8066a67f6c4f`
      } else {
        url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=15a2a125b22b4c6a930c8066a67f6c4f`
      } 
       
      const response = await axios.get(url);
      return this.setState({ news: response.data.articles });
    } 
    catch (err) {
        console.log(err);
    } 
    finally {
        return this.setState({ isLoading: false });
    }
    
  };

  
  componentDidMount() {
    this.getNews();
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.search !== prevState.search) {
      this.getNews(this.state.search);
    }
  }

  handleChange = evt => {
    // console.log(evt.target.value)
    this.setState({ search: evt.target.value })
  }

  handleSubmit = evt => {
    evt.preventDefault();
    // console.log("onsubmit charge")
  }

  render() {
    console.log(this.state.news)
    return (
      <div className="App">
         <nav className="navbar">
            <h5 className="logo" href="#">News App</h5>
         </nav>
      
        <div className="form-container">
          <form className="form-control" onSubmit={this.handleSubmit.bind(this)}>
            <input 
              type="text" 
              placeholder="Search News" 
              className="input-text"
              onChange={this.handleChange.bind(this)}
              value={this.state.search}
              >
              </input>
          </form>
        </div>
         
        {this.state.isLoading && <h3 className="loading">Loading...</h3>}
        {this.state.isLoading !== true && (this.state.news.length===0) && <h3 className="error">Maaf, konten tidak ditemukan</h3>}

        <div className="container-card">
                {
                     this.state.isLoading !== true && this.state.news && this.state.news.map((article, i) => {
                        return(
                            <div className="card" key={i}>
                                <img src={article?.urlToImage} className="card-img" alt="News Image Thumbnail"></img>
                                <div className="card-body">
                                    <h5 className="card-title">{article.title}</h5>
                                    {article.description ? <p className="card-text">{`${article.description.substring(0, 100)}...`}</p> : ""}
                                    <a href={article.url} className="card-link">Read More...</a>
                                </div>
                            </div>
                        )
                    })
                
                }
          </div>
    </div>
    );      
  }

}

export default App;
