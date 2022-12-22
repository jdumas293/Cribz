const express = require('express');

const { Spot, SpotImage, Review, User } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// middleware to validate spot creation
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .withMessage('Street address is required'),
    check('city')
        .exists({ checkFalsy: true })
        .withMessage('City is required'),
    check('state')
        .exists({ checkFalsy: true })
        .withMessage('State is required'),
    check('country')
        .exists({ checkFalsy: true })
        .withMessage('Country is required'),
    check('lat')
        .exists({ checkFalsy: true })
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength( { max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .withMessage('Description is required'),
    check('price')
        .exists({ checkFalsy: true })
        .withMessage('Price per day is required'),
    handleValidationErrors
]


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

    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach(spot => {

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

    res.json({ Spots });
});

// Get Spots of Current User
router.get('/current', requireAuth, async (req, res) => {
    const spots = await Spot.findAll({
        where: {
            ownerId: req.user.id
        },
        include: [
            {
                model: Review
            },
            {
                model: SpotImage
            }
        ]
    });

    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach(spot => {

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

    res.json({ Spots });
})

// Get Details of Spot by Id
router.get('/:spotId', async (req, res) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId,
        },
        include: [
            {
                model: SpotImage,
                attributes: ['id', 'url', 'preview']
            },
            {
                model: Review
            },
            {
                model: User,
                as: "Owner",
                attributes: ["id", "firstName", "lastName"]
            }
        ],
    })

    if (!spot) {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    let details = spot.toJSON();

    // number of reviews
    details.numReviews = spot.Reviews.length;

    // average star rating
    let starCount = 0;
    spot.Reviews.forEach(review => {
        starCount += review.stars;
        details.avgStarRating = starCount / spot.Reviews.length;
    })

    delete details.Reviews;

    res.json(details);
})


// Create a spot
router.post('/', requireAuth, validateSpot, async (req, res) => {
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

    // if (validateSpot) {
    //     res.json({
    //         message: "Validation Error",
    //         statusCode: 400,
    //         errors: validateSpot.errors
    //     })
    // }

    res.json(spot);
});


// Add an image to a spot
router.post('/:spotId/images', requireAuth, async (req, res) => {
    const { url, preview } = req.body;
    // query for spot to add image
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        },
        include: {
            model: SpotImage,
        }
    });

    // spot must belong to current user
    if (spot.ownerId === req.user.id) {
        await SpotImage.create({
            spotId: req.params.spotId,
            url: url,
            preview: preview
        });
    } else {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // query for new spot image
    const newSpotImage = await SpotImage.findOne({
        where: {
            url: url
        },
        attributes: ['id', 'url', 'preview']
    })

    res.json(newSpotImage);
})


// Edit a spot
router.put('/:spotId', requireAuth, validateSpot, async (req, res) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;

    const spotUpdate = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    });

    // spot must belong to current user
    if (spotUpdate.ownerId === req.user.id) {
        spotUpdate.update({
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
    } else {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    res.json(spotUpdate);
});


// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spotDelete = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    });

    // spot must belong to current user
    if (spotDelete.ownerId === req.user.id) {
        await spotDelete.destroy();
    } else {
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    res.json({
        message: "Successfully deleted",
        statusCode: 200
    });
});


module.exports = router;
