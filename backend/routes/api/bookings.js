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
    });

    Bookings.forEach(booking => {
        booking.Spot.SpotImages.forEach(image => {
           booking.Spot.previewImage = image.url;
        });

        delete booking.Spot.SpotImages;
    });

    res.json({ Bookings });
});


// Edit a Booking
router.put('/:bookingId', requireAuth, async (req, res) => {
    const { startDate, endDate } = req.body;

    const booking = await Booking.findOne({
        where: {
            id: req.params.bookingId
        }
    });

    if (!booking) {
        res.status(404);
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    };

    newStart = new Date(startDate).getTime();
    newEnd = new Date(endDate).getTime();
    newDate = new Date().getTime();

    if (booking.endDate.getTime() <= newDate) {
        res.status(403);
        res.json({
            message: "Past bookings can't be modified",
            statusCode: 403
        });
    };

    if (newEnd <= newStart) {
        res.status(400);
        return res.json({
            message: "Validation error",
            statusCode: 400,
            errors: { endDate: "endDate cannot come before startDate" }
        });
    };

    const currentBookings = await Booking.findAll({
        where: {
            spotId: booking.spotId
        }
    });
    
    // check for booking conflicts
    for (const bookingCheck of currentBookings) { // NOT WORKING
        currentStart = bookingCheck.startDate.getTime();
        currentEnd = bookingCheck.endDate.getTime();

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

    // if current user is the booking owner - update booking
    if (booking.userId === req.user.id) {
        booking.update({
            startDate: startDate,
            endDate: endDate
        })
    } else {
        res.status(403);
        res.json({
            message: "Booking must belong to the current user"
        })
    }

    res.json(booking);
});


// Delete a Booking
router.delete('/:bookingId', requireAuth, async (req, res) => {
    const booking = await Booking.findOne({
        where: {
            id: req.params.bookingId
        }
    });

    if (!booking) {
        res.status(404);
        res.json({
            message: "Booking couldn't be found",
            statusCode: 404
        });
    };

    const newDate = new Date().getTime();

    // check if booking has started
    if (booking.startDate.getTime() <= newDate) {
        res.status(403);
        res.json({
            message: "Bookings that have been started can't be deleted",
            statusCode: 403
        });
    } else if (booking.userId === req.user.id) {
        await booking.destroy();
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
