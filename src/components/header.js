import React, { useContext, useEffect, useRef } from 'react'
import './header.scss'
import { WeatherContext } from "../App";
function Header() {
    const data = useContext(WeatherContext)
    const ref = useRef(null)
    useEffect(() => {
        ref.current.focus()
    }, [])
    return (
        <div className='header'>
            <input
                ref={ref}
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