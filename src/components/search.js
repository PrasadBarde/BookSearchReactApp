import React, { useState } from "react";
import axios from "axios";

function Search() {
  const [image, setImage] = useState("");
  const [imageData, setImageData] = useState([]);
  const [isShown, setIsShown] = useState(false);
  const [imageInfo,setImageInfo] = useState({});
  const imagehandler = () => {
    axios
      .get(
        `https://www.googleapis.com/books/v1/volumes?q=${image}&key=AIzaSyADxCghJmKnuoLmW6WL20x7UssRAwiCglM`
      )
      .then((res) => {
        console.log(res.data.items);
        setImageData(res.data.items);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const hoverHandler =(value)=>{
    setImageInfo({
      "Title" : value.volumeInfo.title,
      "Author" :value.volumeInfo.authors[0],
"PageCount" :value.volumeInfo.pageCount,
"PublishedDate":value.volumeInfo.publishedDate
    })
  }

  return (
    <>
      <div id="main">
        <div className="header">
          <h1>Book Search</h1>
        </div>
        <div className="search-container">
          <input
            type="text"
            placeholder="Search for a Book"
            className="search"
            value={image}
            onChange={(e) => {
              setImage(e.target.value);
            }}
          />
          <button id="search-btn" onClick={() => imagehandler()}>
            search
          </button>
        </div>
      </div>
      <div className="imageContainer">
        {imageData.map((value) => {
          return (
           
            <div className="images">
              
              <a
                href={value.volumeInfo.infoLink}
                target="_blank"
                rel="noreferrer"
              >
                <img
                  src={value.volumeInfo.imageLinks.thumbnail}
                  alt="api images"
                  id="image"
                  onMouseEnter={() => {setIsShown(true);hoverHandler(value)}}
                  onMouseLeave={() => setIsShown(false)}
                />
              </a>
             
              {isShown && (
        <div>
         <p>Title:{imageInfo.Title}</p>
         <p>Author : {imageInfo.Author}</p>
         <p>Page Count : {imageInfo.PageCount}</p>
         <p>PublishedDate : {imageInfo.PublishedDate}</p>
        </div> 
      ) }
            </div>
           
          );
        })}
        
      </div>
    </>
  );
}

export default Search;
