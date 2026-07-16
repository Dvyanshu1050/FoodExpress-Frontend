import {
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaLinkedin,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-black py-16 text-white">

      <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-4">

        <div>
          <h2 className="text-3xl font-bold text-orange-500">
            FoodExpress
          </h2>

          <p className="mt-5 text-gray-400">
            Fresh food delivered at your doorstep.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">
            Quick Links
          </h3>

          <ul className="space-y-3 text-gray-400">
            <li>Home</li>
            <li>Menu</li>
            <li>Offers</li>
            <li>Contact</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">
            Contact
          </h3>

          <p className="text-gray-400">
            📍 Noida, India
          </p>

          <p className="mt-3 text-gray-400">
            📧 support@foodexpress.com
          </p>

          <p className="mt-3 text-gray-400">
            📞 +91 8815262631
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-xl font-bold">
            Follow Us
          </h3>

          <div className="flex gap-4 text-2xl">
            <FaFacebook />
            <FaInstagram />
            <FaTwitter />
            <FaLinkedin />
          </div>
        </div>

      </div>

      <div className="mt-12 border-t border-gray-700 pt-6 text-center text-gray-500">
        © 2026 FoodExpress. All Rights Reserved.
      </div>

    </footer>
  );
};

export default Footer;