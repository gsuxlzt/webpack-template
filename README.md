# Webpack Starter Template

A starter template for small projects that use webpack 2.0. This template already has Bootstrap and jQuery installed, making it a good tool for individuals who want to get started with webpack 2.0.

To begin usage, clone the repo and run 
```javascript
npm install
```
 to install its dependencies. To run a local server, run 
 ```javascript
 npm run dev
 ``` 
 and visit
```javascript
 localhost:9000
 ```
 If you want to optimize the site for production, run 
 ```javascript
 npm run prod
 ```

To know more about Webpack 2.0, you can visit their [official docs](https://webpack.js.org/guides/get-started/). For starters, all changes made in the `src` folder will automatically be watched and re-complied by Webpack to the `dist` folder, making your development time more efficient. Check out the `webpack.config.js` file to learn more about how the code tree has been structured. The file also contains instructions on how to add a new page or script.
