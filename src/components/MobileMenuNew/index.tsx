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
  const [dataMobileMenu, setDataMobileMenu] = useState<any>([
    { key: "Sản phẩm", name: t("products"), url: "/san-pham" },
    { key: "Dịch vụ", name: t("services"), url: "/dich-vu" },
    { key: "Dự án", name: t("projects"), url: "/du-an" },
    { key: "Đối tác", name: t("partners"), url: "/doi-tac" },
    { key: "Về chúng tôi", name: t("about_us"), url: "/ve-chung-toi" },
    { key: "Tin tức", name: t("newsTitle"), url: "/tin-tuc" },
    {
      key: "Thông tư nghị định",
      name: t("circular_decree"),
      url: "/thong-tu-nghi-dinh",
    },
  ]);
  const [dataVeChungToi, setDataVeChungToi] = useState<any>([]);
  const [loading, setLoading] = useState(true);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

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
      setDataVeChungToi([
        {
          id: 1,
          name: veChungToi.attributes.main.name,
          description: veChungToi.attributes.main.description,
          slug: "/ve-chung-toi",
        },
        {
          id: 2,
          name: "Góc chuyên gia",
          description: gocChuyenGia.attributes.description,
          slug: "/goc-chuyen-gia",
        },
        {
          id: 3,
          name: "Công ty thành viên",
          description: congTyThanhVien.attributes.description,
          slug: "/cong-ty-thanh-vien",
        },
        {
          id: 4,
          name: duAnCongDong[0].attributes.name,
          description: duAnCongDong[0].attributes.description,
          slug: duAnCongDong[0].attributes.slug,
        },
      ]);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchDataMobile = async (key: any) => {
    try {
      const endpoint = `${process.env.URL_API}/api/danh-muc-cons?filters[category][$eqi]=${key}&locale=${locale}`;
      const response = await apiService.get<any>(endpoint);
      const danhMucData = response.data.map((item: any) => ({
        description: item.attributes.description,
        name: item.attributes.name,
        slug: item.attributes.slug,
      }));
      const baiVietPromises = danhMucData.map(async (danhMucItem: any) => {
        const baiVietData = await fetchData(danhMucItem.name);
        return { ...danhMucItem, baiViet: baiVietData };
      });
      return await Promise.all(baiVietPromises);
    } catch (error) {
      console.error("Error fetching data:", error);
      return [];
    }
  };

  const fetchData = async (name: string) => {
    try {
      const endpoint = `${process.env.URL_API}/api/bai-viets?populate=danh_muc_cons&filters[danh_muc_cons][name][$eq]=${name}&locale=${locale}`;
      const response = await apiService.get<any>(endpoint);
      return response.data.map((item: any) => ({
        title: item.attributes.title,
        slug: item.attributes.slug,
      }));
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchDataVeChungToi();
  }, [locale]);

  useEffect(() => {
    const fetchMegaMenu = async () => {
      setLoading(true);
      try {
        const newMegaMenu = await Promise.all(
          dataMobileMenu.map(async (menu: any) => {
            if (menu.key === "Về chúng tôi") {
              return { ...menu, danhMuc: dataVeChungToi };
            } else {
              const danhMuc = await fetchDataMobile(menu.key);
              return { ...menu, danhMuc };
            }
          })
        );

        setDataMobileMenu(newMegaMenu);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMegaMenu();
  }, [locale, dataVeChungToi]);

  useEffect(() => {
    console.log("dataMobileMenu", dataMobileMenu);
  }, [dataMobileMenu]);

  const onOpenChange = (keys: string[]) => {
    setOpenKeys(keys);
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

  const renderChildTitleWithIcon = (title: string, key: string) => {
    const isOpen = openKeys.includes(key);
    return (
      <div className="flex justify-between items-center">
        <span>{title}</span>
        {isOpen ? <IconMinus /> : <IconPlus />}
      </div>
    );
  };

  const handleMenuClick = (key: string) => {
    setOpenKeys((prevOpenKeys) =>
      prevOpenKeys.includes(key)
        ? prevOpenKeys.filter((openKey) => openKey !== key)
        : [key]
    );
  };

  const handleSubMenuClick = (key: string) => {
    setOpenKeys((prevOpenKeys) =>
      prevOpenKeys.includes(key)
        ? prevOpenKeys.filter((openKey) => openKey !== key)
        : [key]
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
          {dataMobileMenu.map((item: any) => {
            if (!item.danhMuc || item.danhMuc.length === 0) {
              return (
                <Menu.Item
                  key={item.key}
                  className="text-black text-lg font-semibold leading-relaxed">
                  <Link
                    href={item.url}
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
                onTitleClick={() => handleMenuClick(item.key)}
                className="text-black text-lg font-semibold px-0">
                <Menu.Item className="text-[#3B559E] text-base font-normal leading-relaxed">
                  <Link
                    href={item.url}
                    className="!text-[#3B559E] text-base font-normal leading-relaxed px-0">
                    {locale === "vi" ? "Đến trang " : "Go to "} {item.name}
                  </Link>
                </Menu.Item>
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
                        danhMucItem.slug
                      )}
                      onTitleClick={() => handleSubMenuClick(danhMucItem.slug)}
                      className="!text-base !font-normal !text-[#000] ">
                      <Menu.Item className="text-[#3B559E] text-base font-normal leading-relaxed">
                        <Link
                          href={danhMucItem.slug}
                          className="!text-[#3B559E] text-base font-normal leading-relaxed">
                          {locale === "vi" ? "Đến trang " : "Go to "}{" "}
                          {danhMucItem.name}
                        </Link>
                      </Menu.Item>
                      {danhMucItem.baiViet.map((baiVietItem: any) => (
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
              </Menu.SubMenu>
            );
          })}
        </Menu>
      )}
    </div>
  );
};

export default MobileMenuNew;
