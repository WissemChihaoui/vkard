// import { benefits } from "../constants";

// import { GradientLight } from "./design/Benefits";
// import ClipPath from "../assets/svg/ClipPath";
import Heading from "../../components/heading/heading";
import { whyUsVars } from "../../constants";
import Section from "../../components/section/Section";
import Arrow from "../../assets/svg/Arrow";
import { GradientLight } from "../../components/UI/Benefits";
import ClipPath from "../../assets/svg/ClipPath";

const Benefits = () => {
  return (
    <Section crosses id="features" className="xl:py-12 lg:py-8">
      <div className="container relative z-2">
      <Heading tag="Pourquoi choisir V-Carte, une carte NFC en bois pour équiper son entreprise ?" title="Pourquoi Nous?" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 mb-10">
          {whyUsVars.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] mx-auto w-full"
              style={{ backgroundImage: `url("${item.backgroundUrl}")` }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[5rem] p-[2.4rem] pointer-events-none">
              <div className=" gap-4 flex items-center mb-3">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  
                </div>
                <p className="body-2 text-n-3">{item.text}</p>
                
              </div>

              {item.light && <GradientLight />}

              <div
                className="absolute inset-0.5 bg-n-7 opacity-75 hover:opacity-100 duration-200"
                style={{ clipPath: "url(#benefits)" }}
              >
                
              </div>

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
