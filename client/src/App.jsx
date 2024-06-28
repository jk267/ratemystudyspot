import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './routes/Home';
import UpdatePage from './routes/UpdatePage';
import RestaurantDetailPage from './routes/RestaurantDetailPage';
import { RestaurantContextProvider } from './context/RestaurantContext';


const App = () => {
    return (
        <div style={{ backgroundColor: '#AFDDE5' }}>
            <RestaurantContextProvider>

                <div className='container'>
                    <Router>
                        <Routes>
                            <Route path="/" element={<Home />} />
                            <Route path="/restaurants/:id/update" element={<UpdatePage />} />
                            <Route path="/restaurants/:id" element={<RestaurantDetailPage />} />
                        </Routes>
                    </Router>
                </div>
            </RestaurantContextProvider>
        </div>

    )
};

export default App;