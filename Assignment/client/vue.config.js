module.exports = {
    devServer: {
        historyApiFallback: {
            rewrites: [
                { from: /\/index/, to: '/index.html' },
                { from: /\/files/, to: '/files.html' },
                { from: /\/specificFile/, to: '/specificFile.html' },
                { from: /\/editSpecificFile/, to: '/editSpecificFile.html' },
                { from: /\/login/, to: '/login.html' },

            ],
        },
    },
    pages: {
        index: {
            entry: './src/views/index/main.js',
            template: 'public/index.html',
            title: 'Index',
        },
        files: {
            entry: './src/views/allFiles/main.js',
            template: 'public/index.html',
            title: 'Files',
        },
        specificFile: {
            entry: './src/views/specificFile/main.js',
            template: 'public/index.html',
            title: 'File',
        },
        editSpecificFile: {
            entry: './src/views/editSpecificFile/main.js',
            template: 'public/index.html',
            title: 'Edit Specific File',
        },
        addFile: {
            entry: './src/views/addFile/main.js',
            template: 'public/index.html',
            title: 'Add File',
        },
        login: {
            entry: './src/views/login/main.js',
            template: 'public/index.html',
            title: 'Login',
        },
    },
};
