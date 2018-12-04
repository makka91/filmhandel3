const express = require('express');
const router = express.Router();

const { Movie } = require('../models/movie');
const admin = require('../middleware/admin');
const authorization = require('../middleware/login');
const { Product } = require('../models/product');

//Läser in produkter
router.get('/', async (req, res) => {
    const products = await Product.find()
        .populate({
            path: 'movie',
            populate: {
                path: 'genre'
            }
        })
        .sort('name');
    res.send(products);
});

//Skapar ny produkt, låst till admin
router.post('/', [admin, authorization], async (req, res) => {
    try {
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('No such movie with the given ID');

        let product = new Product({
            movie: {
                _id: movie._id,
                title: movie.title,
                director: movie.director,
                releaseDate: movie.releaseDate,
                genre: movie.genre.name,
                language: movie.language
            },
            format: req.body.format,
            price: req.body.price,
            subtitles: req.body.subtitles
        });
        product = await product.save();
        res.send(product);
    }
    catch (err) {
        res.send('No such product with the given ID')
    }
});

//Uppdatera produkt, låst till admin 
router.put('/:id', [admin, authorization], async (req, res) => {
    try {
        const movie = await Movie.findById(req.body.movieId);
        if (!movie) return res.status(400).send('No such movie with the given ID');

        const product = await Product.findByIdAndUpdate(req.params.id,
            {
                movie: {
                    _id: movie._id,
                    title: movie.title,
                    director: movie.director,
                    releaseDate: movie.releaseDate,
                    genre: movie.genre.name,
                    language: movie.language,
                },
                format: req.body.format,
                price: req.body.price,
                subtitles: req.body.subtitles
            },
            { new: true });

        if (!product) return res.status(404).send('No such product with the given ID');

        res.send(product);
    }
    catch (err) {
        res.send('No such product with the given ID')
    }
});

//Radera produkt, låst till admin
router.delete('/:id', [admin, authorization], async (req, res) => {
    try {
        const product = await Product.findByIdAndRemove(req.params.id);

        if (!product) return res.status(404).send('No such product with the given ID.');

        res.send(product);
    }
    catch (err) {
        res.send('No such product with the given ID')
    }
});

//Hämta produkt med ID
router.get('/:id', async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate({
                path: 'movie',
                populate: {
                    path: 'genre'
                }
            })

        if (!product) return res.status(404).send('No such product with the given ID.');

        res.send(product);
    }
    catch (err) {
        res.send('No such product with the given ID')
    }
});


module.exports = router; 