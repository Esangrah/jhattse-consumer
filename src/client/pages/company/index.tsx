import React, { useState } from "react";
import { Image } from "@renderer/Image";
import { SwiperSlide, Swiper } from "swiper/react";
import { CarouselContainer } from "@components/container/carousel";
import { MdKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom";
import Navbar from "@components/company/navbar";
import { sanityIoImageLoader } from "@core/utils";
import Footer from "@components/company/footer";
function company() {
  return (
    <div className="container font-manrope">
      {/* Navber */}
      <Navbar />
      {/* Navber */}

      {/* Hero Section */}
      <div className="px-20 sm:px-2">
        <div className="flex flex-row justify-between items-center sm:items-start xl:flex-col lg:flex-col">
          <div className="flex flex-col justify-center h-full">
            <p className="text-6xl font-extrabold text-darkGray py-5 sm:text-2xl lg:text-2xl  sm:py-2">
              We provide 360° solutions for
            </p>
            <p className="text-green-700 text-7xl font-extrabold pb-10 sm:text-4xl sm:pb-5">
              Businesses
            </p>
            <div className="flex items-center gap-4 pt-10 sm:pt-4">
              <Link to={"#product"} className="p-4 text-white flex items-center justify-center gap-2 text-xl font-extrabold rounded-lg border border-solid bg-green-700 sm:text-sm sm:p-2">
                OUR PRODUCTS
                <MdKeyboardArrowRight />
              </Link>
              <Link to={"/company/about"} className=" p-4 text-green-700 flex items-center justify-center gap-2 text-xl font-extrabold rounded-lg border border-solid border-green-700 sm:text-sm sm:p-2">
                ABOUT US
                <MdKeyboardArrowRight />
              </Link>
            </div>
          </div>
          <Image
            loader={sanityIoImageLoader}
            src={"https://jhattse.com/api/v1/file/?key=esangrah/OP263XX2_mainimage.png"}
            width="729"
            height="640"
            alt="Company Logo"
            className="sm:mt-5 lg:mt-20 pt-10 self-center "
          />
        </div>
        <div className="h-16 sm:h-4"></div>
        <div className="grid xl:grid-cols-1 grid-cols-3 py-10">
          <div className="py-2 sm:row-span-1 col-span-2">
            <p className="text-4xl text-black font-bold pb-10 sm:pb-5 sm:text-xl">
              Who are We?
            </p>
            <div className="flex flex-col gap-4 w-2/3 sm:w-full">
              <p className="text-xl text-customGray font-medium mr-20 sm:w-full sm:text-sm">
                Esangrah Technologies founded in early 2023 envision to create
                ecosystem for the next India digital leap. We as organisation
                strive to provide the best available tech to entrepreneur,
                business and customers. We feel that these digital tools are
                necessity to remove out any friction and challenges in the
                digital adoption.
              </p>
              <p className="text-xl text-customGray font-medium mr-20 sm:w-full sm:text-sm">
                Businesses can benefit from our best and low cost product create
                multi touch points with customers and enhance and manage their
                business in the digital era with ease.
              </p>
            </div>
          </div>
          <div className="sm:row-span-1 col-span-1">
            <Image
              loader={sanityIoImageLoader}
              src={"https://jhattse.com/api/v1/file/?key=esangrah/LTGK3TK3_secondimage.png"}
              width="729"
              height="640"
              alt="Company Logo"
              className="sm:hidden lg:hidden w-full h-full"
            />
          </div>
        </div>
        <div className="py-10 sm:py-5" id="product">
          <p className="text-black text-4xl  font-bold pb-5 sm:text-xl ">
            Our Products
          </p>
          <CarouselContainer>
            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
              <Link to={"https://business.jhattse.com/"} target="_blank"><div className="rounded-xl bg-black">
                <Image
                  loader={sanityIoImageLoader}
                  src={"https://jhattse.com/api/v1/file/?key=esangrah/XLR8Q0FO_jhattsebusiness.png"}
                  width="200"
                  height="200"
                  alt="Company Logo"
                  className="w-full h-40 sm:h-20 p-4"
                />
              </div></Link>
            </SwiperSlide>
            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
              <Link to={"https://jhattse.com/"} target="_blank"><div className="rounded-xl bg-black">
                <Image
                  loader={sanityIoImageLoader}
                  src={"https://jhattse.com/api/v1/file/?key=esangrah/WLEIMT2A_jhattse.png"}
                  width="200"
                  height="200"
                  alt="Company Logo"
                  className="w-full h-40 sm:h-20 p-4"
                />
              </div>
              </Link>
            </SwiperSlide>
            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
              <Link to={"https://jhattse.com/"} target="_blank"><div className="p-4 flex justify-center h-40 sm:h-20 items-center rounded-xl bg-stone-600">
                <p className="text-white text-center text-5xl font-bold sm:text-sm">
                  Oval Coming Soon!
                </p>
              </div></Link>
            </SwiperSlide>
          </CarouselContainer>
        </div>

        <div className="py-5 sm:py-10">
          <p className="text-black text-4xl font-bold  pb-5 sm:text-xl">
            Our Team
          </p>

          <CarouselContainer>
            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
              <div>
                <Image
                  loader={sanityIoImageLoader}
                  src={"https://jhattse.com/api/v1/file/?key=esangrah/ZCGLG5T9_team.png"}
                  width="370"
                  height="432"
                  alt="Team members"
                  className="w-60 h-auto sm:w-40"
                />
                <div className="py-2">
                  <p className="font-bold text-2xl text-black sm:text-base">
                    Name
                  </p>
                  <p className="font-medium text-2xl text-black sm:text-base">
                    Designation
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
              <div>
                <Image
                  loader={sanityIoImageLoader}
                  src={"https://jhattse.com/api/v1/file/?key=esangrah/ZCGLG5T9_team.png"}
                  width="370"
                  height="432"
                  alt="Team members"
                  className="w-60 h-auto sm:w-40"
                />
                <div className="py-2">
                  <p className="font-bold text-2xl text-black sm:text-base">
                    Name
                  </p>
                  <p className="font-medium text-2xl text-black sm:text-base">
                    Designation
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
              <div>
                <Image
                  loader={sanityIoImageLoader}
                  src={"https://jhattse.com/api/v1/file/?key=esangrah/ZCGLG5T9_team.png"}
                  width="370"
                  height="432"
                  alt="Team members"
                  className="w-60 h-auto sm:w-40"
                />
                <div className="py-2">
                  <p className=" font-bold text-2xl text-black sm:text-base">
                    Name
                  </p>
                  <p className=" font-medium text-2xl text-black sm:text-base">
                    Designation
                  </p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide style={{ width: "auto" }} className="min-w-0">
              <div>
                <Image
                  loader={sanityIoImageLoader}
                  src={"https://jhattse.com/api/v1/file/?key=esangrah/ZCGLG5T9_team.png"}
                  width="370"
                  height="432"
                  alt="Team members"
                  className="w-60 h-auto sm:w-40"
                />
                <div className="py-2">
                  <p className="font-bold text-2xl text-black sm:text-base">
                    Name
                  </p>
                  <p className="font-medium text-2xl text-black sm:text-base">
                    Designation
                  </p>
                </div>
              </div>
            </SwiperSlide>
          </CarouselContainer>
        </div>
      </div>
      {/* Hero Section */}

      {/* Footer */}

      {/* footer */}
      <Footer />
      {/* Drop Down Menu */}

    </div>

  );
}

export default company;
