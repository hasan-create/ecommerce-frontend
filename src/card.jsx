import './card.css'
export default  function Card({image,title,price}){
    return(
        <div className="card"><img src={image}/>
        <p><b>{title}</b></p>
         <p><b>${price}</b></p></div>
       
        
    )
}