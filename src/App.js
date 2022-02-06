import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import HomePage from "./components/pages/homepage/homePage.component";
import ShopPage from "./components/pages/shop/shopPage.component";
import Header from "./components/header/header.component";
import Authentication from "./components/pages/authentication/authentication.component";
import {
  auth,
  createUserProfileDocument
} from "./assets/firebase/firebase.utils";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      currentUser: null
    };
  }

  unsubscribeFromAuth = null;

  componentDidMount() {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapshot => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data()
            }
          });

          console.log("state", this.state);
        });
      } else {
        this.setState({
          currentUser: userAuth
        });
      }
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <div>
        <Header currentUser={this.state.currentUser} />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/signIn" element={<Authentication />} />
        </Routes>
      </div>
    );
  }
}

export default App;
