import React, { useContext, useEffect, useRef, useState } from "react";
import "./Navbar.css"; // Make sure to add your CSS file for styling
import { useNavigate } from "react-router-dom";
import { MyContext } from "../../context/MyContext";
import { UserContext } from "../../context/UserContext";
import { postData, serverURL } from "../../services/NodeServices";

const Navbar = () => {
  const [navopen, setNavOpen] = useState(true);
  const [minibar, steMiniBar] = useState(false);
  const [coins,setCoins]=useState(false)

  const { isloggedIn, user, logoutUser } = useContext(MyContext);

  const [showMenu, setShowMenu] = useState(false);
  const [showMenuRight, setShowMenuRight] = useState(false);


  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);



  const [searchQuery, setSearchQuery] = useState("");


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

  const getCoins=async()=>{
    try{

      const user = JSON.parse(localStorage.getItem('user'))

      console.log('are we seidn userid',user.userid)

      const result = await postData('api/users/getwallet',{userid:user.userid})

      if(result.status){
        setCoins(result.data.coins)
      }

    }catch{

    }
  }

  useEffect(()=>{
getCoins()
  },[])

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



  const handleSearchSubmit = () => {
    setShowSuggestions(false);
    if (searchQuery.trim()) {
      navigate(`/search/${searchQuery}`); // Navigate to search results page
      setSearchQuery(""); // Clear input after search
    }
  };

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleMenuRight = () => {
    setShowMenuRight(!showMenuRight);
  };

  const handleClose = () => {
    setNavOpen(false);
  };
  const navigate = useNavigate();

  const timerRef = useRef(null);

  const handleMouseEnter = () => {
    clearTimeout(timerRef.current); // Cancel any pending hide
    steMiniBar(true);
  };

  const handleProductClick=(item)=>{
          navigate(`/view/${item.product_id}`)
              setShowSuggestions(false)
              
  }

  const handleMouseLeave = () => {
    // Delay hiding the dropdown
    timerRef.current = setTimeout(() => {
      steMiniBar(false);
    }, 200); // Adjust the delay as needed
  };

  const handleClick = (v) => {
    navigate(v);
    steMiniBar(false);
    setShowMenu(false);
  };
  const logout = () => {
    logoutUser();
    navigate("/");
  };

  const menuRef = useRef(null);
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    if (showMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showMenu]);

  const handleNavigate = (pathh) => {
    navigate(pathh);
    window.scrollTo(0, 0);
  };

  const handleprofileclicksmall=()=>{
    if(isloggedIn){
     /*   setShowMenuRight(true) */
     navigate('/userinfo')
    }else{
      navigate('/log-in')
    }
  }

  return (
    <>
      <div className={`top_nav ${navopen ? "open" : "close"}`}>
        Special Offer : 50% off on all t-shirts 00:45:12
        <i
          className="fa-regular fa-circle-xmark topnavx"
          onClick={handleClose}
        ></i>
      </div>
      <div className="navbarsection">
        <div
          className="logosection"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/image/blaze.png" />
        </div>
        <div className="serchbar">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={searchQuery}
            onChange={handleSearch} // Handle input changes
            onKeyDown={(e) => e.key === "Enter" && handleSearchSubmit()} // Submit on Enter key
          />
          <i className="fa-solid fa-magnifying-glass"></i>
        </div>
        <div className="menubar">
          <li
            onClick={() => {
              navigate("/category/men/All");
            }}
          >
            Mens
          </li>
          <li
            onClick={() => {
              navigate("/category/women/All");
            }}
          >
            Womens
          </li>
         {/*  <li
            onClick={() =>
              window.open("https://competition.blazestore.in/", "_blank")
            }
            style={{ cursor: "pointer" }}
          >
            Competition
          </li> */}
          {/*     <li onClick={()=>{navigate('/category/Hoodies')}}>Sale</li>
          <li onClick={()=>{navigate('/category/Travel Jogger')}}>Special Offer</li> */}
        </div>
        <div className="menuicon_bar">
          {/*    <i
            className="fa-regular fa-heart"
            onClick={() => {
              navigate("/wishlist");
            }}
          ></i> */}

         {/*  <svg
            onClick={() => {
              navigate("/search");
            }}
            width="22"
            height="22"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38 38L29.3 29.3M34 18C34 26.8366 26.8366 34 18 34C9.16344 34 2 26.8366 2 18C2 9.16344 9.16344 2 18 2C26.8366 2 34 9.16344 34 18Z"
              stroke="#444444"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg> */}
         { <div className="walletcard11" style={{marginRight:11,marginBottom:7,paddingBottom:0,backgroundColor:'#e4e463',paddingTop:4,display:'flex',marginTop:-5,padding:'2px 14px',alignItems:'center',height:31,cursor:'pointer'}}>
            <img style={{width:21,marginTop:1,marginRight:5}} src="/image/coin.svg" /> <p>{coins}</p>
          </div>}

          <svg
            style={{ marginTop: -3 }}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              handleNavigate("/cart");
            }}
          >
            <path
              d="M1 1H2.30616C2.55218 1 2.67519 1 2.77418 1.04524C2.86142 1.08511 2.93535 1.14922 2.98715 1.22995C3.04593 1.32154 3.06333 1.44332 3.09812 1.68686L3.57143 5M3.57143 5L4.62332 12.7314C4.75681 13.7125 4.82355 14.2031 5.0581 14.5723C5.26478 14.8977 5.56108 15.1564 5.91135 15.3174C6.30886 15.5 6.80394 15.5 7.79411 15.5H16.352C17.2945 15.5 17.7658 15.5 18.151 15.3304C18.4905 15.1809 18.7818 14.9398 18.9923 14.6342C19.2309 14.2876 19.3191 13.8247 19.4955 12.8988L20.8191 5.94969C20.8812 5.62381 20.9122 5.46087 20.8672 5.3335C20.8278 5.22177 20.7499 5.12768 20.6475 5.06802C20.5308 5 20.365 5 20.0332 5H3.57143ZM9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM17 20C17 20.5523 16.5523 21 16 21C15.4477 21 15 20.5523 15 20C15 19.4477 15.4477 19 16 19C16.5523 19 17 19.4477 17 20Z"
              stroke="#444444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          {!isloggedIn ? (
            <button
              onClick={() => {
                navigate("/log-in");
              }}
            >
              <i className="fa-solid fa-arrow-right-to-bracket"></i> Sign In
            </button>
          ) : (
            <div
              className="profileicon"
              onMouseEnter={() => handleMouseEnter()}
              onMouseLeave={() => handleMouseLeave()}
            >
              <svg
                style={{ marginTop: -3, marginRight: -5 }}
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M3.23779 19.5C4.5632 17.2892 7.46807 15.7762 12.0001 15.7762C16.5321 15.7762 19.4369 17.2892 20.7623 19.5M15.6001 8.1C15.6001 10.0882 13.9883 11.7 12.0001 11.7C10.0118 11.7 8.40007 10.0882 8.40007 8.1C8.40007 6.11177 10.0118 4.5 12.0001 4.5C13.9883 4.5 15.6001 6.11177 15.6001 8.1Z"
                  stroke="#444"
                  stroke-width="2"
                  stroke-linecap="round"
                />
              </svg>
              {
              /*   <p style={{ marginTop: -3 }}>
                  {user ? user.firstname : "profile"}
                </p> */
              }
            </div>
          )}
        </div>

        <div>
          <div
            className={`cart__profile ${minibar ? "show" : ""}`}
            onMouseEnter={() => handleMouseEnter()}
            onMouseLeave={() => handleMouseLeave()}
            style={{
              display: minibar ? "flex" : "none",
              flexDirection: minibar ? "column" : "row",
            }}
          >
            <div className="cartprofile__item">
             {isloggedIn? <p onClick={()=>{navigate('/userinfo')}}>My Info</p>: <p>Guest</p>}
            </div>
            {isloggedIn && user.role == "admin" ? (
              <div
                className="cartprofile__item2"
                onClick={() => {
                  handleClick("/admin");
                }}
              >
                <svg
                  width="18"
                  height="17"
                  viewBox="0 0 18 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.8 13.4L12 14.75C10.2222 16.0833 7.77778 16.0833 6 14.75L4.2 13.4C2.18555 11.8892 1 9.51806 1 7V3C1 1.89543 1.89543 1 3 1H15C16.1046 1 17 1.89543 17 3V7C17 9.51806 15.8144 11.8892 13.8 13.4Z"
                    stroke="#444444"
                    stroke-linecap="round"
                  />
                </svg>

                <p>Admin</p>
              </div>
            ) : (
              <div
                className="cartprofile__item2"
                onClick={() => {
                  handleClick("/orders");
                }}
              >
                <svg
                  width="20"
                  height="19"
                  viewBox="0 0 20 19"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6 9L6 5C6 2.79086 7.79086 1 10 1V1C12.2091 1 14 2.79086 14 5L14 9"
                    stroke="#33363F"
                    stroke-width="2"
                    stroke-linecap="round"
                  />
                  <path
                    d="M1.69435 9.66782C1.83942 7.92692 1.91196 7.05647 2.48605 6.52824C3.06013 6 3.9336 6 5.68053 6H14.3195C16.0664 6 16.9399 6 17.514 6.52824C18.088 7.05647 18.1606 7.92692 18.3057 9.66782L18.8195 15.8339C18.904 16.8474 18.9462 17.3542 18.6491 17.6771C18.352 18 17.8435 18 16.8264 18H3.1736C2.15655 18 1.64802 18 1.35092 17.6771C1.05382 17.3542 1.09605 16.8474 1.18051 15.8339L1.69435 9.66782Z"
                    stroke="#33363F"
                    stroke-width="2"
                  />
                </svg>
                <p>My Orders</p>
              </div>
            )}
            <div className="cartprofile__item3" onClick={logout}>
              <svg
                width="22"
                height="20"
                viewBox="0 0 22 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M14.2198 18.4L17.9257 18.4C18.4873 18.4 19.026 18.1788 19.4231 17.7849C19.8202 17.3911 20.0433 16.857 20.0433 16.3L20.0433 3.70003C20.0433 3.14307 19.8202 2.60893 19.4231 2.2151C19.026 1.82128 18.4873 1.60003 17.9257 1.60003L14.2198 1.60002M13.9566 10L1.95662 10M1.95662 10L6.54177 14.8M1.95662 10L6.54177 5.20002"
                  stroke="#444444"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </svg>
              <p>Logout</p>
            </div>
          </div>
        </div>
      </div>

      {/* smallllllllllllllllllllllllllllllllllllll navvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv */}

      <div className="smallnav">
        <div className="sm_first">
          <i className="fa-solid fa-bars" onClick={toggleMenu}></i>
        </div>
        <div
          className="sm_second"
          onClick={() => {
            navigate("/");
          }}
        >
          <img src="/image/blaze.png" />
        </div>
        <div className="sm_third">
        
          <svg
            onClick={() => {
              navigate("/search");
            }}
            width="22"
            height="22"
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M38 38L29.3 29.3M34 18C34 26.8366 26.8366 34 18 34C9.16344 34 2 26.8366 2 18C2 9.16344 9.16344 2 18 2C26.8366 2 34 9.16344 34 18Z"
              stroke="#444444"
              stroke-width="4"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
          <svg
            style={{ marginTop: -3 }}
            width="22"
            height="22"
            viewBox="0 0 22 22"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={() => {
              navigate("/cart");
            }}
          >
            <path
              d="M1 1H2.30616C2.55218 1 2.67519 1 2.77418 1.04524C2.86142 1.08511 2.93535 1.14922 2.98715 1.22995C3.04593 1.32154 3.06333 1.44332 3.09812 1.68686L3.57143 5M3.57143 5L4.62332 12.7314C4.75681 13.7125 4.82355 14.2031 5.0581 14.5723C5.26478 14.8977 5.56108 15.1564 5.91135 15.3174C6.30886 15.5 6.80394 15.5 7.79411 15.5H16.352C17.2945 15.5 17.7658 15.5 18.151 15.3304C18.4905 15.1809 18.7818 14.9398 18.9923 14.6342C19.2309 14.2876 19.3191 13.8247 19.4955 12.8988L20.8191 5.94969C20.8812 5.62381 20.9122 5.46087 20.8672 5.3335C20.8278 5.22177 20.7499 5.12768 20.6475 5.06802C20.5308 5 20.365 5 20.0332 5H3.57143ZM9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM17 20C17 20.5523 16.5523 21 16 21C15.4477 21 15 20.5523 15 20C15 19.4477 15.4477 19 16 19C16.5523 19 17 19.4477 17 20Z"
              stroke="#444444"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>

          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            onClick={handleprofileclicksmall}
          >
            <path
              d="M3.23779 19.5C4.5632 17.2892 7.46807 15.7762 12.0001 15.7762C16.5321 15.7762 19.4369 17.2892 20.7623 19.5M15.6001 8.1C15.6001 10.0882 13.9883 11.7 12.0001 11.7C10.0118 11.7 8.40007 10.0882 8.40007 8.1C8.40007 6.11177 10.0118 4.5 12.0001 4.5C13.9883 4.5 15.6001 6.11177 15.6001 8.1Z"
              stroke="#444"
              stroke-width="2"
              stroke-linecap="round"
            />
          </svg>
        </div>
        <div className={`menubar-overlay2 ${showMenuRight ? "minimenuclass2" : ""}`}>
          
              
          <div className="menubar__closeaction2" onClick={()=>{setShowMenuRight(false)}}>
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"

              
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#444444"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>

            
          </div>
          <div className="menurightoptions">
            
             <p>{user?user.firstname:'Guest'}</p>
            </div>
         
        
        </div>
        {/*   {showMenu && ( */}
        <div className={`menubar-overlay ${showMenu ? "minimenuclass" : ""}`}>
          <div className="menubar__closeaction">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M18 6L6 18M6 6L18 18"
                stroke="#444444"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </svg>
          </div>
          <ul className="menubar-items" ref={menuRef}>
            {isloggedIn ? (
              <div className="menu__item">
                <li
                  onClick={() => {
                    handleClick("/orders");
                  }}
                >
                  My Orders
                </li>
              </div>
            ) : (
              <></>
            )}

            <div className="menu__item">
              <li onClick={() => handleClick("/")}>Home</li>
            </div>

            <div className="menu__item">
              <li onClick={() => handleClick("/category/men/All")}>Mens</li>
            </div>

            <div className="menu__item">
              <li onClick={() => handleClick("/category/women/All")}>Womens</li>
            </div>

            <div className="menu__item">
              <li onClick={() => handleClick("/cart")}>Cart</li>
            </div>

            <div className="menu__item">
              {isloggedIn ? (
                <li onClick={logout}>Logout</li>
              ) : (
                <li onClick={() => handleClick("/log-in")}>Sign In</li>
              )}
            </div>
          </ul>
        </div>

   
        {/*   )} */}
      </div>
<div  style={{width:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
{suggestions&&suggestions.length!=0&&    <div className={`searchsuggest ${showSuggestions?'showsearchh':''}`}>
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
                      <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center'}}>
                      <p style={{textDecoration:'line-through',marginRight:'.3rem'}}>{item.base_price}</p> <p>{item.current_price}</p>
                      </div>
                 </div>
              </div>
            )
          })}
          </>:<></>
        }

      </div>}
</div>
    </>
  );
};

export default Navbar;
