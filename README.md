# Publicis.Sapient Front End Senior Associate Test
## Candidate: Brian Boyko

### Note: There is a potential security vulnerability in this test. See below.

The results of a "yarn audit" command will yield: 

```
$ yarn audit
yarn audit v1.12.3
┌───────────────┬──────────────────────────────────────────────────────────────┐
│ high          │ Missing Origin Validation                                    │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Package       │ webpack-dev-server                                           │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Patched in    │ >=3.1.6                                                      │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Dependency of │ react-scripts-ts                                             │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ Path          │ react-scripts-ts > webpack-dev-server                        │
├───────────────┼──────────────────────────────────────────────────────────────┤
│ More info     │ https://nodesecurity.io/advisories/725                       │
└───────────────┴──────────────────────────────────────────────────────────────┘
1 vulnerabilities found - Packages audited: 18560
Severity: 1 High
```

A bit of background - as this is a code-challenge assignment, and not a production assignment, I used Create-React-App with react-scripts-ts to quickly bootstrap a typescript based React framework. The problem is that the TS version of react scripts still uses the old version of the webpack-dev-server with this vulnerability.

The solution would be to run yarn eject to eject the package then upgrade webpack-dev-server, however webpack-dev-server >=3.1.6 requires webpack >= 4.0.0 and webpack's configuration for both dev and prod would have to be migrated from webpack 3 format to webpack 4 format.  Suffice to say, these are breaking changes and would take a significant effort. 

For the very limited purposes of this code challenge, I am leaving this as a known vulnerability. 

### Installation and execution

Installation: "yarn install" or "npm install"
Test suite: "yarn test" or "npm run test"
Development server: "yarn start" or "npm run start"
Production server: "yarn serve:production" or "npm run serve:production"

Default ports: 
  * Development server: 3000
  * Production server: 5000

### Candidate Decision Making Process Notes

Hello. In order to give you an idea of my thought process during this code challenge, I will be providing notes in this document. 

This repository was created with Create-React-App, using the ts-scripts to add typescript support.  

#### Interesting Decisions:

* Since we have to provide the API key to the client, there's not really any point in keeping it secret. However, a more secure system would be to provide an API interface to our own backend, and call the Pixabay API from there. 

One interesting thing is that Pixabay requires caching every 24 hours. That implies to me the API is not meant to be accessed directly from the client, but to access a backend server that has some sort of caching.  

If the scope of the assignment was larger, I would have built a little microservice using NeDB/Node/Express to do server-side caching. 

I did create a little caching in-memory on the client side in the store (mainly there to show off, but also shows how this can limit the number of API calls needed to a backend) 

* Because I didn't want to complicate things, I chose NOT to eject the React-Create-App to create Webpack scripts.  This did limit me - I had to use straight CSS instead of my preferred Sass, but it cuts down on the amount of code that you have to read and I have to maintain to present the project without ejecting.  

* I spent significanly more than three hours on this test. 

It states that I should not spend more than three hours on the test in the README, but I've taken much longer. 

While time constraints are always a part of software development, it is always better to downscope a project than to sacrifice code quality.  Downscoping this project to what could be accomplished in three hours - while still maintaining code quality - would have reduced the features it to the point of absurdity. 

Because I think you are more interested in the quality of work I can do, rather than necessarily the speed at which I do it, I decided to take more time than allotted. 


### Libraries chosen (and why): 

* Language: *Typescript*

  When possible, I like to use Typescript instead of standard Javascript. There is a time tradeoff in setup, but with good tooling and linters, you can catch potential errors before you build.  This is not a hard requirement but one which I think makes sense for this project.  

  There are a few areas where I could have gotten more specific with the typing, but sometimes, using "any" is just fine for the purposes of a code challenge. 

* Framework: *React/Redux* 

  Because the position is primarily going to be working with React, I chose that framework. I also chose to use Redux as a state manager for the same reason (despite the project being small enough that Redux was not strictly necessary). 

* Unit Testing: *Jest/Enzyme*

  I've used Mocha, but Jest is really designed for mocking APIs and handling promises elegantly. I like that you can put your test files alongside your source code, as that allows you to have at-a-glance visibility into what features and functions have test coverage.  100% coverage is not always feasible (and usually neither required nor desired) but the key areas to test would be the API code and the state manager. 

  Testing that rendering meets expectations is tricker, but I did do some of that using the Enzyme library on the main components.  

* Client-Side Ajax: *Superagent*

  There are a number of libraries for making API calls, Superagent for me has always been simple and straightforward, although I've used others, such as fetch and axios. 

* Package Manager: *Yarn*

  Yarn is fundimentally the same in practice as NPM, but allows you to download packages to your hard drive, saving install time. 

* Styles: *CSS*

  I love Sass, but because I don't want to eject this project, I'll stick with CSS. If I needed a little bit more flexibility in changing CSS behavior, however, I would have used Aphrodite, a JS library that creates dynamic CSS on-the-fly in your JS files. 

* Utilities: *Lodash*

  Lodash is a functional programming library. Much of it is not used because ES7/TS have included much of the core functionality into the language itself, but the key feature of Lodash is that A) It has code-splitting, meaning you don't need to import the whole library into your bundle to use one method, and B) the Lodash "get" method is very good at handling those cases where object.property?.childProperty can occur. That is - if "property" is undefined, trying to access childProperty throws an ugly JS error. get(object, 'property.childProperty', null); handles it gracefully.  Until some form of Maybe monad is standard in the language, I think I'll always have lodash/get in my toolkit. 

* SVG Handling: *react-svg*

  Just a simple library that converts imported SVG images (like our arrow) and turns it into a react component. Doing so allows me to override properties of the component with css, something I couldn't do if I just put it in as the src field of an img tag;  

### Architecture

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

### Original Brief

The original brief can be found in this repository at ./doc/README.md