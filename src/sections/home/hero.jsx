import React, { useRef } from 'react'
import { curve, imgheader } from '../../assets';
import Section from '../../components/section/Section';
import Button from '../../components/button/Button';
import Generating from '../../components/generating/generating';
import { ScrollParallax } from 'react-just-parallax';
import { BackgroundCircles, BottomLine, Gradient } from '../../components/UI/Hero';


export default function Hero() {
  const parallaxRef = useRef(null);

  return (
    <Section
      className="pt-[12rem] -mt-[5.25rem] "
      crosses
      crossesOffset="lg:translate-y-[5.25rem]"
      customPaddings
      id="hero"
    >
      <div className="container relative flex gap-4" ref={parallaxRef}>
        <div className="relative z-1 max-w-[62rem] mx-auto text-center mb-[3.875rem] md:mb-20 lg:mb-[6.25rem]">
          <h1 className="h1 mb-6">
          La carte de visite NFC, &nbsp;digitale et&nbsp;{` `}
            <span className="inline-block relative">
            connectée{" "}
              <img
                src={curve}
                className="absolute top-full left-0 w-full xl:-mt-2"
                width={624}
                height={28}
                alt="Curve"
              />
            </span>
          </h1>
          <p className="body-1 max-w-3xl mx-auto mb-6 text-n-2 lg:mb-8">
          Le meilleur outil pour développer votre réseau, fabriqué en France 🇫🇷
          </p>
          <div className="flex gap-2">
              <Button href="/pricing" white>
                Commander {` `}
              </Button>
              <Button href="/pricing">
                Pour les équipes {` `}
              </Button>
          </div>
              {/* <CardsScroll /> */}
        </div>
<img src={imgheader} alt="" className='max-w-auto' width={320}/>
        </div>
        <div className="relative max-w-[23rem] mx-auto md:max-w-5xl">
        
          <BackgroundCircles />
        </div>
      <BottomLine />
    </Section>
  )
}
