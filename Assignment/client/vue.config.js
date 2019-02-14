module.exports = {
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/index/, to: '/index.html' },
        { from: /\/files/, to: '/files.html' },
        { from: /\/specificFile/, to: '/specificFile.html' },
      ]
    }
},
  pages: {
    index: {
      entry: './src/views/index/main.js',
      template: 'public/index.html',
      title: 'Index',
    },
    files: {
      entry: './src/views/AllFiles/main.js',
      template: 'public/index.html',
      title: 'Files',
    },
    specificFile: {
      entry: './src/views/SpecificFile/main.js',
      template: 'public/index.html',
      title: 'File',
    },
  },
};
