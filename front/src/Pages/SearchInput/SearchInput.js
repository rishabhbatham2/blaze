import React, { useState, useRef, useEffect } from "react";
import './SearchInput.css'
import { useNavigate } from "react-router-dom";
import { postData, serverURL } from "../../services/NodeServices";
const SearchInput = () => {
  const [showSearch, setShowSearch] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInp= useRef(null);

    const [suggestions, setSuggestions] = useState([]);
    const [showSuggestions, setShowSuggestions] = useState(false);
  
  
  
 
  
  
    const handleSearch = (e) => {
      console.log('fetching ')
      const query = e.target.value;
      setSearchQuery(query);
  
      if (query.trim()) {
        fetchSuggestions(query);
      } else {
        setSuggestions([]);
        setShowSuggestions(false)
      }
    };
  
    useEffect(() => {
      if (showSuggestions) {
        document.body.style.overflow = "hidden"; // Lock scroll
      } else {
        document.body.style.overflow = ""; // Unlock scroll
      }
  
      return () => {
        document.body.style.overflow = ""; // Ensure unlock on unmount
      };
    }, [showSuggestions]);
  
    const fetchSuggestions = async (query) => {
      try {
        // Replace this with your API call
        const response = await postData('search-suggest',{query:query})
      
       
       if(response.status){
        setSuggestions(response.data);
        setShowSuggestions(true);
        console.log('fetching rsultssssssssssssssssssssssssssssssss',response)
       
       }
      } catch (error) {
        console.error("Error fetching suggestions:", error);
      }
    };


  
  const toggleSearch = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      setTimeout(() => searchInp.current?.focus(), 0);
    }
  };
  const handleProductClick=(item)=>{
    navigate(`/view/${item.product_id}`)
        setShowSuggestions(false)
        
}
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const navigate = useNavigate()

  useEffect(() => {
    searchInp.current?.focus();
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setShowSuggestions(false)
      document.body.style.overflow = ""; // Unlock scroll
      
     navigate(`/search/${searchQuery}`)

     
    }
  };

  return (
   <>
    <div className="searchinput_cont">
     <div className="searhinputmain">
     <svg onClick={()=>{navigate('/')}} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M7.825 13L13.425 18.6L12 20L4 12L12 4L13.425 5.4L7.825 11H20V13H7.825Z" fill="#444"/>
</svg>

     <input className="searchinputt" value={searchQuery} ref={searchInp} onChange={(e)=>{handleSearch(e)}}
     
     
     onKeyDown={handleKeyDown} 
     />
     </div>

  
    </div>
  {/*   {suggestions&&suggestions.length!=0&&    <div className={`searchsuggest ${showSuggestions?'showsearchh':''}`}>
        {
          suggestions&&suggestions.length>=1?<>
          {suggestions.map((item)=>{
            let images = item.image_url.split(',')
            return(
              <div className="suggestionscard" onClick={ ()=>{ handleProductClick(item)}
              }>
                 <div className="suggestionimage">
                   <img src={`${serverURL}images/${images[0]}`} />
                 </div>
                 <div className="suggestiondata">
                      <p>{item.name}</p>
                      <p>{item.base_price}</p>
                 </div>
              </div>
            )
          })}
          </>:<></>
        }

      </div>} */}
    </>
  );
};

export default SearchInput;
