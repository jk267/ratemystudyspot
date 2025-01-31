import React, { useContext, useState } from 'react'
import RestaurantFinder from '../api/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext'

const AddRestaurant = () => {
    const { addRestaurants } = useContext(RestaurantContext);
    const [name, setName] = useState("");
    const [location, setLocation] = useState("");
    const [priceRange, setPriceRange] = useState("Number of Stars");


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await RestaurantFinder.post("/", {
                name,
                location,
                price_range: priceRange,
            });
            addRestaurants(response.data.data.restaurant);
        } catch (err) {
            console.log(err);
        }

    };
    return (
        <div className='mb-4'>
            <form>
                <div className="row">
                    <div className="col">
                        <input value={name} onChange={e => setName(e.target.value)} type="text" className="form-control" placeholder='name' />
                    </div>
                    <div className="col">
                        <input value={location} onChange={e => setLocation(e.target.value)} type='text' className='form-control' placeholder='location' />
                    </div>
                    <div className="col">
                        <select value={priceRange} onChange={e => setPriceRange(e.target.value)} type='text' className='custom-select my-1 mr-sm-2' placeholder='Price Range'>
                            <option disabled>Number of stars</option>
                            <option value="1">*</option>
                            <option value="2">**</option>
                            <option value="3">***</option>
                            <option value="4">****</option>
                            <option value="5">*****</option>
                        </select>
                    </div>
                    <button onClick={handleSubmit} type="submit" className="btn btn-outline-dark">submit</button>
                </div>

            </form>

        </div>
    )
}

export default AddRestaurant;
