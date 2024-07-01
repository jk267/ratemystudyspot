import React, { useEffect, useContext } from 'react'
import RestaurantFinder from '../api/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext'
import { useNavigate } from 'react-router-dom';
import StarRatings from './StarRatings';

const RestaurantList = (props) => {
    const { restaurants, setRestaurants } = useContext(RestaurantContext);

    let history = useNavigate()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await RestaurantFinder.get("/");
                console.log(response);
                setRestaurants(response.data.data.restaurant);
            } catch (err) { }
        };

        fetchData();
    }, []);

    const deleteRestaurant = async (e, id) => {
        e.stopPropagation();
        try {
            const response = await RestaurantFinder.delete(`/${id}`);
            //console.log(response);

            //this part below is used for updating the ui
            setRestaurants(restaurants.filter(restaurant => {
                return restaurant.id !== id // review this method once more
            }));

        } catch (err) {
            console.log(err);
        }

    };
    const handelUpdate = (e, id) => {
        e.stopPropagation();
        history(`restaurants/${id}/update`); //adding url into history stack
    };

    const handleRestaurantDetail = (id) => {

        history(`restaurants/${id}`);
    };


    const renderRating = (restaurant) => {
        if (!restaurant.count) {
            return <span className="text-warning">0 reviews</span>;
        }
        return (
            <>
                <StarRatings rating={restaurant.average_rating} />
                <span className="text-warning ml-1">({restaurant.count})</span>
            </>
        );
    };


    // dont run when the component mount
    return (
        <div className='list-group'>
            <table className="table table-hover table-dark">
                <thead>
                    <tr className="bg-primary">
                        <th scope='col'>Name</th>
                        <th scope='col'>Building</th>
                        <th scope='col'>Rating</th>
                        <th scope='col'>Rating</th>
                        <th scope='col'>Edit</th>
                        <th scope='col'>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {restaurants && restaurants.map(restaurant => {
                        return (
                            <tr onClick={() => handleRestaurantDetail(restaurant.id)} key={restaurant.id}>
                                <td>{restaurant.name}</td>
                                <td>{restaurant.location}</td>
                                <td>{"$".repeat(restaurant.price_range)}</td>
                                <td>{renderRating(restaurant)}</td>
                                <td><button onClick={(e) => handelUpdate(e, restaurant.id)} className="btn btn-warning">Update</button></td>
                                <td><button onClick={(e) => deleteRestaurant(e, restaurant.id)} className="btn btn-warning">Delete</button></td>
                            </tr> // () is reference
                        );

                    })}

                </tbody>
            </table>

        </div>
    )
}

export default RestaurantList
