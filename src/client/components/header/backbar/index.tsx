import { RiArrowGoBackFill } from "react-icons/ri";
import { Link} from "react-router-dom"
import { Image } from "@renderer/image";
import { staticImageLoader } from "@core/utils";
import { useNavigate } from "react-router-dom";

interface Props {
  homeLink?: string;
}

export const BackBar: React.FC<Props> = ({ homeLink }) => {
  const navigate = useNavigate();
  return (
    <div className="navbar w-full bg-neutral-100 flex flex-col sticky sm:relative top-0 z-40 h-16 sm:h-28 px-2 font-manrope">
      <div className="flex justify-start">
        <Link to={homeLink || "/"}>
          <Image
            priority={true}
            loader={staticImageLoader}
            src="public/consumer/small-jhattse.svg"
            width="100"
            height="40"
            alt="Jhattse logo"
            loading="eager"
          />
        </Link>
      </div>
      <div className="flex justify-end mx-1 select-none">
        <span
          className="grid grid-flow-col gap-1 text-xl font-semibold cursor-pointer"
          onClick={() => navigate("/product/trending")}
        >
          <p className="text-sky-600 sm:hidden">Back</p>
          <p className="text-sky-600 mt-1">
            <RiArrowGoBackFill className="sm:text-md" />
          </p>
        </span>
      </div>
    </div>
  );
};