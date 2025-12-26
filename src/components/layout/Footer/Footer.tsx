
import { Logo,FacebookIcon,TwitterIcon,InstagramIcon,AndroidFooter,AppleFooter } from "../../../assets";
const Footer = () => {
  return (
    <footer className="bg-white px-4 pt-32">
      <div className="mx-auto max-w-[1406px]">
        <div className="flex lg:flex-row flex-col xl:gap-40 lg:gap-10 gap-10 max-w-[1116px] mx-auto">
          <div className="space-y-6">
            <img src={Logo} alt="EasyGo" className="min-w-[180px]" />

            <div className="space-y-3 flex lg:flex-col flex-row ">
              <img src={AndroidFooter} alt="Google Play" className="min-w-[144px]" />
              <img src={AppleFooter} alt="App Store" className="min-w-[144px]" />
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 lg:gap-10 gap-4 flex-1">
            <div className="space-y-3 flex-1">
                <h4 className="font-semibold text-[#2A2E55] text-[20px]">COMPANY</h4>
                <ul className="space-y-6 text-base text-black">
                <li>About us</li>
                <li>Privacy Policy</li>
                <li>Terms & Conditions</li>
                <li>FAQ</li>
                </ul>
            </div>

            <div className="space-y-3 flex-1">
                <h4 className="font-semibold text-[#2A2E55] text-[20px]">QUICK LINKS</h4>
                <ul className="space-y-6 text-base text-black">
                <li>Book a Delivery</li>
                <li>Became a Courier</li>
                </ul>
            </div>

            <div className="space-y-3 flex-1">
                <h4 className="font-semibold text-[#2A2E55] text-[20px]">CONTACT US</h4>
                <ul className="space-y-6 text-base text-black">
                <li>(505) 555-0125 <br />
                (9am - 5pm)
                </li>
                <li>Abc123@gmail.com</li>
                </ul>
            </div>

            <div className="space-y-3 flex-1">
                <h4 className="font-semibold text-[#2A2E55] text-[20px]">FOLLOW US</h4>
                <ul className="space-y-6 text-base text-black">
                <li className="flex items-center gap-3">
                    <img src={InstagramIcon} className="h-4" />
                    Instagram
                </li>
                <li className="flex items-center gap-3">
                    <img src={TwitterIcon} className="h-4" />
                    Twitter
                </li>
                <li className="flex items-center gap-3">
                    <img src={FacebookIcon} className="h-4" />
                    Facebook
                </li>
                </ul>
            </div>
          </div>
        </div>

        <div className="mt-12 border-t border-[#00000080] pt-6 text-center font-medium text-base text-black">
          © 2025 EasyGo | Delivery App All rights Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
