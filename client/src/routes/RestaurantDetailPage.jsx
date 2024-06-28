import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { RestaurantContext } from "../context/RestaurantContext";
import RestaurantFinder from "../api/RestaurantFinder";
import Reviews from '../elements/Reviews'
import Header from "../elements/Header";
import AddReview from "../elements/AddReview";
import StarRatings from "../elements/StarRatings";

const RestaurantDetailPage = () => {

    const { id } = useParams();
    const { selectedRestaurant, setSelectedRestaurant } = useContext(
        RestaurantContext
    );


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get(`/${id}`);
                //console.log(response);

                setSelectedRestaurant(response.data.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchData();
    }, []);
    return (
        <div>
            <Header/>
            {selectedRestaurant && (
                <>
                    <h1 className="text-center display-1">
                        {selectedRestaurant.restaurant.name}
                    </h1>
                    <div className="text-center">
                        <StarRatings rating={selectedRestaurant.restaurant.average_rating} />
                        <span className="text-warning ml-1">
                            {selectedRestaurant.restaurant.count
                                ? `(${selectedRestaurant.restaurant.count})`
                                : "(0)"}
                        </span>
                    </div>
                    <div className="mt-3">
                        <Reviews reviews={selectedRestaurant.reviews} />
                    </div>
                    <AddReview />
                </>
            )}
        </div>



    );
};
export default RestaurantDetailPage
