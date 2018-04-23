# Starwars-Films
Single Page Application using React/Redux that allows users to search Star Wars film(s) by the film title
or character names and view details of the film.

**Note:** Node v6+ is required for this project.

I recommend using [yarn](https://code.facebook.com/posts/1840075619545360) to manage dependencies. To begin using yarn, install globally with `npm install -g yarn`.

Then simply clone the repository and install using the `yarn` command.

```
git clone git@github.com:mishravinay112/starwars-films.git
cd starwars-films
yarn
```
but still you can use default package manager of node as well. If you can also install dependency via `npm`

`npm i`

To build the dev environment with hot reloading of JS and CSS, type:

`npm start`

By default, the site is available at http://localhost:3000.



If you are suggesting a major overhaul of some aspect of this project, please submit an issue with your suggestion on `mishravinay112@gmail.com`.

## Tools Included in this Project

The tools included in this project are:

- React (of course)
- Redux (state management)
- React Router (routing)
- webpack (bundling assets)
- PostCSS (processing of CSS)
- Stylelint and eslint (recommanded eslint)
- Babel (latest JS)
- husky (run tasks using git hooks like commit, pre-push)
- bootsrap & fontawesome (style & icon)

All of these are currently mainstream tools for building modern JavaScript applications, however, it may be useful to discuss the rationale for the inclusion of some of these tools.

#### Redux
Redux is both a library and an architecture. It is influenced by Flux, Immutable.js and other prior work. Dan Abramov, the creator of Redux, posted a response on [Stack Overflow](http://stackoverflow.com/questions/32461229/why-use-redux-over-facebook-flux) about how/why Redux may be preferred over Flux. It provides valuable insight into the major benefits of Redux.

#### PostCSS
If you're familiar with Sass, then writing CSS within this boilerplate project will come easily to you. Although Sass itself is not included, support for Sass syntax has been added due to its popularity. Why not just use Sass? PostCSS can do everything Sass can do, but more. Also, we can do a lot with PostCSS that isn't possible with Sass.


#### No Gulp or Grunt
This project uses npm scripts to run the few tasks needed to build and serve the app. The scripts are located in 

`package.json`.

#### File structure
The file structure for this project uses a modular pattern that is common in JavaScript projects.

The file structure there is the pattern used through this project. All of the JS and CSS pertaining to that particular component are grouped together in a place according to there purpose and use. This has proven to be a very helpful way of organizing a React/JS project.

If you are worried about "separation of concerns", please see MPJ's [humorous rant](https://www.youtube.com/watch?v=0ZNIQOO2sfA) on the topic.

Another quick note, the components designated as "pages" - HomePage, FilmDetailPage - are [container components](http://redux.js.org/docs/basics/UsageWithReact.html#presentational-and-container-components).

#### husky
Note that linting is performed on each commit and tests are run on pre-push. These tasks are courtesy of [husky](https://www.npmjs.com/package/husky). For reference, the husky tasks are in the `scripts` section of `package.json`.

#### Import of CSS
Take a look at `src/components/App.js`. Near the top of that file you will see a conditional import of the `src/css/components/app.css` file. This is how CSS imports with webpack work.

In a dev environment (what you get when you type `npm start`), the CSS is injected into the `<HEAD>` of the document. A change to CSS will result in the style being quickly hotloaded into the browser - no lengthy rebuilds or refreshes needed.

In a production environment, the CSS files are bundled into a single file, `bundle.css` that is included in the page via the `<LINK>` tag.

Other methods of building and loading CSS have proved slower/clunkier than webpack. However, there is a minor annoyance that comes with webpack.
