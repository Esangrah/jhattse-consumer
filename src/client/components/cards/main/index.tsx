import { Image } from "@renderer/image";
import { Link} from "react-router-dom"
import { TCard } from "@components/types";
import { sanityIoImageLoader } from '@core/utils';

type Props = {
    element: TCard;
};


export const MainCard = ({ element }: Props) => {
    return (
        <div className="flex justify-center items-center p-2 bg-neutral-900 rounded-2xl">
            <Link to={element.url}>
                <div className="h-24 flex items-center text-center">
                    {element.image && <Image
                        loader={sanityIoImageLoader}
                        src={element.image || "assets/esangrah-profile.png"}
                        className="w-full h-full object-cover rounded-xl"
                        alt={element.title}
                        width="150" height="75"
                        loading="eager"
                    />}
                    <p className="text-lg text-neutral-50 font-semibold text-ellipsis line-clamp-2 md:line-clamp-none">{element.title}</p>
                </div>
            </Link>
        </div>
    )
}