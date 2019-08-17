import React from 'react'
import Slider from "react-slick";

import shadows from '../../config/theming/shadows'
import styled from 'styled-components'

const SliderDiv = styled.div`
        .slick-active > div {
            background: #444444!important
        }

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
                centerMode: true,
                autoplay: true,
                lazyload: true,
                dots: true,

                customPaging: i => (
                    <div
                        style={{
                            width: "10px",
                            height: "10px",
                            background: "#ccc",
                            borderRadius: "50%",
                            zIndex: "2",
                            margin: "10px 0 0"
                        }}
                    >
                    </div>
                ),
                autoplaySpeed: 4000,
                infinite: true,
                centerPadding: "0",
                slidesToShow: 3,
                speed: 500,
                responsive: [
                    {
                        breakpoint: 1024,
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