
import './hero.css'
import hero from './images/hero.jpg'
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <div>
      <div className="hero">
        <div className='chero'>
          <p>
            <b>
              <i>
                Style Meet Comfort - Shop Trendy Fashion Today <br />
                {}
                <Link to='/Trends'>
                  <button>ShopNow</button>
                </Link>
              </i>
            </b>
          </p>
        </div>  
        <img src={hero} className='himg' alt="Hero Banner" />
      </div>

      <br />
      <br />
      <p id='heading'>EXCLUSIVE STYLES</p>
    </div>
  )
}
