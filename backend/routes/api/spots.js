const express = require('express');

const { Spot, SpotImage, Review, User, ReviewImage, Booking } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();

// middleware to validate spot creation
const validateSpot = [
    check('address')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Street address must be less than 50 characters'),
    check('city')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('City must be less than 50 characters'),
    check('state')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('State must be less than 50 characters'),
    check('country')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Country must be less than 50 characters'),
    check('lat')
        .exists({ checkFalsy: true })
        .isFloat({ min: -90, max: 90})
        .withMessage('Latitude is not valid'),
    check('lng')
        .exists({ checkFalsy: true })
        .isFloat({ min: -180, max: 180 })
        .withMessage('Longitude is not valid'),
    check('name')
        .exists({ checkFalsy: true })
        .isLength({ max: 50 })
        .withMessage('Name must be less than 50 characters'),
    check('description')
        .exists({ checkFalsy: true })
        .isLength({ max: 140 })
        .withMessage('Description must be less than 140 characters'),
    check('price')
        .exists({ checkFalsy: true })
        .isFloat({ min: 1, max: 50000})
        .withMessage('Price cannot exceed $50,000'),
    handleValidationErrors
];

// middleware to validate review creation
const validateReview = [
    check('review')
        .exists({ checkFalsy: true })
        .isLength({ max: 140 })
        .withMessage('Review must be less than 140 characters'),
    check('stars')
        .exists({ checkFalsy: true })
        .isFloat({ min: 1, max: 5 })
        .withMessage('Stars must be an integer from 1 to 5'),
    handleValidationErrors
];

// Get all spots
router.get('/', async (req, res) => {
    let { page, size } = req.query;

    page = parseInt(page);
    size = parseInt(size);

    if (Number.isNaN(page)) page = 1; // default 1
    if (Number.isNaN(size)) size = 20; // default 20

    if (page > 10) page = 10; // max 10
    if (size > 20) size = 20; // max 20

    if (page < 1 || size < 1) { // min 1 - validation error if less than 1
        res.status(400);
        res.json({
            message: "Validation Error",
            statusCode: 400,
            errors: { page: "Page must be greater than or equal to 1", size: "Size must be greater than or equal to 1" }
        });
    };

    const spots = await Spot.findAll({
        include: [
            {
                model: Review,
            },
            {
                model: SpotImage,
            },
        ],
        limit: size,
        offset: (page - 1) * size
    });

    let Spots = [];
    spots.forEach(spot => {
        Spots.push(spot.toJSON());
    })

    Spots.forEach(spot => {
        let starCount = 0;
        if (spot.Reviews.length) {
            spot.Reviews.forEach(review => {
                starCount += review.stars;
                spot.avgRating = starCount / spot.Reviews.length;
            });
        } else {
            spot.avgRating = "no reviews";
        };

        if (spot.SpotImages.length) {
            spot.SpotImages.forEach(image => {
                if (image.preview === true) {
                    spot.previewImage = image.url;
                } else {
                    spot.previewImage = "no preview image";
                }
            });
        } else {
            spot.previewImage = "no preview image";
        };

        delete spot.SpotImages;
        delete spot.Reviews;
    });

    res.json({
        Spots,
        page,
        size
    });
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
        if (spot.Reviews.length) {
            spot.Reviews.forEach(review => {
                starCount += review.stars;
                spot.avgRating = starCount / spot.Reviews.length;
            });
        } else {
            spot.avgRating = "no reviews";
        };

        if (spot.SpotImages.length) {
            spot.SpotImages.forEach(image => {
                if (image.preview === true) {
                    spot.previewImage = image.url;
                } else {
                    spot.previewImage = "no preview image"
                }
            });
        } else {
            spot.previewImage = "no preview image";
        };

        delete spot.SpotImages;
        delete spot.Reviews;
    });

    res.json({ Spots });
});

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
        res.status(404);
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
    if (spot.Reviews.length) {
        spot.Reviews.forEach(review => {
            starCount += review.stars;
            details.avgStarRating = starCount / spot.Reviews.length;
        });
    } else {
        details.avgStarRating = "no reviews";
    };

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
    });

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

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    // spot must belong to current user
    if (spot.ownerId === req.user.id) {
        await SpotImage.create({
            spotId: req.params.spotId,
            url: url,
            preview: preview
        });
    } else {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };

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

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    });

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    // spot must belong to current user
    if (spot.ownerId === req.user.id) {
        spot.update({
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
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    res.json(spot);
});


// Delete a spot
router.delete('/:spotId', requireAuth, async (req, res) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    });

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    // spot must belong to current user
    if (spot.ownerId === req.user.id) {
        await spot.destroy();
        res.json({
            message: "Successfully deleted",
            statusCode: 200
        });
    } else {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };
});



// REVIEW ROUTES

// Get all Reviews by Spot Id
router.get('/:spotId/reviews', async (req, res) => {
    const spot = await Spot.findByPk(req.params.spotId);

    if (!spot) {
        res.status(404);
        return res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    }

    const reviews = await Review.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    });

    let Reviews = [];
    reviews.forEach(review => {
        Reviews.push(review.toJSON());
    })

    return res.json({ Reviews });
})


// Create a Review for a Spot by Id
router.post('/:spotId/reviews', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    });

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    };

    const existingReview = await Review.findOne({
        where: {
            userId: req.user.id,
            spotId: req.params.spotId
        }
    });

    // if review already exists
    if (existingReview) {
        res.status(403);
        res.json({
            message: "User already has a review for this spot",
            statusCode: 403
        })
    };

    const userReview = await Review.create({
        userId: req.user.id,
        spotId: req.params.spotId,
        review: review,
        stars: stars
    });

    res.json(userReview);
})


// BOOKING ROUTES

// Get all Bookings by Spot Id
router.get('/:spotId/bookings', requireAuth, async (req, res) => {
    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    });

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        });
    };

    const notOwnerBooking = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        attributes: ['spotId', 'startDate', 'endDate']
    })

    const ownerBooking = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        },
        include: {
            model: User,
            attributes: ['id', 'firstName', 'lastName']
        }
    });

    // if current user is owner
    if (req.user.id === spot.ownerId) {
        res.json({
            Bookings: ownerBooking
        });
    // if current user is not owner
    } else {
        res.json({
            Bookings: notOwnerBooking
        });
    };
});


// Create a Booking for a Spot by Id
router.post('/:spotId/bookings', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;

    const spot = await Spot.findOne({
        where: {
            id: req.params.spotId
        }
    });

    if (!spot) {
        res.status(404);
        res.json({
            message: "Spot couldn't be found",
            statusCode: 404
        })
    };

    const currentBookings = await Booking.findAll({
        where: {
            spotId: req.params.spotId
        }
    });

    // check for booking conflicts
    for (const booking of currentBookings) {
        currentStart = booking.startDate.getTime();
        currentEnd = booking.endDate.getTime();

        newStart = new Date(startDate).getTime();
        newEnd = new Date(endDate).getTime();

        if (newEnd <= newStart) {
            res.status(400);
            return res.json({
                message: "Validation error",
                statusCode: 400,
                errors: { endDate: "endDate cannot be on or before startDate" }
            });
        };

        if (newStart >= currentStart && newEnd <= currentEnd) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: { startDate: "Start date conflicts with an existing booking", endDate: "End date conflicts with an existing booking" }
            });
        };

        if (newStart >= currentStart && newStart <= currentEnd) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: { startDate: "Start date conflicts with an existing booking", endDate: "End date conflicts with an existing booking" }
            });
        };

        if (newStart <= currentStart && newEnd <= currentEnd && currentStart <= newEnd) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: { startDate: "Start date conflicts with an existing booking", endDate: "End date conflicts with an existing booking" }
            });
        };

        if ((newStart <= currentStart && newEnd >= currentEnd) && (currentStart >= newStart && currentStart <= newEnd) && (currentEnd >= newStart && currentEnd <= newEnd)) {
            res.status(403);
            return res.json({
                message: "Sorry, this spot is already booked for the specified dates",
                statusCode: 403,
                errors: { startDate: "Start date conflicts with an existing booking", endDate: "End date conflicts with an existing booking" }
            });
        };
    };

    // if current user is not the spot owner - create booking
    if (spot.ownerId !== req.user.id) {
        const userBooking = await Booking.create({
            spotId: req.params.spotId,
            userId: req.user.id,
            startDate: startDate,
            endDate: endDate
        });
        res.json(userBooking);
    } else {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };
});


module.exports = router;
