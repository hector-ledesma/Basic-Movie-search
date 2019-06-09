var express = require('express');
var app = express();
var request = require('request');

app.set('view engine', 'ejs');

app.get('/', (req, res) => {
	res.render('search');
});

app.get('/results', (req, res) => {
	var query = req.query.search;
	request(`https://www.omdbapi.com/?s=${query}&apikey=thewdb`, (error, response, body) => {
		if (!error && response.statusCode == 200) {
			var data = JSON.parse(body);
			res.render('results', {data: data});
		}
	});
});

app.listen(process.env.port || 3001, () => {
	console.log('Server is listening');
});