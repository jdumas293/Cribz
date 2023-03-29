const express = require('express');
const { Like, Spot, SpotImage  } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();

// GET LIKES OF CURRENT USER
router.get('/current', requireAuth, async (req, res) => {
    const likes = await Like.findAll({
        where: {
            userId: req.user.id
        },
        include: [
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: {
                    model: SpotImage,
                    attributes: ['url']
                }
            }
        ]
    });

    let Likes = [];
    likes.forEach(like => {
        Likes.push(like.toJSON());
    })

    res.json({ Likes });
});

// DELETE A LIKE 
router.delete('/:likeId', requireAuth, async (req, res) => {
    const like = await Like.findByPk(req.params.likeId);
    console.log("LIKE DELETE", like);

    if (!like) {
        res.status(404);
        res.json({
            message: "Like couldn't be found",
            statusCode: 404
        });
    };

    if (like.userId === req.user.id) {
        await like.destroy();
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