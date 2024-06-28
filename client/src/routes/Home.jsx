import React from 'react';
import Header from '../elements/Header.jsx';
import AddRestaurant from '../elements/AddRestaurant.jsx';
import RestaurantList from '../elements/RestaurantList.jsx';
import Header2 from '../elements/SubHeader.jsx';




const Home = () => {
    return (
        <div>
            <Header/>
            <Header2/>
            <RestaurantList/>
            <AddRestaurant/>
        </div>
    )
}

export default Home
