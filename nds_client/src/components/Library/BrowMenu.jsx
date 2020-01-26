import React, { Fragment, useEffect, useState} from 'react'

import Search from "./Search";
import Filter from "./Filter";


const BrowMenu = React.memo(props) => {
    useState( search );

    const submitSearch = event => {
        event.preventDefault();
    };

    return (
<Fragment>
    <div className="cont">
        <Search />
        <form onSubmit={submitSearch}>
            <div className="form-cont">
                <label htmlFor="search">Search Library</label>
                <input type="text" id="search"></input>
            </div>
            <div className="btn submit search">
                <button type="submit">Search</button>
            </div>
        </form>
        <Filter />
    </div>
</Fragment>
    )
}

export default BrowMenu
