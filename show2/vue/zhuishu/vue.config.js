module.exports = {
  configureWebpack: {
    devServer: {
      proxy: {
        "/categories": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/sub-categories": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/category-info": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/book-info": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/search": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/recommend": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/author-books": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        //http://novel.kele8.cn/book-sources?view=summary&book=567d2cb9ee0e56bc713cb2c0
        "/book-sources": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        //http://novel.kele8.cn/book-chapters/56f8da09176d03ac1983f6cd
        "/book-chapters": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        //http://novel.kele8.cn/chapters/http%3A%2F%2Fvip.zhuishushenqi.com%2Fchapter%2F56f8da09176d03ac1983f6d7%3Fcv%3D1486473051386
        "/chapters": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/rank-category": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/rank": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/auto-complete": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/booklists": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/book/discussions": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/book/reviews": {
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        },
        "/chapters":{
          target: "http://novel.kele8.cn",
          changeOrigin: true,
        }
      },
    },
  },
};
