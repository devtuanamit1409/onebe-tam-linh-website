"use client";
import { Collapse } from "antd";
import CollapsePanel from "antd/es/collapse/CollapsePanel";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import Link from "next/link";
import { useState } from "react";
import IconArrowRight from "../icons/IconArrowRight";
import IconAngleRight from "../icons/IconAngleRight";

interface MenuItemProps {
  title: string;
  url: string;
  children: MenuItemProps[];
  tagIcon?: JSX.Element;
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
    <div className=" flex-col justify-start items-start gap-16 flex w-full my-[40px] desktop:px-[120px]">
      {menu.map((item: MenuItemProps, index: number) => {
        return (
          <div
            key={index}
            className="flex w-full
              ">
            <div className=" flex-col w-full gap-4">
              {item.tagIcon ? (
                <div className="text-gray-700 tablet:text-[28px] mobile:text-lg font-bold  capitalize leading-[44.80px] flex justify-between items-center mb-8">
                  <div className="flex items-center gap-6">
                    {item.tagIcon}
                    <p>{item.title}</p>
                  </div>
                  <Link
                    href={item.url}
                    className="mobile:hidden tablet:inline-flex h-12 px-6 py-3 rounded-[50px] border border-indigo-800 justify-center items-center gap-2 inline-flex">
                    <div className="text-center text-indigo-800 text-base font-medium  leading-normal">
                      Xem tất cả
                    </div>
                    <div className="text-indigo-800">
                      <IconAngleRight width="16" height="16" />
                    </div>
                  </Link>
                </div>
              ) : (
                <p className="text-gray-700 tablet:text-[28px] mobile:text-lg font-bold  capitalize leading-[44.80px] flex mb-8">
                  {item.title}
                </p>
              )}

              {item.children.map((child: MenuItemProps) => {
                return (
                  <div
                    key={child.title}
                    className="text-gray-500 tablet:text-2xl mobile:text-base font-medium cursor-pointer leading-[38.40px] flex items-center justify-between w-full desktop:pt-6  pl-2 tablet:mb-6 mobile:mb-2 border-b-2 border-zinc-200 flex-col overflow-hidden"
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
                      className={`transform origin-top transition-all desktop:mt-4   overflow-hidden duration-300 ease-in-out ${
                        activeMenu === child.title
                          ? "max-h-96 pb-4 mt-4"
                          : "max-h-0"
                      }`}>
                      <p className=" text-slate-400 tablet:text-xl mobile:text-base font-light  tablet:leading-loose mb-4 select-none">
                        {child.descriptions}
                      </p>

                      <div className=" h-10 px-4 py-2 bg-indigo-800 rounded-[32px] justify-center items-center gap-2.5 inline-flex">
                        <Link
                          href={child.url}
                          className="text-center text-white text-base font-medium  leading-normal">
                          Xem thêm
                        </Link>
                        <div className="w-5 h-5 relative text-white ">
                          <IconArrowRight width={24} height={24} />
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
              {item.tagIcon && (
                <Link
                  href={item.url}
                  className="mobile:inline-flex tablet:hidden h-12 mt-8 px-6 py-3 rounded-[50px] border border-indigo-800 justify-center items-center gap-2 inline-flex">
                  <div className="text-center text-indigo-800 text-base font-medium  leading-normal">
                    Xem tất cả
                  </div>
                  <div className="text-indigo-800">
                    <IconAngleRight width="16" height="16" />
                  </div>
                </Link>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default PageMenu;
