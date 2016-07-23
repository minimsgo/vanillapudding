module.exports = function (app) {
  var models = app.models();
  var ds = app.dataSources.VanillaPuddingDataSource;
  models.forEach(function (Model) {
    ds.once('connected', function () {
      ds.autoupdate(Model.modelName, function (err) {
        if (err) throw err;
      })
    })
  })
}
