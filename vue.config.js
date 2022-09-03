module.exports = {
  devServer: {
    proxy: 'https://the-flow-manager-api.herokuapp.com'
  },
  transpileDependencies: [
    'vuetify'
  ]
}
