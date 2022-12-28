const express = require('express');

const { SpotImage, Spot } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


router.delete('/:imageId', requireAuth, async (req, res) => {
    const image = await SpotImage.findOne({
        where: {
            id: req.params.imageId
        },
        include: {
            model: Spot
        }
    });

    if (!image) {
        res.status(404);
        res.json({
            message: "Spot Image couldn't be found",
            statusCode: 404
        });
    };

    if (image.Spot.ownerId === req.user.id) {
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