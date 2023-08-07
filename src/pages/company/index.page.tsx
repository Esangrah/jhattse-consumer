import { useState } from "react";
import { Image } from "#renderer/Image";

import { SwiperSlide } from "swiper/react";
import { CarouselContainer } from "#components/container/carousel";
import { MdMenu } from "react-icons/md";

export function Page() {
  const [isCarousel, seIsCarousel] = useState(false);
  return (
    <div className="container">
      <div className="flex flex-row bg-neutral-50 justify-between px-20 py-5 w-screen lt-sm:px-5 ">
        <Image
          priority={"true"}
          src={"/company/headerimage.png"}
          width="200"
          height="200"
          alt="Company Logo"
          className="w-48 h-auto lt-sm:w-20 h-auto"
        />
        <div className="self-center">
          <MdMenu className="hidden lt-sm:block xl:block" />
        </div>

        <div className="flex flex-row justify-center items-center lt-sm:hidden lg:hidden">
          <p className="text-neutral-900 text-xl font-sans font-bold pr-20 lg:hidden lt-sm:hidden">
            CAREERS
          </p>
          <p className="text-neutral-900 text-xl font-sans font-bold pr-0 lg:hidden lt-sm:hidden">
            CONTACT US
          </p>
        </div>
      </div>
      <div className="flex flex-row justify-between py-20 xl:flex-col lt-sm:p-0 lg:flex-col">
        <div className="px-10 lt-sm:px-3">
          <p className="text-7xl font-sans font-bold text-neutral-900 py-5 self-center lt-sm:text-2xl lg:text-2xl w-50 lt-sm:py-2   ">
            We provide 360° solutions for
          </p>
          <p className="text-green-700 text-8xl font-sans	font-extrabold pb-10 lt-sm:text-4xl lt-sm:pb-5">
            Businesses
          </p>
          <div className="lt-sm:flex lt-sm:flex-row pt-10 lt-sm:mt-0 lg:flex">
            <button className="w-60 p-4 text-neutral-50 font-sans text-xl font-extrabold rounded-lg border border-solid bg-green-700 mr-20 lt-sm:mr-2 lt-sm:text-sm lt-sm:px-2 py-4 lt-sm:w-30 my-2   ">
              OUR PRODUCTS
            </button>
            <button className="w-60 p-4 text-green-700 font-sans text-xl font-extrabold rounded-lg border border-solid border-green-700 lt-sm:text-sm lt-sm:px-0 lt-sm:py-0 lt-sm:w-30 my-2">
              ABOUT US
            </button>
          </div>
        </div>
        <Image
          src={"/company/mainimage.png"}
          width="729"
          height="640"
          alt="Company Logo"
          className="lt-sm:mt-5 lg:mt-20 pt-10 self-center "
        />
      </div>
      <div className="grid xl:grid-cols-1 grid-cols-3 py-10 px-4">
        <div className="py-2 lt-sm:row-span-1 col-span-2">
          <p className="text-4xl font-sans text-neutral-900 font-bold pb-20 lt-sm:pb-5 lt-sm:text-xl">
            Who are We?
          </p>
          <div className="">
            <p className="text-xl font-sans text-slate-400 font-medium w-120 mr-20 lt-sm:w-full lt-sm:text-sm">
              Esangrah Technologies founded in early 2023 envision to create
              ecosystem for the next India digital leap. We as organisation
              strive to provide the best available tech to entrepreneur,
              business and customers. We feel that these digital tools are
              necessity to remove out any friction and challenges in the digital
              adoption. Businesses can benefit from our best and low cost
              product create multi touch points with customers and enhance and
              manage their business in the digital era with ease.
            </p>
          </div>
        </div>
        <div className="lt-sm:row-span-1 col-span-1">
          <Image
            src={"/company/secondimage.png"}
            width="729"
            height="640"
            alt="Company Logo"
            className="lt-sm:hidden lg:hidden w-full h-full"
          />
        </div>
      </div>
      <div className="py-10 px-4 lt-sm:py-5">
        <p className="text-neutral-900 text-4xl font-sans font-bold pb-5 lt-sm:text-xl ">
          Our Products
        </p>
        <CarouselContainer>
          <SwiperSlide style={{ width: "auto" }} className="min-w-0">
            <div className="rounded-xl bg-neutral-900">
              <Image
                src={"/company/jhattsebusiness.png"}
                width="200"
                height="200"
                alt="Company Logo"
                className="w-full h-40 lt-sm:h-20 p-4"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }} className="min-w-0">
            <div className="rounded-xl bg-neutral-900">
              <Image
                src={"/company/jhattse.png"}
                width="200"
                height="200"
                alt="Company Logo"
                className="w-full h-40 lt-sm:h-20 p-4"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }} className="min-w-0">
            <div className="p-4 flex justify-center h-40 lt-sm:h-20 items-center rounded-xl bg-stone-600">
              <p className="text-neutral-50 text-center text-5xl font-bold font-sans lt-sm:text-sm">
                Oval Coming Soon!
              </p>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }} className="min-w-0">
            <div className="p-4 flex rounded-xl justify-center h-40 lt-sm:h-20 items-center bg-stone-600">
              <p className="text-neutral-50 text-center text-5xl font-bold font-sans lt-sm:text-sm">
                Coming Soon
              </p>
            </div>
          </SwiperSlide>
        </CarouselContainer>
      </div>

      <div className="py-5 px-4 lt-sm:py-10">
        <p className="text-neutral-900 text-4xl font-bold font-sans pb-5 lt-sm:text-xl">
          Our Team
        </p>

        <CarouselContainer>
          <SwiperSlide style={{ width: "auto" }} className="min-w-0">
            <div>
              <Image
                src={"/company/team.png"}
                width="370"
                height="432"
                alt="Team members"
                className="w-60 h-auto lt-sm:w-40 h-auto"
              />
              <div className="p-2">
                <p className="font-sans font-bold text-2xl text-neutral-900 lt-sm:text-base">
                  Name
                </p>
                <p className="font-sans font-medium text-2xl text-neutral-900 lt-sm:text-base">
                  Designation
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }} className="min-w-0">
            <div>
              <Image
                src={"/company/team.png"}
                width="370"
                height="432"
                alt="Team members"
                className="w-60 h-auto lt-sm:w-40 h-auto"
              />
              <div className="p-2">
                <p className="font-sans font-bold text-2xl text-neutral-900 lt-sm:text-base">
                  Name
                </p>
                <p className="font-sans font-medium text-2xl text-neutral-900 lt-sm:text-base">
                  Designation
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }} className="min-w-0">
            <div>
              <Image
                src={"/company/team.png"}
                width="370"
                height="432"
                alt="Team members"
                className="w-60 h-auto lt-sm:w-40 h-auto"
              />
              <div className="p-2">
                <p className="font-sans font-bold text-2xl text-neutral-900 lt-sm:text-base">
                  Name
                </p>
                <p className="font-sans font-medium text-2xl text-neutral-900 lt-sm:text-base">
                  Designation
                </p>
              </div>
            </div>
          </SwiperSlide>
          <SwiperSlide style={{ width: "auto" }} className="min-w-0">
            <div>
              <Image
                src={"/company/team.png"}
                width="370"
                height="432"
                alt="Team members"
                className="w-60 h-auto lt-sm:w-40 h-auto"
              />
              <div className="p-2">
                <p className="font-sans font-bold text-2xl text-neutral-900 lt-sm:text-base">
                  Name
                </p>
                <p className="font-sans font-medium text-2xl text-neutral-900 lt-sm:text-base">
                  Designation
                </p>
              </div>
            </div>
          </SwiperSlide>
        </CarouselContainer>
      </div>
      <div className="flex flex-row justify-between p-10 lt-sm:px-5 lt-sm:py-5 bg-neutral-900 lt-sm:flex-col">
        <Image
          src={"/company/bottomimage.png"}
          width="200"
          height="250"
          alt="Company Logo"
          className="w-52 h-auto lt-sm:w-40 h-auto"
        />
        <div className="flex flex-row pt-10 lt-sm:flex-col">
          <div className="justify-center items-center pr-20">
            <p className="text-neutral-50 text-xl pb-10 font-sans font-medium">
              USEFUL LINKS
            </p>
            <p className="text-neutral-50 text-lg font-sans font-medium">About Us</p>
            <p className="text-neutral-50 text-lg font-sans font-medium">
              Terms of Use
            </p>
            <p className="text-neutral-50 text-lg font-sans font-medium">
              Privacy Policy
            </p>
          </div>
          <div className="justify-center items-center">
            <p className="text-neutral-50 text-xl font-sans font-bold mb-10 lt-sm:pt-10">
              GET IN TOUCH
            </p>
            <p className="text-neutral-50 text-lg font-sans font-medium">
              contact@esangrah.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}