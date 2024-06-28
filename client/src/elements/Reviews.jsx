import React from "react";
import StarRatings from "./StarRatings";

const Reviews = ({ reviews }) => {
    return (
        <div className="container">
            {Array.isArray(reviews) && reviews.map((review) => (
                <div key={review.id} className="row align-items-center mb-3 p-2 bg-primary text-white rounded">
                    <div className="col-md-3">{review.name}</div>
                    <div className="col-md-2">
                        <StarRatings rating={review.rating} />
                    </div>
                    <div className="col-md-7">{review.review}</div>
                </div>
            ))}
        </div>
    );
};

export default Reviews;
