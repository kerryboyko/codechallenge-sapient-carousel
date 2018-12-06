import * as React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import "./App.css";
import { pageLeft, pageRight } from "./store/actions/carousel";

import logo from "./logo.svg";

const App = (props:any) => (
  <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1 className="App-title">Welcome to React</h1>
    </header>
    <p className="App-intro">
      To get started, edit <code>src/App.tsx</code> and save to reload.
    </p>
    <pre>{JSON.stringify(props, null, 2)}</pre>
    <button onClick={props.actions.pageLeft}>pageLeft</button>
    <button onClick={props.actions.pageRight}>pageRight</button>
  </div>
);

function mapStateToProps(state: any) {
  return {
    carousel: state.carousel
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: {
      pageLeft: bindActionCreators(pageLeft, dispatch),
      pageRight: bindActionCreators(() => pageRight(10), dispatch)
    }
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App);
