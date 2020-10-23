const BgmMusic = require('./plugins/BgMusic')

module.exports = {
  title: '小人物', //这里是博客标题
  description: `随性笔记`, //博客描述
  dest: 'public', //博客部署时输出的文件夹
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }], //favicon图标设置
    [
      'meta',
      {
        name: 'viewport',
        content: 'width=device-width,initial-scale=1,user-scalable=no',
      },
    ],
  ],
  theme: 'reco', //vuepress挂载的主题
  //默认语言
  locales: {
    '/': {
      lang: 'zh-CN',
    },
  },
  themeConfig: {
    //导航栏
    nav: [
      { text: '首页', link: '/', icon: 'reco-home' }, //text:导航标题内容，icon：图标样式
      { text: '时间线', link: '/timeline/', icon: 'reco-date' },
      {
        text: '文档',
        icon: 'reco-message',
        items: [
          { text: 'vuepress-reco', link: '/docs/theme-reco/' }, //item： 子导航
        ],
      },
      {
        text: '分享',
        icon: 'reco-message',
        items: [
          {
            text: 'GitHub',
            link: 'https://github.com/7026',
            icon: 'reco-github',
          },
        ],
      },
    ],

    //侧边栏设置
    sidebar: {
      '/docs/theme-reco/': ['', 'theme', 'plugin', 'api'],
    },
    type: 'blog',
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: '分类', // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: '标签', // 默认 “标签”
      },
    },
    //友情链接
    friendLink: [
      {
        title: '午后南杂',
        desc: 'Enjoy when you can, and endure when you must.',
        email: '1156743527@qq.com',
        link: 'https://www.recoluan.com',
      },
      {
        title: 'vuepress-theme-reco',
        desc: 'A simple and beautiful vuepress Blog & Doc theme.',
        avatar:
          'https://vuepress-theme-reco.recoluan.com/icon_vuepress_reco.png',
        link: 'https://vuepress-theme-reco.recoluan.com',
      },
    ],
    //博客自定义LOGO
    logo: '/logo.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    // sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'MrYu',
    // 作者头像
    authorAvatar: '/avatar.png',
    // 备案号
    record: 'xxxx',
    // 项目开始时间
    startYear: '2020',
    /**
     * 密钥 (if your blog is private)
     */

    //私有仓库key和密码
    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     *评论
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
  },
  // 插件
  plugins: [
    [
      'dynamic-title',
      {
        showIcon: '/favicon.ico',
        showText: '(/≧▽≦/)咦！又好了！',
        hideIcon: '/failure.ico',
        hideText: '(●—●)喔哟，崩溃啦！',
        recoverTime: 2000,
      },
    ],
    // BgnNusic
    [
      BgmMusic,
      {
        audios: [
          {
            name: '能够成家吗',
            artist: '咖啡少年',
            url: 'https://assets.smallsunnyfox.com/music/1.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/1.jpg',
          },
          {
            name: '江南地铁站4号出口',
            artist: 'Plastic / Fallin` Dild',
            url: 'https://assets.smallsunnyfox.com/music/2.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/2.jpg',
          },
          {
            name: '用胳膊当枕头',
            artist: '최낙타',
            url: 'https://assets.smallsunnyfox.com/music/3.mp3',
            cover: 'https://assets.smallsunnyfox.com/music/3.jpg',
          },
        ],
        autoplay: true,
      },
    ],
    // [
    //   '@vuepress-reco/comments',
    //   {
    //     solution: 'vssue',
    //     options: {
    //       title: 'vuepress-theme-reco',
    //       platform: 'gitee', //gitee 代码托管平台
    //       owner: 'OWNER_OF_REPO',
    //       repo: 'NAME_OF_REPO',
    //       //https://vssue.js.org/zh/guide/gitee.html#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%96%B0%E7%9A%84%E7%AC%AC%E4%B8%89%E6%96%B9%E5%BA%94%E7%94%A8
    //       clientId:
    //         '95041f7069a30cf846c10e3b7c423649246bc97d9a783c1ecd02cccbc4bf233e',
    //       clientSecret:
    //         '624937e7b8092cd235f70b174369e74ef4cb07963a698604a3ed31d08b4a81fc',
    //     },
    //   },
    // ],
    [
      '@vuepress-reco/comments',
      {
        solution: 'vssue',
        options: {
          title: 'vuepress-theme-reco',
          platform: 'github', //gitee 代码托管平台
          owner: '7026',
          repo: 'Blog',
          //https://vuepress-theme-reco.recoluan.com/views/plugins/comments.html
          clientId: ' Iv1.b06e8a986da8c1a6',
          clientSecret: '552bf2cb3bc5e8c41b79078088ccde4caca56c35',
        },
      },
    ],
  ],
  markdown: {
    lineNumbers: true,
  },
}
