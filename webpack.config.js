const path = require("path");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  entry: {
    content: "./src/Content.tsx",
    popup: "./src/Popup.tsx",
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  resolve: {
    extensions: [".ts", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env", "@babel/preset-react"],
          },
        },
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10192, // kb
              name: "[name].[ext]?[hash]",
            },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js"],
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "public",
          to: ".",
          filter: (resourcePath) => !resourcePath.endsWith("/popup.html"),
        },
        {
          from: "manifest.json",
          to: ".",
        },
        {
          from: "icon.png",
          to: ".",
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: "public/popup.html",
      filename: "popup.html",
      chunks: ["popup"],
      inject: "body",
    }),
  ],
};
