const BookingCard = ({ booking }) => {
    return (
        <>
            <div>
                Name: {booking.Spot.name}
            </div>
            <div>
                Location: {booking.Spot.city}, {booking.Spot.state}
            </div>
            <div>
                Start Date: {booking.startDate}
            </div>
            <div>
                End Date: {booking.endDate}
            </div>
            <div>
                Price: {booking.Spot.price}
            </div>
        </>
    )
}

export default BookingCard;