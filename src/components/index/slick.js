import React from 'react'
import Slider from "react-slick";

import shadows from '../../config/theming/shadows'
import styled from 'styled-components'

const SliderDiv = styled.div`
        .slick-arrow {
            z-index:2
        }

        .slick-prev {
            left: 40px;
            text-shadow: ${shadows.text_shadows[0]};
        }

        .slick-next {
            right: 40px;
            text-shadow: ${shadows.text_shadows[0]};
        }
    `

export default function Slick(props) {
    let settings, content

    switch (props.type) {
        case "featured":
            settings = {
                className: "center",
                autoplay: true,
                lazyload: true,
                autoplaySpeed: 4000,
                infinite: true,
                centerPadding: "0",
                slidesToShow: 4,
                speed: 500,
                responsive: [
                    {
                        breakpoint: 1380,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: true
                        }
                    },
                    {
                        breakpoint: 600,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            initialSlide: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ]
            }
            content = props.content
            return (
                <>
                    <SliderDiv>
                        <Slider {...settings}>
                            {content}
                        </Slider>
                    </SliderDiv>
                </>
            )
        case "featured-loading":
            content = props.content
            return (
                <>
                    <SliderDiv style={{ display: "flex" }}>
                        {content}
                    </SliderDiv>
                </>
            )
        default:
            settings = {
                infinite: true,
                centerPadding: "60px",
                slidesToShow: 4,
                speed: 500
            }
            content = props.content
            break;
    }
}