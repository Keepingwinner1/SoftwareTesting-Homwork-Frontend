module.exports = {
  configureWebpack: {
    module: {
      rules: [
        {
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        }
      ]
    },
    resolve: {
      fallback: {
        "path": false,
        "fs": false
      }
    }
  },
  transpileDependencies: [
    'mermaid'
  ]
} 