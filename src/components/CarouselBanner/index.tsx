import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import banners from 'json/banners.json';
import Banner from "components/Banner";
import './CarouselBanner.scss';

export default function CarouselBanner() {
    const responsive = {
        default: {
          breakpoint: { max: 3000, min: 0 },
          items: 1,
          slidesToSlide: 1
        }
    };

    return (
        <Carousel
            swipeable={false}
            draggable={true}
            showDots={false}
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={false}
            keyBoardControl={true}
            customTransition="all .5s"
            transitionDuration={500}
            containerClass="carousel-container"
            dotListClass="custom-dot-list-style"
            itemClass="carousel-item-padding-40-px"
        >
            {banners.map((banner, index) => (
                <Banner key={index} {...banner} />
            ))}
            
        </Carousel>
    )
}