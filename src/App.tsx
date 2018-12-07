import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators, Dispatch } from "redux";
import MainCarousel from './containers/MainCarousel';
import "./App.css";
import { pageLeft, pageRight } from "./store/actions/carousel";
import {getPhotos} from './store/actions/photos'; 
import logo from "./logo.svg";

const App = (props:any) => 
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <MainCarousel/>
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>
    <h3>{props.carousel}</h3>
    <pre>{JSON.stringify(props.photos, null, 2)}</pre>
    <button onClick={props.actions.pageLeft}>pageLeft</button>
    <button onClick={props.actions.pageRight}>pageRight</button>
    <button onClick={props.actions.getPhotos}>getPhotos</button>

  </div>


function mapStateToProps(state: any) {
  return {
    carousel: state.carousel,
    photos: state.photos
  };
}

function mapDispatchToProps(dispatch: Dispatch) {
  return {
    actions: {
      pageLeft: bindActionCreators(pageLeft, dispatch),
      pageRight: bindActionCreators(() => pageRight(10), dispatch),
      getPhotos: bindActionCreators(() => getPhotos("kittens"), dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
