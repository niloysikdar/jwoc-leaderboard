import Image from "next/image";
import Logo from "../assets/jwoc_logo.svg";

const Footer = () => {
  return (
    <footer className="mt-[5rem] mx-auto mb-[2rem] flex justify-center items-center flex-col">
      <Image src={Logo} alt="Logo" height="100px" width="100px" />
      <h2 className="my-1 font-['Blanka'] text-[2rem] font-medium text-lightblack tracking-[3px]">
        JWOC
      </h2>
      <h4 className="my-1 font-codefont text-[1.6rem] font-medium text-lightblack tracking-wide">
        JGEC Winter of Code
      </h4>
      <p className="my-1 font-mainfont text-[1.2rem] font-semibold text-darkgrey tracking-wide">
        Copyright © JWOC 2022. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
