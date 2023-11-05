import { useState, useEffect } from 'react';
import './index.css';

const NewsDisplay = () => {
    const [news, setNews] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const apiKey = 'b8d4723977564542a22b935b512e4300';
        const apiUrl = `https://newsapi.org/v2/top-headlines?country=in&apiKey=${apiKey}`;

        fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if(data.articles) {
                setNews(data.articles.slice(0,10));
            }
            setLoading(false);
        })
        .catch((error) =>{
            console.error('Error fetching news data:', error);
            setLoading(false);
        });

    }, []);

    if(loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='news-container'>
        <h1>Top 10 Headlines of the Day</h1>
        <div className="news-grid">
          {news.map((article) => (
            <div className='headline-container' key={article.title}>
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                {article.title}
              </a>
              <p>{article.author}</p>
              <img src={article.urlToImage} alt='news image' />
            </div>
          ))}
          </div>
      </div>
    );
};

export default NewsDisplay;

