const express = require('express');

const { Booking, Spot, SpotImage } = require('../../db/models');
const { requireAuth } = require('../../utils/auth');

const router = express.Router();


// Get all Current User Bookings
router.get('/current', requireAuth, async (req, res) => {
    const bookings = await Booking.findAll({
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

    let Bookings = [];
    bookings.forEach(booking => {
        Bookings.push(booking.toJSON());
    })

    Bookings.forEach(booking => {
        booking.Spot.SpotImages.forEach(image => {
           booking.Spot.previewImage = image.url;
        })

        delete booking.Spot.SpotImages;
    })

    res.json({ Bookings });
});


module.exports = router;
