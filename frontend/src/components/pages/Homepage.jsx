import { useState, useEffect } from "react"
import NavigationBar from "../molecules/NavigationBar"
import Footer from "../molecules/Footer"
import BatmanVsPredator from "../../assets/batmanvspredator.jpg"
import DemonSlayerFullSquad from "../../assets/demonslayerfullsquad.jpg"
import ElricBrothersSitting from "../../assets/fullmetalelricbrotherssitting.jpg"
import { Carousel } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css'
import "../../General.css";

export default function HomePage(){
    const [activeSlide, setActiveSlide] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
          // Increment the active slide index
          setActiveSlide((prevSlide) => (prevSlide + 1) % 3);
        }, 5000);
    
        return () => {
          // Clear the interval when the component unmounts
          clearInterval(interval);
        };
      }, []);


      const welcome = "Welcome to ComicAlert";



    return(
        <>
        <NavigationBar showLoginButton={true} showRegisterButton={true}/>
        <div className="carousel-container">
            <Carousel showThumbs={false} selectedItem={activeSlide} onChange={setActiveSlide} className="carousel">
        <div className="image-container-main-page">
        <div className="image-overlay">
              <h3>{welcome}</h3>
            </div>
          <img src={BatmanVsPredator} alt="Image 1" />
        </div>
        <div className="image-container-main-page">
        <div className="image-overlay">
              <h3>{welcome}</h3>
            </div>
          <img src={DemonSlayerFullSquad} alt="Image 2" />
        </div>
        <div className="image-container-main-page">
        <div className="image-overlay">
              <h3>{welcome}</h3>
            </div>
          <img src={ElricBrothersSitting} alt="Image 3" />
        </div>
      </Carousel>
      </div>
      <Footer />
      

            </>

    )
}