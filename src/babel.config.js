// babel.config.js
// babel.config.js
module.exports = {
  presets: [
    ["@babel/preset-env", { targets: { node: "current" } }],
    ["@babel/preset-typescript", { 
      jsx: "react-jsx",
      allowDeclareFields: true 
    }],
    ["@babel/preset-react", { runtime: "automatic" }]
  ]
};