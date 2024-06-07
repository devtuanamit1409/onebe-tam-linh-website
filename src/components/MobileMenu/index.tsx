import React, { useEffect, useState } from "react";
import IconClose from "../icons/IconClose";
import IconGlobe from "../icons/IconGlobe";
import IconAngleRight from "../icons/IconAngleRight";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import Link from "next/link";
import IconAngleLeft from "../icons/IconAngleLeft";
import IconArrowRight from "../icons/IconArrowRight";

interface MenuItem {
  name?: string;
  url: string;
  children: MenuItem[];
  title?: string; // Thêm thuộc tính title (optional)
}

interface MobileMenuProps {
  isOpen: boolean;
  toggleMenu: () => void;
  data: any;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  data,
  isOpen,
  toggleMenu,
}) => {
  const [mobileMenu, setMobileMenu] = useState<MenuItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (data) {
      const newMegaMenu = data.map((item: any) => ({
        key: item.attributes.slug,
        title: item.attributes.name,
        description: item.attributes.description,
        url: `/${item.attributes.slug}`, // Hoặc điều chỉnh đường dẫn tùy ý
        children: item.attributes.danh_muc_cons.data.map((subItem: any) => ({
          title: subItem.attributes.name,
          description: subItem.attributes.description,
          url: `/danh-muc-con/${subItem.attributes.slug}`, // Hoặc điều chỉnh đường dẫn tùy ý
          icon: <IconAngleRightColorFull />,
          children: subItem.attributes.bai_viets.data.map((baiViet: any) => ({
            title: baiViet.attributes.title,
            url: `/bai-viet/${baiViet.attributes.slug}`,
            icon: <IconAngleRight />,
          })),
        })),
      }));

      setMobileMenu(newMegaMenu);
      setIsLoading(false);
    }
  }, [data]);

  useEffect(() => {
    console.log("mobileMenu", mobileMenu);
  }, [mobileMenu]);

  const [currentMenu, setCurrentMenu] = useState<MenuItem[]>([]);
  const [breadcrumb, setBreadcrumb] = useState<MenuItem[]>([]);
  const [menuTransition, setMenuTransition] = useState<string>("enter");

  useEffect(() => {
    // Cập nhật currentMenu và breadcrumb khi mobileMenu thay đổi
    if (mobileMenu.length > 0) {
      setCurrentMenu(mobileMenu);
      setBreadcrumb([{ title: "Menu", children: mobileMenu, url: "/" }]);
    }
  }, [mobileMenu]);

  const handleMenuItemClick = (item: any) => {
    if (item.children && item.children.length > 0) {
      setMenuTransition("exit");
      setTimeout(() => {
        setCurrentMenu(item.children);
        setBreadcrumb([...breadcrumb, item]);
        setMenuTransition("enter");
      }, 300);
    } else if (item.url) {
      window.location.href = item.url;
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
    <>
      {!isLoading && (
        <div
          onClick={toggleMenu}
          className={`fixed inset-0 bg-white z-40 transform ${
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
                {breadcrumb.length > 1 &&
                  breadcrumb[breadcrumb.length - 1].title}
              </p>
              <button
                onClick={toggleMenu}
                className="text-black absolute top-4 right-4">
                {breadcrumb.length <= 1 && <IconClose />}
              </button>
            </div>
            <ul
              className={`text-black py-8 px-4 gap-4 mb-auto flex flex-col items-center transition-transform duration-300 ${
                menuTransition === "enter"
                  ? "translate-x-0"
                  : "translate-x-full"
              }`}>
              {/* Render menu items */}
              {currentMenu.map((item, index) => (
                <React.Fragment key={index}>
                  <li
                    onClick={() => handleMenuItemClick(item)}
                    className="text-black text-lg font-semibold  leading-relaxed cursor-pointer hover:bg-gray-100 p-2 w-full text-left flex justify-between items-center ">
                    {item.title}
                    {item.children && item.children.length > 0 ? (
                      <IconAngleRight />
                    ) : item.url ? (
                      <IconAngleRight />
                    ) : (
                      <IconAngleRightColorFull />
                    )}
                  </li>
                </React.Fragment>
              ))}
            </ul>
            <div className="w-full h-[50px] px-4 my-2   justify-between items-center inline-flex">
              {breadcrumb.length <= 1 ? (
                <button className="w-full h-[50px] px-4  items-center gap-1 flex rounded-lg border-indigo-800 shadow border justify-center text-indigo-800">
                  <IconGlobe />
                  <p className="text-black text-lg font-medium  leading-relaxed">
                    VN
                  </p>
                </button>
              ) : (
                <div className="w-full h-[52px] px-6 py-3.5 rounded-lg shadow border border-indigo-800 justify-between items-center inline-flex">
                  {/* Chỉ hiển thị liên kết tới menu cha (cấp 1) */}
                  <Link href={breadcrumb[1].url} className="">
                    <p className="text-indigo-800 text-base font-medium  leading-normal text-left flex justify-between ">
                      Tới trang {breadcrumb[1].title}
                    </p>
                  </Link>
                  <div className="w-6 h-6 relative text-indigo-800 ">
                    <IconArrowRight />
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MobileMenu;
