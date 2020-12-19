const path = require('path');

module.exports = {
    layoutDir: path.resolve(__dirname, './layouts'),
    plugins: [
        // ['@vuepress/google-analytics'],
        // ['@vuepress/back-to-top'],
        // ['@vuepress/medium-zoom'],
        // ['@vssue/vuepress-plugin-vssue', Object.assign({
        //     platform: 'github',
        // }, comments)],
        ['@vuepress/register-components', {
            componentsDir: [
                path.resolve(__dirname, './components/')
            ]
        }],
        // ['@yubisaki/blog', {
        //     pageEnhancers: [
        //         {
        //             when: ({ frontmatter }) => frontmatter.layout === 'Activity',
        //             frontmatter: { layout: 'Activity' }
        //         }
        //     ]
        // }],
        // ['@yubisaki/pagination'],
        // 'flowchart'
    ]
}