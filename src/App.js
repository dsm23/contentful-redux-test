import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Main from "./components/Main";
import Gallery from "./components/Gallery";
import GalleryList from "./components/GalleryList";
import NoMatch from "./components/NoMatch";

import "./App.css";

function App() {
  return (
    <Router>
      <Main>
        <Route exact path="/" component={GalleryList} />
        <Route path="/gallery/:galleryId" component={Gallery} />
        <Route path="/image/:imageId" component={Gallery} />
        <Route path="*" component={NoMatch} />
      </Main>
    </Router>
  );
}

export default App;
