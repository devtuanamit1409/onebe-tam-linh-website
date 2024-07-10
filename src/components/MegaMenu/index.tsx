import Link from "next/link";
import IconAngleRight from "../icons/IconAngleRight";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { apiService } from "@/services/api.service";
import { useTranslations } from "next-intl";
interface MegaMenuItem {
  attributes: {
    category: string;
    [key: string]: any;
  };
  [key: string]: any;
}
interface ResponseData {
  data: {
    id: number;
    attributes: {
      title: string;
      slug: string;
      content: string;
      bai_viet_tieu_diem: boolean;
      main: any;
      name: string;
      description: string;
      danh_muc_cons: {
        data: {
          id: number;
          attributes: {
            name: string;
            slug: string;
            description: string;
            category: string;
            content: null;
          };
        }[];
      };
    };
  }[];
}
interface dataMegaMenu {
  category: string;
  description: string;
  title: string;
  url: string;
}
const MegaMenu = ({
  menuItems,
  locale,
  loading,
  activeKey,
  isMenuOpen,
  setIsMenuOpen,
  handleMouseLeave,
}: {
  menuItems: any;
  locale: string;
  loading: boolean;
  activeKey: string | null;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleMouseLeave: (event: React.MouseEvent) => void;
}) => {
  const t = useTranslations("home");

  useEffect(() => {
    console.log(isMenuOpen);
  }, [isMenuOpen]);
  useEffect(() => {
    console.log(menuItems);
  }, [menuItems]);
  useEffect(() => {
    console.log("loading", loading);
  }, [loading]);
  return (
    <>
      {menuItems ? (
        <div
          className={`hidden laptop:block px-[92px] py-[37.5px] shadow absolute left-0 w-full bg-white z-40 mega-menu-container shadow-top ${
            isMenuOpen
              ? "top-[100px] opacity-100"
              : "-translate-y-full top-[0px] opacity-0"
          }`}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={handleMouseLeave}>
          {loading ? (
            <Loading />
          ) : (
            <>
              {menuItems && (
                <div className="flex justify-between gap-[32.5px] ">
                  <div className="w-[300px] flex-col justify-start items-start gap-8 inline-flex">
                    {activeKey === "Về chúng tôi" ? (
                      <>
                        <h2 className="self-stretch text-[#3B559E] text-[40px] font-bold leading-[64px]  line-clamp-2">
                          {menuItems.danhMuc[0].name}
                        </h2>
                        <p className="w-[300px] text-gray-500 text-base font-normal leading-normal pr-[18px] line-clamp-3">
                          {menuItems.danhMuc[0].description}
                        </p>
                      </>
                    ) : (
                      <>
                        <h2 className="self-stretch text-[#3B559E] text-[40px] font-bold leading-[64px]  line-clamp-2">
                          {menuItems.name}
                        </h2>
                        <p className="w-[300px] text-gray-500 text-base font-normal leading-normal pr-[18px] line-clamp-3">
                          {menuItems.description}
                        </p>
                      </>
                    )}

                    <Link
                      href={menuItems.pathname || "/"}
                      className="text-center text-base font-medium leading-normal px-6 py-3 bg-[#3B559E] border border-[#3B559E] hover:bg-[#fff] hover:border-[#3B559E] text-white hover:text-[#3B559E] transition-colors transition-border duration-300 ease-in-out rounded-[50px] justify-center items-center gap-2.5 inline-flex">
                      {t("see_more")}
                    </Link>
                  </div>
                  <div className="min-h-full w-1 bg-[#28A645] rounded"></div>
                  <div className="flex-1 grid grid-cols-3 gap-[30px]">
                    {activeKey === "Sản phẩm" || activeKey === "Dự án"
                      ? menuItems.danhMuc &&
                        menuItems.danhMuc
                          .slice(0, 3)
                          .map((item: any, index: any) => (
                            <div
                              className="flex flex-col items-start gap-4"
                              key={index}>
                              <div className="w-full min-h-[108px] gap-4">
                                <Link
                                  href={item.slug}
                                  key={index}
                                  className="flex gap-2 items-center justify-between text-black hover:text-[#28A645] transition-colors ease-linear">
                                  <p className=" text-lg font-semibold leading-relaxed flex items-center justify-between h-[58px] !line-clamp-2">
                                    {item.name}
                                  </p>
                                  <span>
                                    <IconAngleRightColorFull />
                                  </span>
                                </Link>
                                {item.description && (
                                  <p className="text-slate-400 text-[15px] font-normal leading-[22px] pr-[18px] mt-4 line-clamp-3">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                              {item.baiViet &&
                                item.baiViet
                                  .slice(0, 4)
                                  .map((child: any, childIndex: any) => (
                                    <div
                                      key={childIndex}
                                      className="text-black  hover:text-[#28A645] transition-colors ease-linear text-base font-semibold leading-normal w-full">
                                      <Link
                                        href={child.slug || "/"}
                                        className=" flex items-center justify-between ">
                                        <p
                                          className="!line-clamp-1"
                                          title={child.title}>
                                          {child.title}
                                        </p>
                                        <span>
                                          <IconAngleRight
                                            width="16"
                                            height="16"
                                          />
                                        </span>
                                      </Link>
                                    </div>
                                  ))}
                            </div>
                          ))
                      : activeKey === "Dịch vụ" ||
                        activeKey === "Thông tư nghị định"
                      ? menuItems.danhMuc &&
                        menuItems.danhMuc
                          .slice(0, 6)
                          .map((item: any, index: any) => (
                            <div
                              className="flex flex-col items-start gap-4"
                              key={index}>
                              <div className="w-full min-h-[108px] gap-4">
                                <Link
                                  href={item.slug}
                                  key={index}
                                  className="flex gap-2 items-center justify-between text-black text-lg hover:text-[#28A645] transition-colors ease-linear">
                                  <p className=" font-semibold leading-relaxed flex items-center justify-between h-[58px] !line-clamp-2 ">
                                    {item.name}
                                  </p>
                                  <span>
                                    <IconAngleRightColorFull />
                                  </span>
                                </Link>
                                {item.description && (
                                  <p className="text-slate-400 text-[15px] leading-[22px]  font-normal pr-[18px] mt-4 line-clamp-3">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))
                      : activeKey === "Về chúng tôi"
                      ? menuItems.danhMuc &&
                        menuItems.danhMuc
                          .slice(0, 6)
                          .map((item: any, index: any) => (
                            <div
                              className="flex flex-col items-start gap-4"
                              key={index}>
                              <div className="w-full min-h-[108px] gap-4">
                                <Link
                                  href={item.slug || "/"}
                                  key={index}
                                  className="flex gap-2 items-center justify-between hover:text-[#28A645] text-lg font-semibold leading-relaxed flextext-black transition-colors ease-linear">
                                  <p className="  items-center justify-between !line-clamp-2 ">
                                    {item.name}
                                  </p>
                                  <span>
                                    <IconAngleRightColorFull />
                                  </span>
                                </Link>
                                {item.description && (
                                  <p className="text-slate-400  text-[15px] font-normal leading-[22px] pr-[18px] mt-4 line-clamp-3">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))
                      : null}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      ) : (
        ""
      )}
    </>
  );
};

export default MegaMenu;
