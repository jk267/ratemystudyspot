import React, { useState, createContext } from 'react';


export const RestaurantContext = createContext();

export const RestaurantContextProvider = props => {
    const [restaurants, setRestaurants] = useState([]) // restauratns hold the list of restaurat object and the setRestaurant holds the selevted state.
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);
    const addRestaurants = (restaurant) => {
        setRestaurants([...restaurants, restaurant]);
    };

    return (

        <RestaurantContext.Provider value={{
            restaurants,
            setRestaurants, 
            addRestaurants, 
            selectedRestaurant,
            setSelectedRestaurant,
        }}>
            {props.children}
        </RestaurantContext.Provider>
    );
};

