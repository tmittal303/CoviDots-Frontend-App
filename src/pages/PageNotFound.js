import React from 'react';
import "../css/App.css";

const PageNotFound = () => {
    return (
        <div className="notfound-404">
            <h1>404</h1><br></br>
            <h2>OOPS! Nothing was found</h2><br></br>
            <p>
                The page you are looking for might have been removed, had its name changed or is temporarily unavailable. <a href="/">Return to homepage</a>
            </p>
        </div>
    )
}

export default PageNotFound
