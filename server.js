var express = require('express')
var hbs = require('express-hbs')
var app = express()

var config = {
	root: '/public',
	views: '/app/views',
	layouts: '/app/layouts',
	partials: '/app/partials'
}

app.set('view engine', 'hbs');

app.engine('hbs', hbs.express4({
  partialsDir: __dirname + config.partials,
  layoutsDir: __dirname + config.layouts
}));

app.set('views', __dirname + config.views);

app.use(express.static(__dirname + config.root));

app.get('/', function (req, res) {
	res.render(__dirname + config.views + '/index.hbs')
})

app.listen(3000, function () {
  console.log('Dev server listening on port 3000!')
})