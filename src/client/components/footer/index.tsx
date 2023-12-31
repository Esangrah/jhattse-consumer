import { Link} from "@renderer/Link"
import { FaMapMarkerAlt, FaPhoneSquareAlt, FaWhatsappSquare } from "react-icons/fa";
import { FaInstagram, FaTwitter, FaFacebookF } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";


export const Footer = () => {
    return (
        <div className="flex flex-col justify-center px-4 py-2 gap-4 w-full bg-neutral-900 font-manrope">
            <div className="flex flex-row justify-between block lt-sm:hidden">
                <div className="flex flex-col justify-start gap-2">
                    <div className="text-amber-300 font-bold text-lg"><Link href="/">Jhattse</Link></div>
                    <div className="text-amber-300 font-semibold text-sm select-none">by Esangrah Technologies</div>
                    <div className="text-neutral-50 font-semibold select-none">Follow Us</div>
                    <div className="flex flex-row items-center gap-2">
                        <div className="text-sm hover:font-semibold select-none text-neutral-50"><Link href={'https://twitter.com/jhattse'}><FaTwitter /></Link></div>
                        <div className="text-sm hover:font-semibold select-none text-neutral-50"><Link href={'https://www.facebook.com/profile.php?id=100088066437195'}><FaFacebookF /></Link></div>
                        <div className="text-sm hover:font-semibold select-none text-neutral-50"><Link href={'https://www.instagram.com/jhattse/'}><FaInstagram /></Link></div>
                        <div className="text-sm hover:font-semibold select-none text-neutral-50"><Link href={`https://www.google.com/maps/place/ESANGRAH+TECHNOLOGIES+PRIVATE+LIMITED/@30.2977277,78.0679105,17z/data=!3m1!4b1!4m6!3m5!1s0x390929a02dbc9563:0x483f9a088c2712a1!8m2!3d30.2977231!4d78.0700992!16s%2Fg%2F11sjgmr_fg`}><FaMapMarkerAlt /></Link></div>
                    </div>
                </div>
                <div className="flex flex-row justify-end gap-10 text-neutral-50">
                    <div className="flex flex-col gap-1">
                        <div className="text-lg font-semibold select-none">USEFUL LINKS</div>
                        <div className="text-sm hover:font-semibold select-none"><Link href="https://business.jhattse.com/signup?type=business">Partner with Us</Link></div>
                        <div className="text-sm hover:font-semibold"><Link href="/about">About</Link></div>
                        <div className="text-sm hover:font-semibold"><Link href="/terms">Terms of Use</Link></div>
                        <div className="text-sm hover:font-semibold"><Link href="/privacy">Privacy Policy</Link></div>
                    </div>
                    <div className="flex flex-col gap-1">
                        <div className="text-lg font-semibold select-none">GET IN TOUCH</div>
                        <div className="text-sm hover:font-semibold"><Link href="mailto:contact@esangrah.com" className="flex flex-row items-center gap-1"><MdOutlineEmail size="1.5em" />contact@esangrah.com</Link></div>
                        <div className="text-sm hover:font-semibold"><Link href="https://wa.me/9634410412?text=Hello%2C%20We%20are%20interested%20in%20partnering%20with%20Jhattse." className="flex flex-row items-center gap-1"><FaWhatsappSquare size="1.5em" /> +91-9634410412</Link></div>
                        <div className="text-sm hover:font-semibold"><a href="tel:+91-8077418779" className="flex flex-row items-center gap-1"><FaPhoneSquareAlt size="1.5em" />+91-8077418779</a></div>
                    </div>
                </div>
            </div>
            <div className="text-neutral-50 text-center text-xs h-1/4 w-full flex flex-col justify-end">{`@Copyright ${new Date().getFullYear()} Esangrah Technologies Pvt Ltd`}</div>
        </div>
    );
};
