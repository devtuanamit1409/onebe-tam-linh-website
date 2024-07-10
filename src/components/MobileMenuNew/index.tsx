"use client";
import React, { useState, useEffect } from "react";
import { Menu } from "antd";
import Image from "next/image";
import Link from "next/link";
import LanguageSwitch from "../LanguageSwitch";
import IconClose from "../icons/IconClose";
import IconAngleDown from "../icons/IconAngleDown";
import IconAngleUp from "../icons/IconAngleUp";
import IconPlus from "../icons/IconPlus";
import IconMinus from "../icons/IconMinus";
import Loading from "../Loading";
import { apiService } from "@/services/api.service";
import { useTranslations } from "next-intl";
import NTSLogo from "../../../public/images/logo/logo.png";

const MobileMenuNew = ({
  locale,
  isOpen,
  toggleMenu,
}: {
  locale: string;
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const t = useTranslations("menu");
  const [menuItems, setMenuItems] = useState([
    {
      key: "Sản phẩm",
      name: t("products"),
      pathname: "/san-pham",
      label: <div className="flex items-center gap-3">{t("products")}</div>,
      showIcon: true,
    },
    {
      key: "Dịch vụ",
      name: t("services"),
      pathname: "/dich-vu",
      label: <div className="flex items-center gap-3">{t("services")}</div>,
      showIcon: true,
    },
    {
      key: "Dự án",
      name: t("projects"),

      pathname: "/du-an",
      label: <div className="flex items-center gap-3">{t("projects")}</div>,
      showIcon: true,
    },
    {
      key: "Đối tác",
      name: t("partners"),
      pathname: "/doi-tac",
      label: (
        <Link href="/doi-tac" className="flex items-center gap-3">
          {t("partners")}
        </Link>
      ),
      showIcon: false,
    },
    {
      key: "Về chúng tôi",
      name: t("about_us"),
      pathname: "/ve-chung-toi",
      label: <div className="flex items-center gap-3">{t("about_us")}</div>,
      showIcon: true,
    },
    {
      key: "Tin tức",
      name: t("newsTitle"),
      pathname: "/tin-tuc",
      label: (
        <Link href="/tin-tuc" className="flex items-center gap-3">
          {t("newsTitle")}
        </Link>
      ),
      showIcon: false,
    },
    {
      key: "Thông tư nghị định",
      name: t("circular_decree"),
      pathname: "/thong-tu-nghi-dinh",
      label: (
        <div className="flex items-center gap-3">{t("circular_decree")}</div>
      ),
      showIcon: true,
    },
  ]);
  const [dataVeChungToi, setDataVeChungToi] = useState<any>([]);
  const [loading, setLoading] = useState(false);
  const fetchDataVeChungToi = async () => {
    const listEndPoint = [
      `${process.env.URL_API}/api/ve-chung-toi?populate=main&locale=${locale}`,
      `${process.env.URL_API}/api/goc-chuyen-gia?locale=${locale}`,
      `${process.env.URL_API}/api/cong-ty-thanh-vien?locale=${locale}`,
      locale === "en"
        ? `${process.env.URL_API}/api/danh-muc-cons?locale=en&filters[category][$eqi]=Dự án&filters[name][$eqi]=Community Project`
        : `${process.env.URL_API}/api/danh-muc-cons?filters[category]=Dự án&filters[name][$eqi]=Dự án cộng đồng`,
    ];
    try {
      const responses = await Promise.all(
        listEndPoint.map((endpoint) => apiService.get<any>(endpoint))
      );

      const [veChungToi, gocChuyenGia, congTyThanhVien, duAnCongDong] =
        responses.map((res) => res.data);
      return {
        danhMuc: [
          {
            id: 1,
            name: veChungToi.attributes.main.name,
            description: veChungToi.attributes.main.description,
            slug: "/ve-chung-toi",
          },
          {
            id: 2,
            name: t("expertopinion"),
            description: gocChuyenGia?.attributes?.description,
            slug: "/goc-chuyen-gia",
          },
          {
            id: 3,
            name: t("member_company"),
            description: congTyThanhVien?.attributes?.description,
            slug: "/cong-ty-thanh-vien",
          },
          {
            id: 4,
            name: duAnCongDong[0]?.attributes?.name,
            description: duAnCongDong[0]?.attributes?.description,
            slug: duAnCongDong[0]?.attributes?.slug,
          },
        ],
      };
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataDanhMuc = async (key: string) => {
    try {
      const endpoint = `${process.env.URL_API}/api/danh-muc-cons?filters[category][$eqi]=${key}&locale=${locale}`;
      const response = await apiService.get<any>(endpoint);
      return response.data.map((item: any) => ({
        name: item.attributes.name,
        description: item.attributes.description,
        slug: item.attributes.slug,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const fetchDataBaiViet = async (name: string) => {
    try {
      const endpoint = `${process.env.URL_API}/api/bai-viets?populate=danh_muc_cons&filters[danh_muc_cons][name]=${name}&locale=${locale}`;
      const response = await apiService.get<any>(endpoint);
      return response.data.map((item: any) => ({
        title: item.attributes.title,
        slug: item.attributes.slug,
      }));
    } catch (error) {
      console.error(`Error fetching data for ${name}:`, error);
      return null;
    }
  };

  useEffect(() => {
    if (isOpen) {
      setLoading(true);

      const fetchMegaMenu = async () => {
        try {
          // Dùng Promise.all để xử lý song song các lời gọi API cho tất cả menu items
          const promises = menuItems.map(async (item) => {
            if (item.key === "Về chúng tôi") {
              // Gọi API riêng cho mục "Về chúng tôi"
              const veChungToiData = await fetchDataVeChungToi();
              return {
                ...item,
                ...veChungToiData,
              };
            } else {
              // Gọi API để lấy danh mục
              const danhMucData = await fetchDataDanhMuc(item.key);
              // Gọi API để lấy bài viết tương ứng với từng danh mục
              const baiVietData = await Promise.all(
                danhMucData.map(async (danhMuc: any) => {
                  const baiViet = await fetchDataBaiViet(danhMuc.name);
                  return {
                    ...danhMuc,
                    baiViet: baiViet,
                  };
                })
              );
              return {
                ...item,
                danhMuc: baiVietData,
              };
            }
          });

          const updatedMenuItems = await Promise.all(promises);

          // Cập nhật state của menuItems với dữ liệu mới
          setMenuItems(updatedMenuItems);
        } catch (error) {
          console.error("Error fetching menu data:", error);
        } finally {
          setLoading(false); // Đảm bảo setLoading được gọi để tắt trạng thái loading
        }
      };

      fetchMegaMenu();
    }
  }, [isOpen]);

  const [openKeys, setOpenKeys] = useState<string[]>([]);
  const [openSubKeys, setOpenSubKeys] = useState<{ [key: string]: string[] }>(
    {}
  );

  const rootSubmenuKeys = menuItems.map((item: any) => item.key);

  const onOpenChange = (keys: string[]) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey!) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  const onSubOpenChange = (rootKey: string, keys: string[]) => {
    const latestOpenKey = keys.find(
      (key) => openSubKeys[rootKey]?.indexOf(key) === -1
    );
    setOpenSubKeys({
      ...openSubKeys,
      [rootKey]: latestOpenKey ? [latestOpenKey] : [],
    });
  };

  const renderTitleWithIcon = (title: string, key: string) => {
    const isOpen = openKeys.includes(key);
    return (
      <div className="flex justify-between items-center">
        <span>{title}</span>
        {isOpen ? (
          <IconAngleUp width="16" height="16" />
        ) : (
          <IconAngleDown width="16" height="16" />
        )}
      </div>
    );
  };

  const renderChildTitleWithIcon = (
    title: string,
    key: string,
    rootKey: string
  ) => {
    const isOpen = openSubKeys[rootKey] && openSubKeys[rootKey].includes(key);
    return (
      <div className="flex justify-between items-center">
        <span>{title}</span>
        {isOpen ? <IconMinus /> : <IconPlus />}
      </div>
    );
  };

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [isOpen]);

  return (
    <div
      className={`${
        isOpen ? "fixed" : "hidden"
      } top-0 left-0 w-full h-full bg-white z-50 overflow-y-auto`}>
      <div className="flex justify-between items-center mb-4 shadow px-[31px] py-4">
        <Link href={`/${locale}`} className="my-auto">
          <Image src={NTSLogo.src} alt="NTS Logo" width={60} height={40} />
        </Link>
        <button onClick={toggleMenu} className="text-lg">
          <IconClose />
        </button>
      </div>
      <LanguageSwitch />
      {loading ? (
        <Loading />
      ) : (
        <Menu
          mode="inline"
          className="mt-4 flex flex-col gap-2"
          openKeys={openKeys}
          onOpenChange={onOpenChange}>
          {menuItems.map((item: any) => {
            if (!item.danhMuc || item.danhMuc.length === 0) {
              return (
                <Menu.Item
                  key={item.key}
                  className="text-black text-lg font-semibold leading-relaxed">
                  <Link
                    href={item.pathname}
                    className="!text-black !text-lg !font-semibold leading-relaxed">
                    {item.name}
                  </Link>
                </Menu.Item>
              );
            }
            return (
              <Menu.SubMenu
                key={item.key}
                title={renderTitleWithIcon(item.name, item.key)}
                className="text-black text-lg font-semibold px-0">
                <Menu
                  mode="inline"
                  openKeys={openSubKeys[item.key] || []}
                  onOpenChange={(keys) => onSubOpenChange(item.key, keys)}>
                  {item.key === "Về chúng tôi" ? null : (
                    <Menu.Item className="text-[#3B559E] text-base font-normal leading-relaxed">
                      <Link
                        href={item.pathname}
                        className="!text-[#3B559E] text-base font-normal leading-relaxed px-0">
                        {locale === "vi" ? "Đến trang " : "Go to "} {item.name}
                      </Link>
                    </Menu.Item>
                  )}

                  {item.danhMuc.map((danhMucItem: any) => {
                    if (
                      !danhMucItem.baiViet ||
                      danhMucItem.baiViet.length === 0
                    ) {
                      return (
                        <Menu.Item
                          key={danhMucItem.slug}
                          className="!text-base !font-normal !text-[#000]">
                          <Link
                            href={danhMucItem.slug}
                            className="!text-base !font-normal !text-[#000] ">
                            {danhMucItem.name}
                          </Link>
                        </Menu.Item>
                      );
                    }
                    return (
                      <Menu.SubMenu
                        key={danhMucItem.slug}
                        title={renderChildTitleWithIcon(
                          danhMucItem.name,
                          danhMucItem.slug,
                          item.key
                        )}
                        className="!text-base !font-normal !text-[#000] ">
                        <Menu.Item className="text-[#3B559E] text-base font-normal leading-relaxed">
                          <Link
                            href={danhMucItem.slug}
                            className="!text-[#3B559E] text-base font-normal leading-relaxed">
                            {locale === "vi" ? "Đến trang " : "Go to "}{" "}
                            {danhMucItem.name}
                          </Link>
                        </Menu.Item>
                        {danhMucItem.baiViet
                          .slice(0, 4)
                          .map((baiVietItem: any) => (
                            <Menu.Item
                              key={baiVietItem.slug}
                              className="text-[#3B559E] text-base font-normal leading-relaxed">
                              <Link
                                href={baiVietItem.slug}
                                className="!text-gray-500 !text-base !font-normal leading-relaxed">
                                {baiVietItem.title}
                              </Link>
                            </Menu.Item>
                          ))}
                      </Menu.SubMenu>
                    );
                  })}
                </Menu>
              </Menu.SubMenu>
            );
          })}
        </Menu>
      )}
    </div>
  );
};

export default MobileMenuNew;
