import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import RenderRoutes from "../routes/RenderRoutes";
import ChatIcon from "../components/ChatIcon";
import setCookies from "../hooks/setCookies";
import getCookies from "../hooks/getCookies";
import removeCookies from "../hooks/removeCookies";
import Sidebar from "../components/Sidebar";
import ProfileSidebar from "../components/ProfileSidebar";
import DashboardLawyer from "../pages/LawyerPages/DashboardLawyer";
import LegalGuideSidebar from "../components/LegalGuideSidebar";

const AuthContext = createContext();
export const AuthData = () => useContext(AuthContext);

export const AuthWrapper = () => {
  // console.log("path", window.location.pathname);
  const navigate = useNavigate();
  let role = "user";
  const [isProtected, setProtected] = useState(false);

  const [user, setUser] = useState({user : "", isAuthenticated: false});



  const checkProtected = async() => {
    
    if(getCookies("jwt") === undefined){
      setUser({user : "", isAuthenticated: false});
      return;
    }
    let userData = {
      jwt: getCookies("jwt"),
    }

    try{
    const response = await fetch("http://127.0.0.1:5001/api/v1/users/isLoggedIn", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((response) => response.json())
      .then((data) => {
        if(data.status === 'success'){
        setUser({user : JSON.stringify(data.data), isAuthenticated: true});
        }
      });
    }catch(err){

    }
  }

  const [selectedChat, setSelectedChat] = useState([]);
  const [chats, setChats] = useState([]);

  

  const updateMe = async (userDetails) => {
    let userData = userDetails;

    try {
      const response = await fetch(
        "http://127.0.0.1:5001/api/v1/users/updateMe",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getCookies("jwt")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
            "Access-Control-Allow-Methods":
              "GET, HEAD, POST, PUT, DELETE,PATCH, OPTIONS",
          },
          body: JSON.stringify(userData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUser({
            user: JSON.stringify(data.data.user),
            isAuthenticated: true,
          });
          alert(
            "Congratulations!! You have succesfully changed your details..."
          );
        });
    } catch (err) {
      console.log(err);
      setUser({ user: "", isAuthenticated: false });
      alert("Unable to Update the Information, Please try again later!!");
    }
  };

  const updatePassword = async (userDetails) => {
    let userData = userDetails;

    try {
      const response = await fetch(
        "http://127.0.0.1:5001/api/v1/users/updatePassword",
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${getCookies("jwt")}`,
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Headers":
              "Origin, X-Requested-With, Content-Type, Accept, Z-Key",
            "Access-Control-Allow-Methods":
              "GET, HEAD, POST, PUT, DELETE,PATCH, OPTIONS",
          },
          body: JSON.stringify(userData),
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setUser({user: JSON.stringify(data.data.user), isAuthenticated: true})
          alert(
            "Congratulations!! You have succesfully changed your details..."
          );
        });
    } catch (err) {
      console.log(err);
      setUser({ user: "", isAuthenticated: false });
      alert("Unable to Change the Password, Please try again later!!");
    }
  };

  const login = async (email, password) => {
    let userData = {
      email: email,
      password: password,
    };

    try {
      const response = await fetch("http://127.0.0.1:5001/api/v1/users/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      })
        .then((response) => response.json())
        .then((data) => {
          return new Promise((resolve, reject) => {
            if (data.status === "success") {
              const tken = data.token;
              removeCookies("jwt");
              setUser({
                user: JSON.stringify(data.data.user),
                isAuthenticated: true,
              });
              setCookies("jwt", tken);
              if (data.data.user.role === "user") {
                navigate("/dashboard");
              } else if (data.data.user.role === "lawyer") {
                role = "lawyer";
                navigate("/dashboardLawyer");
              }
              resolve("success");
            } else {
              setUser({
                user: "",
                role: "",
                isAuthenticated: false,
              });
              reject("Invalid Credentails!!");
            }
          });
        });
    } catch (err) {
      console.log(err);
      // setUser({ user: "", role: "", isAuthenticated: false });
      alert("Invalid Credentials!!");
    }
  };

  const logout = async () => {
    removeCookies("jwt");
    setUser({"user": "", "isAuthenticated": false});
    // let userData = {
    //   jwt: getCookies("jwt"),
    // };

    // try{
    // const response = await fetch("http://127.0.0.1:5001/api/v1/users/logout", {
    //   method: "post",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(userData),
    // })
    //   .then((response) => response.json())
    //   .then((data) => {
    //     if(data.status === 'success'){
    //     setUser({user : "", isAuthenticated: false});
    //     }
    //   });
    // }catch(err){
    //   alert("Error Logging Out the User!!");
    //   console.log("error", err);
    // }
  };

  const [wasManuallyClosed, setWasManuallyClosed] = useState(() => {
    const savedState = localStorage.getItem("showSidebar");
    return savedState !== null && !JSON.parse(savedState);
  });
  const [showSidebar, setShowSidebar] = useState(() => {
    const savedState = localStorage.getItem("showSidebar");
    if (savedState !== null) {
      return JSON.parse(savedState);
    } else {
      return window.innerWidth > 768 && !wasManuallyClosed;
    }
  });

  const toggleSidebar = () => {
    setShowSidebar((prevShowSidebar) => {
      if (prevShowSidebar) {
        setWasManuallyClosed(true);
      } else {
        setWasManuallyClosed(false);
      }
      return !prevShowSidebar;
    });
  };

  useEffect(() => {
    checkProtected();
  }, [user]);

  useEffect(() => {
    // Save the state to localStorage whenever it changes
    localStorage.setItem("showSidebar", JSON.stringify(showSidebar));
  }, [showSidebar]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        if (!wasManuallyClosed) {
          setShowSidebar(true);
        } else {
          setShowSidebar(false);
        }
      } else {
        if (wasManuallyClosed) {
          setShowSidebar(false);
        } else {
          setShowSidebar(true);
        }
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [wasManuallyClosed]);

  if (
    window.location.pathname === "/me" ||
    window.location.pathname === "/edit_details" ||
    window.location.pathname === "/update_password"
  ) {
    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          showSidebar,
          toggleSidebar,
          setShowSidebar,
          updateMe,
          updatePassword,
          setUser,
        }}
      >
        <div className="outer-container">
          <ProfileSidebar />
          <div className="right-container">
            {/* <Navbar /> */}
            <RenderRoutes />
            {user.isAuthenticated && <ChatIcon />}
          </div>
        </div>
      </AuthContext.Provider>
    );
  }

  if (
    window.location.pathname === "/guide" || window.location.pathname === `/guide/article/${localStorage.getItem("Index")}` || window.location.pathname === "/guide/article/0"
  ) {
    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          showSidebar,
          toggleSidebar,
          setShowSidebar,
          updateMe,
          updatePassword,
          setUser,
        }}
      >
        <div className="outer-container">
          <LegalGuideSidebar />
          <div className="right-container">
            {/* <Navbar /> */}
            <RenderRoutes />
            {user.isAuthenticated && <ChatIcon />}
          </div>
        </div>
      </AuthContext.Provider>
    );
  }
  
  else {
    return (
      <AuthContext.Provider
        value={{
          user,
          login,
          logout,
          selectedChat,
          setSelectedChat,
          chats,
          setChats,
          showSidebar,
          toggleSidebar,
          setShowSidebar,
          updateMe,
          updatePassword,
          setUser,
        }}
      >
        <div className="outer-container">
          {window.location.pathname !== "/Video_Room" ? <Sidebar /> : <></>}
          <div className="right-container">
            {/* <Navbar /> */}
            <RenderRoutes />
            {user.isAuthenticated && <ChatIcon />}
          </div>
        </div>
      </AuthContext.Provider>
    );
  }
};
