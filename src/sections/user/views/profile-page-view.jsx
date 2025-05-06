import React from "react";
import "./profile-page-view.scss";
import {
  socialFb,
  socialGoogle,
  socialLinkedin,
  socialX,
} from "../../../assets";
import Button from "../../../components/button/Button";
export default function ProfilePageView() {
  return (
    <div className="wrapper ">
      <div className="profile">
        <div className="coverShit mb-20">
          {/* <img
            className="imageCover"
            src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?q=80&w=1640&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          /> */}
          <img
            src="https://images.unsplash.com/photo-1484186139897-d5fc6b908812?ixlib=rb-0.3.5&s=9358d797b2e1370884aa51b0ab94f706&auto=format&fit=crop&w=200&q=80%20500w"
            className="thumbnail"
          />
        </div>
        {/* <div className="check">
          <i className="fas fa-check"></i>
        </div> */}
        <h3 className="name">Beverly Little</h3>
        <p className="title">Javascript Developer</p>
        <p class="description">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque aliquam
          aliquid porro!
        </p>
        <div className="flex">
          <button type="button" className="btn">
            Email
          </button>
          <button type="button" className="btn">
            Téléphone
          </button>
        </div>
      </div>
      <h3 className="text-center text-[#3D405B] text-lg mt-4">Let's connect</h3>
      <div className="social-icons">
        <a href="/">
          <img src={socialFb} width={28} />
        </a>
        <a href="/">
          <img src={socialLinkedin} width={28} />
        </a>
        <a href="/">
          <img src={socialX} width={28} />
        </a>
        <a href="/">
          <img src={socialGoogle} width={28} />
        </a>
      </div>
      <div className="w-full flex flex-col items-center mt-12 gap-1">
        <button className="btn mx-auto">Let's meet</button>
        <button className="btn mx-auto">Our video</button>
      </div>
    </div>
  );
}
