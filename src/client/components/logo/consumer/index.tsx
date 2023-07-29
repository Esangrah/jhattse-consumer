import { Image } from "@renderer/Image";
import { Link} from "@renderer/Link";
import { staticImageLoader } from "@core/utils";

interface Props {
    homeLink?: string
}

export const Logo = ({ homeLink }: Props) => {
    return (
        <Link href={homeLink || "/"}>
            <Image
                priority={"true"}
                data-test="icon"
                loader={staticImageLoader}
                src="public/jhattse-logo.svg"
                width="100"
                height="40"
                alt="Jhattse"
                className="rounded-full"
                loading="eager"
            />
        </Link>
    );
};
