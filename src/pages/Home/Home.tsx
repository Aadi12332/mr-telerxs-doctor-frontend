import Navbar from "../../components/layout/Navbar";
import {Exp1,Exp2,Exp3,ExpIcon1,ExpIcon2,ExpIcon3,ExpressIcon,Service,StandardIcon,UpsideLine,DownsideLine,Boxes,BoxesLogo,WorkImage,DarkApple,DarkAndroid,Man,Mockup,HeaderBg} from "../../assets";
import InfiniteSlider from "../../components/common/Slider";
import Footer from "../../components/layout/Footer/Footer";
import Button from "../../components/common/Button";

const Home = () => {
  return (
    <div className="pb-5">
      <Navbar />
      <section className="relative overflow-hidden rounded-2xl max-w-[1406px] mx-auto w-full px-3">
      <img
        src={HeaderBg}
        alt="Delivery service background"
        className="w-full h-[500px] md:h-[560px] object-cover rounded-2xl"
      />

      <div className="absolute inset-0 flex items-center">
        <div className="px-6 lg:pl-[119px] max-w-[900px] space-y-4 text-white">
          <h1 className="text-3xl md:text-5xl lg:text-[64px] font-medium">
            Fast, Reliable, and Secure Delivery Services
          </h1>

          <p className="text-base md:text-xl lg:text-2xl font-medium text-white">
            From parcels to packages, we deliver everything – anywhere, anytime.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <Button title="Book a Delivery"/>
            <Button title="Become a Courier"  />
          </div>
        </div>
      </div>
    </section>

      <div className="mt-[130px] max-w-[1249px] mx-auto text-center px-3">
        <h2 className="font-semibold lg:text-[44px] md:text-[40px] text-[32px] mb-2">
          Experience the EasyGo
        </h2>
        <p className="lg:text-2xl md:text-xl text-base text-[#000000B2] mb-10">
          Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          vulputate
        </p>
        <div className="flex items-center gap-6">
          <div className="relative">
            <img src={Exp1} alt="" />
            <div className="flex absolute left-4 right-4 -bottom-[49px] shadow-[0px_4px_13.1px_0px_#00000033] bg-white rounded-[16px_16px_16px_0px] overflow-hidden">
              <div className="bg-[#1D7BD8] w-[62px] h-[98px] flex justify-center items-center">
                <img src={ExpIcon1} alt="" className="" />
              </div>
              <div className="px-4 flex flex-col justify-center items-start">
                <h4 className="text-base md:text-[18px] text-black font-semibold">
                  Real-Time Tracking
                </h4>
                <p className="text-base text-black">
                  Track your shipment at every step
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={Exp2} alt="" />
            <div className="flex absolute left-4 right-4 -bottom-[49px] shadow-[0px_4px_13.1px_0px_#00000033] bg-white rounded-[16px_16px_16px_0px] overflow-hidden">
              <div className="bg-[#1D7BD8] w-[62px] h-[98px] flex justify-center items-center">
                <img src={ExpIcon2} alt="" className="" />
              </div>
              <div className="px-4 flex flex-col justify-center items-start">
                <h4 className="text-base md:text-[18px] text-black font-semibold">
                  Affordable Pricing{" "}
                </h4>
                <p className="text-base text-black">
                  Transparent and competitive rates
                </p>
              </div>
            </div>
          </div>
          <div className="relative">
            <img src={Exp3} alt="" />
            <div className="flex absolute left-4 right-4 -bottom-[49px] shadow-[0px_4px_13.1px_0px_#00000033] bg-white rounded-[16px_16px_16px_0px] overflow-hidden">
              <div className="bg-[#1D7BD8] w-[62px] h-[98px] flex justify-center items-center">
                <img src={ExpIcon3} alt="" className="" />
              </div>
              <div className="px-4 flex flex-col justify-center items-start">
                <h4 className="text-base md:text-[18px] text-black font-semibold">
                  Reliable Network{" "}
                </h4>
                <p className="text-base text-black">
                  Wide coverage and trusted couriers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[180px] max-w-[1249px] mx-auto flex lg:flex-row flex-col items-center justify-between lg:gap-4 gap-10 px-3">
        <img src={Service} alt="" className="lg:max-w-[666px]" />
        <div className="max-w-[450px]">
          <h2 className="font-semibold lg:text-[44px] md:text-[40px] text-[32px] mb-2">
            Explore Our Services
          </h2>
          <p className="lg:text-2xl md:text-xl text-base text-[#000000B2] mb-10">
            Borem ipsum dolor sit amet, consectetur adipiscing elit. Nunc
          </p>
          <div className="flex flex-col gap-8">
            <div className="flex">
              <img src={StandardIcon} alt="" className="" />
              <div className="px-4 flex flex-col justify-center items-start">
                <h4 className="text-[20px] md:text-[28px] text-black font-semibold">
                  Standard Delivery
                </h4>
                <p className="text-base md:text-[20px] text-[#000000B2]">
                  Delivery Time: 2-3 Day
                </p>
              </div>
            </div>
            <div className="flex">
              <img src={ExpressIcon} alt="" className="" />
              <div className="px-4 flex flex-col justify-center items-start">
                <h4 className="text-[20px] md:text-[28px] text-black font-semibold">
                  Express Delivery
                </h4>
                <p className="text-base md:text-[20px] text-[#000000B2]">
                  Delivery Time: 1 Day
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-[130px] max-w-[1249px] mx-auto relative">
        <div className="relative z-10">
          <img src={UpsideLine} alt="" className="" />
          <img
            src={DownsideLine}
            alt=""
            className="absolute top-1/2 -translate-y-1/2"
          />
        </div>
        <div className="absolute top-[150px] right-16">
          <div className="relative max-w-[588px] max-h-[617px] hidden lg:block">
            <img src={Boxes} alt="" className="max-w-[588px]" />
            <img
              src={BoxesLogo}
              alt=""
              className="absolute bottom-[90px] left-1/2 -translate-x-1/2"
            />
          </div>
        </div>
        <div className="max-w-[1119px] mx-auto mt-20 px-3">
          <h2 className="font-semibold lg:text-[44px] md:text-[40px] text-[32px] mb-2">
            How we works
          </h2>
          <p className="lg:text-2xl md:text-xl text-base text-[#000000B2] mb-10">
            Seamless and Simple Delivery, Every Step of the Way
          </p>
          <img src={WorkImage} alt="" />
        </div>
      </div>

      <div className="mt-[130px] max-w-[1249px] mx-auto relative">
        <h2 className="font-semibold lg:text-[44px] md:text-[40px] text-[32px] mb-2 max-w-[1125px] mx-auto">
          What Our Customer Says
        </h2>
        <p className="lg:text-2xl md:text-xl text-base text-[#000000B2] max-w-[1125px] mx-auto">
          Qorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>
        <InfiniteSlider />
      </div>
       <section className="mt-[130px] px-4">
        <div className="mx-auto max-w-[1406px] lg:h-[487px] h-[300px] bg-[#2A2E55]  rounded-2xl">
          <div className="relative px-6 max-w-[1249px] mx-auto xl:px-16 ">
             <img
                src={Man}
                alt="Delivery Man"
                className="h-[260px] lg:h-[340px] absolute lg:right-[330px] right-[170px] bottom-0 hidden lg:block"
              />

              <img
                src={Mockup}
                alt="App Mockup"
                className="absolute lg:right-[0px] right-[20px]  hidden lg:h-[533px] h-[300px] md:block -bottom-5"
              />
            <div className="z-10 max-w-[480px] text-white lg:h-[487px] h-[300px] flex justify-center flex-col">
              <p className="text-2xl">
                Download the free
              </p>
              <h2 className="mt-2 text-2xl md:text-3xl font-bold lg:text-[40px]">
                EASY GO APP
              </h2>
              <p className="mt-3 text-2xl text-[#FFFFFFB2]">
                For Faster & Easier Package Delivery
              </p>

              <div className="mt-6 flex gap-4">
                <img
                  src={DarkAndroid}
                  alt="Google Play"
                  className="h-12 cursor-pointer"
                />
                <img
                  src={DarkApple}
                  alt="App Store"
                  className="h-12 cursor-pointer"
                />
              </div>
            </div>

             
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
};

export default Home;
