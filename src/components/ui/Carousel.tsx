import React from 'react';
import { Link } from 'react-router-dom';

interface CarouselItem {
  id: number;
  image: string;
  title: string;
  caption: string;
}

interface CarouselProps {
  items: CarouselItem[];
}

const Carousel: React.FC<CarouselProps> = ({ items }) => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide p1" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {items.map((item, index) => (
          <button
            key={`indicator-${item.id}`}
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to={index}
            className={index === 0 ? "active" : ""}
            aria-current={index === 0 ? "true" : undefined}
            aria-label={`Slide ${index + 1}`}
          ></button>
        ))}
      </div>
      
      <div className="carousel-inner">
        {items.map((item, index) => (
          <div key={`slide-${item.id}`} className={`carousel-item ${index === 0 ? "active" : ""}`}>
            <Link to="/projects">
              <img src={item.image} className="d-block w-100" alt={item.title} />
            </Link>
            <div className="carousel-caption d-none d-md-block">
              <h5>{item.title}</h5>
              <p>{item.caption}</p>
            </div>
          </div>
        ))}
      </div>
      
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default Carousel;