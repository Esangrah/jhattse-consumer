import { MdArrowBack } from 'react-icons/md'
import { Link} from "@renderer/Link"
import { Image } from "@renderer/Image";
import { staticImageLoader } from "@core/utils";
import { navigate } from 'vite-plugin-ssr/client/router';

interface Props {
  homeLink?: string;
}

export const BackBar: React.FC<Props> = ({ homeLink }) => {
  return (
    <div className="flex flex-row w-full bg-neutral-100 justify-between sticky lt-sm:relative top-0 z-40 h-16 lt-sm:h-28 p-2 font-manrope">
      <div className="flex justify-start">
        <Link href={homeLink || "/"}>
          <Image
            priority={"true"}
            loader={staticImageLoader}
            src="public/jhattse-logo.svg"
            width="100"
            height="40"
            alt="Jhattse logo"
            loading="eager"
          />
        </Link>
      </div>
      <div className="flex justify-end mx-1 select-none">
        <span
          className="grid grid-flow-col gap-1 text-lg font-semibold cursor-pointer"
          onClick={() => navigate("/product/trending")}
        >
          <p className="text-sky-600 lt-sm:hidden">Back</p>
          <p className="text-sky-600 mt-1">
            <MdArrowBack className="lt-sm:text-base" />
          </p>
        </span>
      </div>
    </div>
  );
};
