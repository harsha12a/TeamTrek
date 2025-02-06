import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";

function Header() {
  const desktopLinks = useRef(null);
  const menuLinks = useRef(null);
  const [menu, setMenu] = useState(false);
  const [dis, setDis] = useState({ sm: "hidden" });

  useEffect(() => {
    setDis({ sm: menu? "block" : "hidden" });
  }, [menu]);

  useEffect(() => {
    if (desktopLinks.current) {
      const links = desktopLinks.current.querySelectorAll("a");
      if (links.length > 0) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.25 }
        );
      }
    }
  });

  useEffect(() => {
    if (menu && menuLinks.current) {
      const links = menuLinks.current.querySelectorAll("a");
      if (links.length > 0) {
        gsap.fromTo(
          links,
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1, stagger: 0.25 }
        );
      }
    }
  }, [menu]);

  return (
    <div className="bg-green-300 p-5">
      <nav className="flex h-[50px] justify-between flex-wrap items-center">
        <div className="text-2xl">TaskMaster</div>

        {/* Mobile Menu */}
        {menu && (
          <div className={dis.sm}>
            <div
              className="flex flex-col absolute flex-wrap justify-between items-center gap-20 bg-blue-300 w-full backdrop-blur-lg bg-opacity-50 h-[300px] top-[90px] left-0"
              ref={menuLinks}
            >
              <Link className="cursor-pointer text-[17px] pt-20" to={"/"}>
                Home
              </Link>
              <Link className="cursor-pointer text-[17px] pb-20" to={"register"}>
                Register
              </Link>
            </div>
          </div>
        )}

        {/* Desktop Menu */}
        <div className="hidden md:block sm:block">
          <div
            className="flex flex-wrap justify-between items-center gap-20"
            ref={desktopLinks}
          >
            <Link className="cursor-pointer text-[17px]" to={"/"}>
              Home
            </Link>
            <Link className="cursor-pointer text-[17px]" to={"register"}>
              Register
            </Link>
          </div>
        </div>

        {/* Toggle Menu Button */}
        <div
          className="block md:hidden sm:hidden cursor-pointer text-[24px] z-100"
          onClick={() => setMenu(!menu)}
        >
          {menu ? "✕" : "☰"}
        </div>
      </nav>
    </div>
  );
}

export default Header;
