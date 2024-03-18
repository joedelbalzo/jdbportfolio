// const path = require("path");
// const svgLoader = require("svg-inline-loader");

// module.exports = {
//   devtool: "source-map",
//   module: {
//     rules: [
//       { test: /\.svg$/, loader: "svg-inline-loader" },
//       {
//         test: /\.(js|jsx)$/,
//         exclude: /node_modules/,
//         loader: "babel-loader",
//         options: {
//           presets: ["@babel/preset-react"],
//         },
//       },
//       {
//         test: /\.(png|jpe?g|gif)$/i,
//         use: [
//           {
//             loader: "file-loader",
//             options: {
//               name: "[name].[ext]",
//               outputPath: "images/",
//             },
//           },
//         ],
//       },
//     ],
//   },
//   resolve: {
//     extensions: [".js", ".jsx"],
//   },
// };
