"use client";
import { Collapse } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import Link from "next/link";
import { useState } from "react";
import IconArrowRight from "../icons/IconArrowRight";

interface MenuItemProps {
  title: string;
  url: string;
  children: MenuItemProps[];
  descriptions?: string;
  icon?: JSX.Element;
}
const PageMenu = ({ menu }: { menu: MenuItemProps[] }) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null); // Khởi tạo với null

  const handleMenuClick = (title: string) => {
    setActiveMenu((prevActiveMenu) =>
      prevActiveMenu === title ? null : title
    );
  };
  return (
    <div className=" flex-col justify-start items-start gap-16 flex w-full my-[40px]">
      {menu.map((item: MenuItemProps, index: number) => {
        return (
          <div
            key={index}
            className="flex w-full
              ">
            <div className=" flex-col w-full gap-4">
              <p className="text-black text-[28px] font-bold  capitalize leading-[44.80px]">
                {item.title}
              </p>
              {item.children.map((child: MenuItemProps) => {
                return (
                  <div
                    key={child.title}
                    className="text-gray-500 text-2xl font-medium  leading-[38.40px] flex items-center justify-between w-full py-6 pl-2 mb-6 border-b-2 border-zinc-200 flex-col overflow-hidden"
                    onClick={() => handleMenuClick(child.title)}>
                    <div className="flex w-full justify-between items-center">
                      {child.title}
                      <div
                        className={`transform transition-transform duration-300 p-4 ${
                          activeMenu === child.title ? "rotate-90" : ""
                        }`}>
                        {child.icon}
                      </div>
                    </div>
                    <div
                      className={`transform origin-top transition-all mt-4 overflow-hidden duration-300 ease-in-out ${
                        activeMenu === child.title ? "max-h-96" : "max-h-0" // Thay đổi h-0 thành max-h-0 và thêm max-h-96 (hoặc giá trị phù hợp) khi active
                      }`}>
                      <p className=" text-slate-400 text-xl font-light  leading-loose mb-4">
                        {child.descriptions}
                      </p>

                      <div className=" h-10 px-4 py-2 bg-indigo-800 rounded-[32px] justify-center items-center gap-2.5 inline-flex">
                        <Link
                          href={child.url}
                          className="text-center text-white text-base font-medium  leading-normal">
                          Xem thêm
                        </Link>
                        <div className="w-5 h-5 relative text-white ">
                          <IconArrowRight />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PageMenu;
