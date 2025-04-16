const CracoLessPlugin= require('craco-less');
const path =require('path');
const pathResolve=(pathUrl)=>path.join(__dirname,pathUrl);
module.exports={
  webpack:{
    alias:{
      "@":pathResolve('src'),
    },
    devtool: 'eval-source-map',
  },
    // 添加babel插件以支持装饰器语法
    babel:{
        plugin:[["@babel/plugin-proposal-decroators",{legacy:true}]],
    },
    // 配置了less支持+css modules
    plugins: [
        {
          plugin: CracoLessPlugin,
          options: {
            lessLoaderOptions: {
              lessOptions: { javascriptEnabled: true },
            },
            modifyLessRule: function () {
              return {
                test: /\.less$/,
                exclude: /node_modules/,
                use: [
                  { loader: "style-loader" },
                  {
                    loader: "css-loader",
                    options: {
                      modules: {
                        localIdentName: "[local]_[hash:base64:6]",
                      },
                    },
                  },
                  { loader: "less-loader" },
                ],
              };
            },
          },
        },
      ],
    };