import {Link} from 'react-router-dom'
import './trendhero.css'
import Navbar from './navbar';
import TRENDS from './images/TRENDS.JPG'
export default function Trend(){
    return(
<div>

    <div className='trendparent'>
 
<div className="h"><img src={TRENDS} className='hi'></img>
<div className='htext'><div className='hline'></div>OUR BEST SELLERS
&nbsp;&nbsp;<h1 className='hhading'>LATEST ARRIVALS</h1> SHOP NOW <div className='hline'></div>
</div>  <br></br><br></br><br></br><br></br><br></br> <br></br> <br></br> <br></br> <p className='tpa'>ALL&nbsp;COLLECTIONS </p>
  
</div></div></div>
   
);
}