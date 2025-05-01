// import { benefits } from "../constants";

// import { GradientLight } from "./design/Benefits";
// import ClipPath from "../assets/svg/ClipPath";
import Heading from "../../components/heading/heading";
import { benefits } from "../../constants";
import Section from "../../components/section/Section";
import Arrow from "../../assets/svg/Arrow";
import { GradientLight } from "../../components/UI/Benefits";
import ClipPath from "../../assets/svg/ClipPath";

const Benefits = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
      
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2 mb-10">
          {benefits.map((item) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem] mx-auto"
              style={{ backgroundImage: `url("${item.backgroundUrl}")` }}
              key={item.id}
            >
              <div className="relative z-2 flex flex-col min-h-[10rem] p-[2.4rem] pointer-events-none">
              <div className=" gap-4 flex items-center ">
                  <img
                    src={item.iconUrl}
                    width={48}
                    height={48}
                    alt={item.title}
                  />
                  
                <h5 className="h5 mb-5">{item.title}</h5>
                </div>
                <p className="body-2 mb-6 text-n-3">{item.text}</p>
                
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
