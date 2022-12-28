const express = require('express');

const { ReviewImage, Review } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await ReviewImage.findOne({
        where: {
            id: req.params.imageId
        },
        include: {
            model: Review
        }
    });

    if (!image) {
        res.status(404);
        res.json({
            message: "Review Image couldn't be found",
            statusCode: 404
        });
    };

    if (image.Review.userId === req.user.id) {
        await image.destroy();
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