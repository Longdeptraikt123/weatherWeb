import React, { useContext } from 'react'
import './header.scss'
import { WeatherContext } from "../App";
function Header() {
    const data = useContext(WeatherContext)
    return (
        <div className='header'>
            <input
                type="text"
                className="header-search-bar"
                placeholder='search...'
                onChange={(e) => data.setQuery(e.target.value)}
                value={data.query}
                onKeyDown={data.search}
            />
        </div>
    )
}
export default Header