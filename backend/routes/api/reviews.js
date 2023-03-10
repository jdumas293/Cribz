const express = require('express');

const { Review, Spot, ReviewImage, User, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

const router = express.Router();


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

// Get Reviews of Current User
router.get('/current', requireAuth, async (req, res) => {
    const reviews = await Review.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: {
                    model: SpotImage
                }
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
    });

    Reviews.forEach(review => {
        review.Spot.SpotImages.forEach(image => {
            review.Spot.previewImage = image.url
        });

        delete review.Spot.SpotImages;
    });

    res.json({ Reviews });
});


// Add an Image to a Review by Review Id
router.post('/:reviewId/images', requireAuth, async (req, res) => {
    const { url } = req.body;

    const review = await Review.findOne({
        where: {
            id: req.params.reviewId
        },
        include: {
            model: ReviewImage
        }
    });

    if (!review) {
        res.status(404);
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    const images = await ReviewImage.findAll({
        where: {
            reviewId: req.params.reviewId
        }
    });

    // max of 10 images per resource
    if (images.length >= 10) {
        res.status(403);
        res.json({
            message: "Maximum number of images for this resource was reached",
            statusCode: 403
        });
    };

    // review must belong to current user
    if (review.userId === req.user.id) {
        await ReviewImage.create({
            reviewId: req.params.reviewId,
            url: url
        });
    } else {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };

    // query for new review image
    const newReviewImage = await ReviewImage.findOne({
        where: {
            url: url
        },
        attributes: ['id', 'url']
    });

    res.json(newReviewImage);
});


// Edit a Review
router.put('/:reviewId', requireAuth, validateReview, async (req, res) => {
    const { review, stars } = req.body;

    const reviewUpdate = await Review.findOne({
        where: {
            id: req.params.reviewId
        }
    });

    if (!reviewUpdate) {
        res.status(404);
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    // review must belong to current user
    if (reviewUpdate.userId === req.user.id) {
        reviewUpdate.update({
            review: review,
            stars: stars
        });
        res.json(reviewUpdate);
    } else {
        res.status(403);
        res.json({
            message: "Forbidden",
            statusCode: 403
        });
    };
});


// Delete a Review
router.delete('/:reviewId', requireAuth, async (req, res) => {
    const reviewDelete = await Review.findOne({
        where: {
            id: req.params.reviewId
        }
    });

    if (!reviewDelete) {
        res.status(404);
        res.json({
            message: "Review couldn't be found",
            statusCode: 404
        });
    };

    // review must belong to current user
    if (reviewDelete.userId === req.user.id) {
        await reviewDelete.destroy();
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


module.exports = router;
