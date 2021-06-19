var moviesJSON = require('../movies.json'); // получение информации из файла json

const express = require('express');
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated, check } = require('../config/auth');

// Welcome Page
router.get('/', forwardAuthenticated, (req, res) => res.render('welcome'));

// Dashboard
router.get('/dashboard', ensureAuthenticated, (req, res) =>
  res.render('dashboard', {
    user: req.user
  })
);


module.exports.home = router.get('/home', ensureAuthenticated, (req,res) =>{

			res.render('home', {
		title : "Фильмы",
		movies : moviesJSON.movies,
		user: req.user
	})

}
);


// movie_single
module.exports.movie_single =  router.get('/movie_number/:episode_number?', ensureAuthenticated,  (req,res) => { // при написании в ссылке movie_number/3 при помощи цикла выведет другую страницу



	var episode_number = req.params.episode_number; // создание страницы для каждого фильмы, считывается с json

	var movies = moviesJSON.movies;

	if (episode_number >= 1 && episode_number <=6) {


		var movie = movies[episode_number - 1];

		var title = movie.title;

		var main_characters = movie.main_characters;

		var trailer = movie.trailer;

			res.render('movie_single', {
				movies : movies,
				title:title,
				movie : movie,
				main_characters : main_characters,
				trailer: trailer

			});


	} else {
		res.render('notFound', {
			movies: movies,
			title : "Страницы не существует"
		});
	}
});
//notFound
module.exports.notFound = function(req, res) {
	res.send("Страницы не существует");
	res.render('notFound', {
		movies:movies,
		title : "Страницы не существует"
	})
};

module.exports = router;
