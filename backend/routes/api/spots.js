const express = require('express');

const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');

const { requireAuth } = require('../../utils/auth');

const router = express.Router();


// Get all spots
router.get('/', async (req, res) => {
    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage,
            },
        ],
    });

    let spotsList = [];
    spots.forEach(spot => {
        spotsList.push(spot.toJSON());
    })

    spotsList.forEach(spot => {

        let starCount = 0;
        spot.Reviews.forEach(review => {
            starCount += review.stars;
            spot.avgRating = starCount / spot.Reviews.length;
        })

        spot.SpotImages.forEach(image => {
            if (image.preview === true) {
                spot.previewImage = image.url;
            }
        })
        delete spot.SpotImages;
        delete spot.Reviews;
    })

    res.json(spotsList);
});

// Create a spot
router.post('/', requireAuth, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spot = await Spot.create({
        ownerId: req.user.id,
        address: address,
        city: city,
        state: state,
        country: country,
        lat: lat,
        lng: lng,
        name: name,
        description: description,
        price: price
    })

    res.json(spot);
})

module.exports = router;
