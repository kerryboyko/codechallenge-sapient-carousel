# Brian Boyko
## Candidate Decision Making Process Notes

Hello. In order to give you an idea of my thought process during this code challenge, I will be providing notes in this document. 

This repository was created with Create-React-App, using the ts-scripts to add typescript support.  

## Interesting Decisions:

* Since we have to provide the API key to the client, there's not really any point in keeping it secret. However, a more secure system would be to provide an API interface to our own backend, and call the Pixabay API from there. 

One interesting thing is that Pixabay requires caching every 24 hours. That implies to me the API is not meant to be accessed directly from the client, but to access a backend server that has some sort of caching.  

I want to get the core front-end build done first, but if time remains, I might build a little microservice using NeDB/Node/Express to impliment that caching.  

* I'm organizing my redux store in the idiomatic /store, /actions, and /reducers folders, however, I've found it was better in practice to take a cue from Vuex and create modules seperated by concerns. It's not a big thing either way.  

* Several places in the code are marked "// DEV ENVIRONMENT ONLY" - this marks spots where I would only enable the code in development, not in production.  Front-end code doesn't have access to process.env.NODE_ENV at runtime, so the solution would be to use the webpack DefinePlugin. Doing so, I believe, would require ejecting and getting into Webpack, which I really don't want to do in a limited timeframe for a code challenge. Still, I wanted to let you know that, yes, I see the issues here if this code was left in production. . 

## Libraries chosen (and why): 

* Language: *Typescript*

  When possible, I like to use Typescript instead of standard Javascript. There is a time tradeoff in setup, but with good tooling and linters, you can catch potential errors before you build.  This is not a hard requirement but one which I think makes sense for this project. 

* Framework: *React/Redux* 

  Because the position is primarily going to be working with React, I will be using that as my front-end framework.  However, the scope of this project does not necessarily require an entire front-end framework.  Nor would it require the use of Redux - however, I imagine you will want to see me make use of a state manager. 

* Unit Testing: *Jest*

  I've used Mocha, but Jest is really designed for mocking APIs and handling promises elegantly. I like that you can put your test files alongside your source code, as that allows you to have at-a-glance visibility into what features and functions have test coverage.  100% coverage is not always feasible (and usually neither required nor desired) but the key areas to test would be the API code and the state manager. 

* Client-Side Ajax: *Superagent*

  There are a number of libraries for making API calls, Superagent for me has always been simple and straightforward, although I've used others, such as fetch and axios. 

* Package Manager: *Yarn*

  Yarn is fundimentally the same in practice as NPM, but allows you to download packages to your hard drive, saving install time. 

* Styles: *Sass* and *Aphrodite*

  Through Webpack, I can easily add Sass as any other dependency to the project. But since the project requires interactivity and the CSS used will likely depend on state, as a backup, *Aphrodite* will serve as a CSS-in-JS solution.  

## Architecture

Here's the architecture pattern I like to use.  I like to think of the application as a ziggurat - built in layers, with these rules. 

* A lower layer should have no dependencies upon a higher layer. 
* No layer should mutate the state of another layer except by calling provided exposed functions (Kind of like object-oriented encapsulation, but across a number of classes.) 
* Lower layers should propagate information about the application state to the higher layers, and provide callbacks that the higher level layers can call to change state. 

For this application, I'm choosing this structure: 

```
------ Structure/Styling (HTML/CSS); 
----- Stateless Components (Takes props, outputs JSX)
---- Containers (Local application state, interface with redux)
--- State Manager (Redux)
-- Framework (React base)
- API Interface Library (SuperAgent)
```

## Interesting notes

