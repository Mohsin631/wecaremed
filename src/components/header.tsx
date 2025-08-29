import { useEffect, useState } from "react";

const NAV_COLOR = "#12262A";          // text color
const MOBILE_BG = "#6FE1E5";          // full-screen menu BG

const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  // Scroll background behavior
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const authBtn  = `px-4 py-2 rounded-full font-semibold transition text-white`;

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 hidden md:block`}
      style={
        scrolled ? { backgroundColor: `${MOBILE_BG}E6` } : { backgroundColor: "transparent" }
      }
    >
      <div className="container mx-auto px-6">
        <div className="h-16 flex items-center justify-between">
          {/* Brand - Logo only */}
          <a href="#home" className="flex items-center">
            <img
              src="/src/assets/logo.svg"  // <-- replace with your logo path
              alt="We Care Logo"
              className="h-30 w-auto"
            />
          </a>

          {/* Desktop Book Now */}
          <div className="flex items-center gap-3">
            <a
              href="#register"
              className={authBtn}
              style={{ backgroundColor: NAV_COLOR }}
            >
              Book Now
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
