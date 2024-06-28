import React from 'react';
import calvin from '../../src/image.png';
import { useNavigate } from 'react-router-dom';

function Header() {
    let navigate = useNavigate() 

    const headerStyle = {
        fontFamily: 'Augustine',  // Replace with your desired font-family
        fontSize: '2.5rem',               // Example: Adjust font size as needed
        fontWeight: 'bolder',             // Example: Adjust font weight as needed
        color: 'maroon',                    // Example: Adjust font color as needed
        cursor: 'pointer',  
        /* Add more styles as necessary */
    };

    const home = () => {
        navigate("/"); // Navigate to the root route ("/")
    };

    return (
        <div className='container'>
            <div>
                <div className='row align-items-center'>
                    <div className='col-auto'>
                        <img src={calvin} alt="Logo" style={{ height: 100, width: 100 }} />
                    </div>
                    <div className='col'>
                        <h1 onClick = {home} style={headerStyle}>Ratbe My Study Spot</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;
