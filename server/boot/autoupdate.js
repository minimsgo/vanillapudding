module.exports = function (app) {
  app.dataSources.VanillaPuddingDataSource.autoupdate('Service', function(err){
    if (err) throw err;
  })
}
