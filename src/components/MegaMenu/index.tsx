import Link from "next/link";
import IconAngleRight from "../icons/IconAngleRight";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import { useEffect, useState } from "react";

const MegaMenu = ({
  data,
  activeKey,
  isMenuOpen,
  setIsMenuOpen,
  handleMouseLeave,
}: {
  data: any;
  activeKey: string | null;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleMouseLeave: (event: React.MouseEvent) => void;
}) => {
  const [megaMenu, setMegaMenu] = useState<any>([]);

  useEffect(() => {
    if (data) {
      const newMegaMenu = data.map((item: any) => ({
        key: item.attributes.slug,
        title: item.attributes.name,
        description: item.attributes.description,
        url: `/${item.attributes.slug}`,
        baiviet: item.attributes.bai_viets.data.map((baiViet: any) => ({
          title: baiViet.attributes.title,
          description: baiViet.attributes.seo.description,
          url: `/${baiViet.attributes.slug}`,
          icon: <IconAngleRightColorFull />,
        })),
        content: item.attributes.danh_muc_cons.data.map((subItem: any) => ({
          title: subItem.attributes.name,
          Descriptions: subItem.attributes.description,
          url: subItem.attributes.slug,
          icon: <IconAngleRightColorFull />,
          children: subItem.attributes.bai_viets.data.map((baiViet: any) => ({
            title: baiViet.attributes.title,
            url: `/${baiViet.attributes.slug}`,
            icon: <IconAngleRight width="16" height="16" />,
          })),
        })),
      }));

      setMegaMenu(newMegaMenu);
    }
  }, [data]);

  const activeItem = megaMenu.find((item: any) => item.key === activeKey);

  return (
    <>
      {activeKey === "doi-tac" || activeKey === "tin-tuc" ? null : (
        <div
          className={`hidden laptop:block px-[92px] py-[37.5px] border-t-2 border-[#28A645] absolute left-0 w-full bg-white z-40 mega-menu-container ${
            isMenuOpen
              ? "top-[100px] opacity-100"
              : "-translate-y-full top-[0px] opacity-0"
          }`}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={handleMouseLeave}>
          {activeItem && (
            <div className="flex justify-between gap-[32.5px]">
              <div className="w-[300px] flex-col justify-start items-start gap-8 inline-flex">
                <h2 className="self-stretch text-indigo-800 text-[40px] font-bold leading-[64px]">
                  {activeItem.title}
                </h2>
                <p className="w-[300px] text-gray-500 text-base font-normal leading-normal">
                  {activeItem.description}
                </p>
                <Link
                  href={activeItem.url}
                  className="text-center text-base font-medium leading-normal px-6 py-3 bg-indigo-800 border border-indigo-800 hover:bg-[#fff] hover:border-indigo-800 text-white hover:text-indigo-800 transition-colors transition-border duration-300 ease-in-out rounded-[50px] justify-center items-center gap-2.5 inline-flex">
                  Xem thêm
                </Link>
              </div>
              <div className="min-h-full w-1 bg-[#28A645] rounded"></div>
              <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-4">
                {activeItem.baiviet.length > 0
                  ? activeItem.baiviet.map((item: any, index: any) => (
                      <div className="flex flex-col items-start" key={index}>
                        <div className="w-full h-[175px]">
                          <Link
                            href={item.url}
                            key={index}
                            className="text-black text-lg font-semibold leading-relaxed flex items-center justify-between">
                            {item.title} {item.icon !== null ? item.icon : ""}
                          </Link>
                          {item.description && (
                            <p className="text-slate-400 text-xs font-normal leading-snug">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  : activeItem.content.map((item: any, index: any) => (
                      <div className="flex flex-col items-start" key={index}>
                        <div className="w-full h-[175px]">
                          <Link
                            href={item.url}
                            key={index}
                            className="text-black text-lg font-semibold leading-relaxed flex items-center justify-between">
                            {item.title} {item.icon !== null ? item.icon : ""}
                          </Link>
                          {item.Descriptions && (
                            <p className="text-slate-400 text-xs font-normal leading-snug">
                              {item.Descriptions}
                            </p>
                          )}
                        </div>
                        {item.children &&
                          item.children.map((child: any, childIndex: any) => (
                            <div
                              key={childIndex}
                              className="text-black hover:text-[#28A645] text-base font-semibold leading-normal w-full">
                              <Link
                                href={child.url}
                                className="flex items-center justify-between mb-4">
                                {child.title}
                                {child.icon}
                              </Link>
                            </div>
                          ))}
                      </div>
                    ))}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default MegaMenu;
