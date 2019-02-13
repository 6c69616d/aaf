module.exports = {
    pages: {
      index: {
        entry: './src/views/index/main.js',
        template: 'public/index.html',
        title: 'Index'
      },
      post: {
        entry: './src/views/SpecificFile/main.js',
        template: 'public/index.html',
        title: 'Files'
      }
    }
};