import React, { useState } from "react";
import IconClose from "../icons/IconClose";
import IconGlobe from "../icons/IconGlobe";
import IconAngleRight from "../icons/IconAngleRight";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import Link from "next/link";
import IconAngleLeft from "../icons/IconAngleLeft";
import IconArrowRight from "../icons/IconArrowRight";

interface MenuItem {
  name: string;
  url: string;
  children: MenuItem[];
}

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, toggleMenu }) => {
  const menuItems: MenuItem[] = [
    {
      name: "Sản phẩm",
      url: "/",
      children: [
        { name: "Xử lý nước cấp", url: "/", children: [] },
        { name: "Xử lý nước thải", url: "/", children: [] },
        { name: "Tái sử dụng nước", url: "/", children: [] },
      ],
    },
    {
      name: "Dịch vụ",
      url: "/",
      children: [
        { name: "Công trình công nghiệp", url: "/", children: [] },
        { name: "Công trình dân dụng", url: "/", children: [] },
        { name: "Công trình khác", url: "/", children: [] },
      ],
    },
    {
      name: "Dự án",

      url: "/",
      children: [
        { name: "Ngành xử lý nước", url: "/", children: [] },
        { name: "Công trình dân dụng", url: "/", children: [] },
        { name: "Công trình khác", url: "/", children: [] },
      ],
    },
    {
      name: "Đối tác",
      url: "/",
      children: [],
    },
    {
      name: "Về chúng tôi",
      url: "/",
      children: [
        { name: "Về chúng tôi", url: "/", children: [] },
        { name: "Góc chuyên gia", url: "/", children: [] },
        { name: "Các công ty thành viên", url: "/", children: [] },
      ],
    },
    {
      name: "Tin tức",
      url: "/",
      children: [],
    },
    {
      name: "Thông tư - Nghị định",
      url: "/",
      children: [
        { name: "Luật bảo vệ môi trường", url: "/", children: [] },
        { name: "Môi trường nước", url: "/", children: [] },
        { name: "Chất thải rắn nguy hại", url: "/", children: [] },
        { name: "Khí thải - Tiếng ồn", url: "/", children: [] },
        { name: "Phòng cháy chữa cháy", url: "/", children: [] },
        { name: "Thiết kế cơ điện", url: "/", children: [] },
      ],
    },
  ];

  const [currentMenu, setCurrentMenu] = useState<MenuItem[]>(menuItems);
  const [breadcrumb, setBreadcrumb] = useState<MenuItem[]>([
    { name: "Menu", children: menuItems, url: "/" },
  ]);
  const [menuTransition, setMenuTransition] = useState<string>("enter");

  const handleMenuItemClick = (item: MenuItem) => {
    if (item.children.length > 0) {
      setMenuTransition("exit");
      setTimeout(() => {
        setCurrentMenu(item.children);
        setBreadcrumb([...breadcrumb, item]);
        setMenuTransition("enter");
      }, 300);
    }
  };

  const handleBack = () => {
    if (breadcrumb.length > 1) {
      setMenuTransition("exit");
      setTimeout(() => {
        breadcrumb.pop();
        setCurrentMenu(breadcrumb[breadcrumb.length - 1].children);
        setMenuTransition("enter");
      }, 300);
    }
  };

  return (
    <div
      onClick={toggleMenu}
      className={`fixed inset-0 bg-white z-50 transform ${
        isOpen ? "translate-x-0" : "translate-x-full"
      } transition-transform duration-300 ease-in-out`}>
      <div
        onClick={(event) => event.stopPropagation()}
        className="relative w-full h-full flex flex-col justify-between">
        <div className="flex h-[48px] justify-between items-center p-4 border-b relative">
          {breadcrumb.length > 1 && (
            <button
              onClick={handleBack}
              className="text-black absolute top-3 left-4">
              <IconAngleLeft />
            </button>
          )}
          <p className="w-full text-black text-lg font-bold text-center">
            {breadcrumb.length > 1 && breadcrumb[breadcrumb.length - 1].name}
          </p>
          <button
            onClick={toggleMenu}
            className="text-black absolute top-4 right-4">
            {breadcrumb.length <= 1 && <IconClose />}
          </button>
        </div>
        <ul
          className={`text-black py-8 px-4  mb-auto flex flex-col items-center transition-transform duration-300 ${
            menuTransition === "enter" ? "translate-x-0" : "translate-x-full"
          }`}>
          {currentMenu.map((item, index) => (
            <>
              {item.children.length > 0 ? (
                <li
                  key={index}
                  onClick={() => {
                    handleMenuItemClick(item);
                  }}
                  className="text-black text-lg font-semibold font-['Inter'] leading-relaxed cursor-pointer hover:bg-gray-100 p-2 w-full text-left flex justify-between items-center ">
                  {item.name}
                  <IconAngleRight />
                </li>
              ) : (
                <Link
                  href={item.url}
                  key={index}
                  className="text-black text-lg font-semibold font-['Inter'] leading-relaxed cursor-pointer hover:bg-gray-100 p-2 w-full text-left flex justify-between items-center">
                  {item.name}
                  {item.children.length > 0 ? ( // Kiểm tra xem có children hay không
                    <IconAngleRightColorFull />
                  ) : (
                    <IconAngleRight /> // Sử dụng IconAngleRight nếu không có children
                  )}
                </Link>
              )}
            </>
          ))}
        </ul>
        <div className="w-full h-[50px] px-4 my-2   justify-between items-center inline-flex">
          {breadcrumb.length <= 1 ? (
            <button className="w-full h-[50px] px-4  items-center gap-1 flex rounded-lg border-indigo-800 shadow border justify-center text-indigo-800">
              <IconGlobe />
              <p className="text-black text-lg font-medium font-['Inter'] leading-relaxed">
                VN
              </p>
            </button>
          ) : (
            <div className="w-[712px] h-[52px] px-6 py-3.5 rounded-lg shadow border border-indigo-800 justify-between items-center inline-flex">
              {breadcrumb.slice(1).map((item, index) => (
                <Link href={item.url} key={index} className="">
                  <p className="text-indigo-800 text-base font-medium font-['Inter'] leading-normal text-left flex justify-between ">
                    Tới trang {item.name}
                  </p>
                </Link>
              ))}
              <div className="w-6 h-6 relative">
                <IconArrowRight />
              </div>
            </div>
            // <div className="w-full px-4 rounded-lg border-indigo-800 shadow border">

            // </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
