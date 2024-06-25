import Link from "next/link";
import IconAngleRight from "../icons/IconAngleRight";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import { useEffect, useState } from "react";
import Loading from "../Loading";
import { apiService } from "@/services/api.service";
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
  locale,
  data,
  dataDanhMuc,
  activeKey,
  isMenuOpen,
  setIsMenuOpen,
  handleMouseLeave,
  loading,
  dataVeChungToi,
}: {
  locale: string;
  data: any;
  dataDanhMuc: any;
  activeKey: string | null;
  isMenuOpen: boolean;
  setIsMenuOpen: (isOpen: boolean) => void;
  handleMouseLeave: (event: React.MouseEvent) => void;
  loading: boolean;
  dataVeChungToi: any;
}) => {
  const [megaMenu, setMegaMenu] = useState<any>([]);
  const [activeItem, setActiveItem] = useState<any>([]);

  const fetchData = async (name: string) => {
    try {
      const endpoint = `${process.env.URL_API}/api/bai-viets?populate=danh_muc_cons&filters[danh_muc_cons][name][$eq]=${name}&locale=${locale}`;
      const response = await apiService.get<ResponseData>(endpoint);
      const formattedData = response.data.map((item: any) => ({
        title: item.attributes.title,
        slug: item.attributes.slug,
      }));
      return formattedData;
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    if (data) {
      const fetchMegaMenu = async () => {
        const newMegaMenu = await Promise.all(
          data.map(async (item: any) => ({
            category: item.attributes.category,
            title: item.attributes.name,
            description: item.attributes.description,
            url: `/${item.attributes.slug}`,
            baiViet: await fetchData(item.attributes.name),
          }))
        );
        setMegaMenu(newMegaMenu);
      };
      fetchMegaMenu();
      console.log("megaMenu", megaMenu);
    }
  }, [data]);

  const template = () => {
    return (
      <>
        <div
          className={`hidden laptop:block px-[92px] py-[37.5px] shadow absolute left-0 w-full bg-white z-40 mega-menu-container shadow-top ${
            isMenuOpen
              ? "top-[100px] opacity-100"
              : "-translate-y-full top-[0px] opacity-0"
          }`}
          onMouseEnter={() => setIsMenuOpen(true)}
          onMouseLeave={handleMouseLeave}>
          {activeItem ? (
            <div className="flex justify-between gap-[32.5px] ">
              <div className="w-[300px] flex-col justify-start items-start gap-8 inline-flex">
                <h2 className="self-stretch text-[#3B559E] text-[40px] font-bold leading-[64px] line-clamp-2">
                  {activeItem.title}
                </h2>
                <p className="w-[300px] text-gray-500 text-base font-normal leading-normal pr-[18px] line-clamp-3">
                  {activeItem.description}
                </p>
                <Link
                  href={activeItem.url || "/"}
                  className="text-center text-base font-medium leading-normal px-6 py-3 bg-[#3B559E] border border-[#3B559E] hover:bg-[#fff] hover:border-[#3B559E] text-white hover:text-[#3B559E] transition-colors transition-border duration-300 ease-in-out rounded-[50px] justify-center items-center gap-2.5 inline-flex">
                  Xem thêm
                </Link>
              </div>
              <div className="min-h-full w-1 bg-[#28A645] rounded"></div>
              <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-4">
                {/* {activeItem.baiviet.length > 0
                  ? activeItem.baiviet.map((item: any, index: any) => (
                      <div className="flex flex-col items-start" key={index}>
                        <div className="w-full h-[175px]">
                          <Link
                            href={item.url}
                            key={index}
                            className="text-black text-lg font-semibold leading-relaxed flex items-center justify-between pb-4 line-clamp-2">
                            {item.title} {item.icon !== null ? item.icon : ""}
                          </Link>
                          {item.description && (
                            <p className="text-slate-400 text-xs font-normal leading-snug line-clamp-3">
                              {item.description}
                            </p>
                          )}
                        </div>
                      </div>
                    ))
                  : activeItem.content.map((item: any, index: any) => (
                      <div
                        className="flex flex-col items-start gap-4"
                        key={index}>
                        <div className="w-full min-h-[108px] gap-4">
                          <Link
                            href={item.url}
                            key={index}
                            className="flex gap-2 items-center justify-between">
                            <p className=" text-black text-lg font-semibold leading-relaxed flex items-center justify-between !line-clamp-2">
                              {item.title}
                            </p>
                            <span>{item.icon !== null ? item.icon : ""}</span>
                          </Link>
                          {item.Descriptions && (
                            <p className="text-slate-400 text-xs font-normal leading-snug pr-[18px] mt-4 line-clamp-3">
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
                                className="flex items-center justify-between">
                                {child.title}
                                {child.icon}
                              </Link>
                            </div>
                          ))}
                      </div>
                    ))} */}
              </div>
            </div>
          ) : (
            <Loading />
          )}
        </div>
      </>
    );
  };

  const handleGetEndPoint = (key: string) => {
    switch (key) {
      case "Sản phẩm":
        return "san-pham";
      case "Products":
        return "san-pham";
      case "Dịch vụ":
        return "dich-vu";
      case "Services":
        return "dich-vu";
      case "Dự Án":
        return "du-an";
      case "Project":
        return "du-an";
      case "Về chúng tôi":
        return "ve-chung-toi";
      case "About Us":
        return "ve-chung-toi";
      case "Thông tư nghị định":
        return "thong-tu-nghi-dinh";
      case "Circular - Decree":
        return "thong-tu-nghi-dinh";
      default:
        return null;
    }
  };
  const handleGetSlugVeChungToi = (name: any) => {
    switch (name) {
      case "Về chúng tôi":
        return "ve-chung-toi";
      case "Góc chuyên gia":
        return "goc-chuyen-gia";
      case "Công ty thành viên":
        return "cong-ty-thanh-vien";
      default:
        null;
    }
  };
  useEffect(() => {
    console.log("dataDanhMuc", dataDanhMuc);
  }, [dataDanhMuc]);

  // <>{renderByActiveKey(activeKey, megaMenu)}</>;
  return (
    <>
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
            {dataDanhMuc && (
              <div className="flex justify-between gap-[32.5px] ">
                <div className="w-[300px] flex-col justify-start items-start gap-8 inline-flex">
                  <h2 className="self-stretch text-[#3B559E] text-[40px] font-bold leading-[64px] line-clamp-2">
                    {dataDanhMuc.attributes.main.name || "Chưa có Data"}
                  </h2>
                  <p className="w-[300px] text-gray-500 text-base font-normal leading-normal pr-[18px] line-clamp-3">
                    {dataDanhMuc.attributes.main.description || "Chưa có Data"}
                  </p>
                  <Link
                    href={
                      handleGetEndPoint(dataDanhMuc.attributes.main.name) || "/"
                    }
                    className="text-center text-base font-medium leading-normal px-6 py-3 bg-[#3B559E] border border-[#3B559E] hover:bg-[#fff] hover:border-[#3B559E] text-white hover:text-[#3B559E] transition-colors transition-border duration-300 ease-in-out rounded-[50px] justify-center items-center gap-2.5 inline-flex">
                    Xem thêm
                  </Link>
                </div>
                <div className="min-h-full w-1 bg-[#28A645] rounded"></div>
                <div className="flex-1 grid grid-cols-3 gap-x-8 gap-y-4">
                  {loading ? (
                    <Loading />
                  ) : (
                    <>
                      {activeKey === "Sản phẩm" || activeKey === "Dự án"
                        ? megaMenu.slice(0, 3).map((item: any, index: any) => (
                            <div
                              className="flex flex-col items-start gap-4"
                              key={index}>
                              <div className="w-full min-h-[108px] gap-4">
                                <Link
                                  href={item.url}
                                  key={index}
                                  className="flex gap-2 items-center justify-between">
                                  <p className="text-black text-lg font-semibold leading-relaxed flex items-center justify-between !line-clamp-2">
                                    {item.title}
                                  </p>
                                  <span>
                                    {item.icon !== null ? item.icon : ""}
                                  </span>
                                </Link>
                                {item.description && (
                                  <p className="text-slate-400 text-xs font-normal leading-snug pr-[18px] mt-4 line-clamp-3">
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
                                      className="text-black hover:text-[#28A645] text-base font-semibold leading-normal w-full">
                                      <Link
                                        href={child.slug || "/"}
                                        className="flex items-center justify-between">
                                        {child.title}
                                        {child.icon}
                                      </Link>
                                    </div>
                                  ))}
                            </div>
                          ))
                        : activeKey === "Dịch vụ" ||
                          activeKey === "Thông tư nghị định"
                        ? megaMenu.slice(0, 6).map((item: any, index: any) => (
                            <div
                              className="flex flex-col items-start gap-4"
                              key={index}>
                              <div className="w-full min-h-[108px] gap-4">
                                <Link
                                  href={item.url}
                                  key={index}
                                  className="flex gap-2 items-center justify-between">
                                  <p className="text-black text-lg font-semibold leading-relaxed flex items-center justify-between !line-clamp-2">
                                    {item.title}
                                  </p>
                                  <span>
                                    {item.icon !== null ? item.icon : ""}
                                  </span>
                                </Link>
                                {item.description && (
                                  <p className="text-slate-400 text-xs font-normal leading-snug pr-[18px] mt-4 line-clamp-3">
                                    {item.description}
                                  </p>
                                )}
                              </div>
                            </div>
                          ))
                        : activeKey === "Về chúng tôi"
                        ? dataVeChungToi
                            .slice(0, 6)
                            .map((item: any, index: any) => (
                              <div
                                className="flex flex-col items-start gap-4"
                                key={index}>
                                <div className="w-full min-h-[108px] gap-4">
                                  <Link
                                    href={item.url || "."}
                                    key={index}
                                    className="flex gap-2 items-center justify-between">
                                    <p className="text-black text-lg font-semibold leading-relaxed flex items-center justify-between !line-clamp-2">
                                      {item.name}
                                    </p>
                                    <span>
                                      {item.icon !== null ? item.icon : ""}
                                    </span>
                                  </Link>
                                  {item.description && (
                                    <p className="text-slate-400 text-xs font-normal leading-snug pr-[18px] mt-4 line-clamp-3">
                                      {item.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            ))
                        : null}
                    </>
                  )}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};

export default MegaMenu;
