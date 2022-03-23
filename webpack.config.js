const path = require('path');

module.exports = {
  entry:{
    main:'./src/index.js',
    bg:'./src/background/main.js'
  } ,
  output: {

    filename: '[name].js',
    path: path.join(__dirname, 'public'),
  },
  module: {
    rules: [{
      loader: 'babel-loader',
      test: /\.js$/,
      exclude: /node_modules/,
      options: {
        presets: [
          ['@babel/preset-env', { targets: "defaults" }],
          ['@babel/preset-react', {"runtime": "automatic"}]
        ]
      }
    },
    {
      test: /\.css$/i,
      use: ["style-loader", "css-loader"],
    }
  
  ]
  },
  devtool:'cheap-module-source-map'
};
