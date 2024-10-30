"use client";
import { useEffect, useState } from "react";
import Script from "next/script";
import { ENDPOINT } from "@/enums/endpoint.enum";

interface ScriptFromAPIProps {
  slug: string; // Nhận slug từ props
}

const ScriptFromAPI: React.FC<ScriptFromAPIProps> = ({ slug }) => {
  const [scriptContent, setScriptContent] = useState<string | null>(null);

  // Hàm để xác định endpoint dựa trên slug
  const getEndpoint = (slug: string) => {
    // Kiểm tra xem slug có kết thúc bằng timestamp không
    const isCategoryDetail = /\d{13}$/.test(slug);

    if (isCategoryDetail) {
      // Đây là trường hợp của danh mục chi tiết
      return `${ENDPOINT.GET_DANHMUCCON}?filters[slug]=${slug}`;
    } else if (
      slug.startsWith("giai-phap-lua-chon-gia-the-vi-sinh-hieu-qua-tu-duc")
    ) {
      // Đây là trường hợp bài viết chi tiết
      return `${ENDPOINT.GET_BAIVIET}?filters[slug]=${slug}`;
    } else {
      // Các endpoint khác
      switch (slug) {
        case "cong-ty-thanh-vien":
          return ENDPOINT.GET_CTTV;
        case "dich-vu":
          return ENDPOINT.GET_DICHVU;
        case "doi-tac":
          return ENDPOINT.GET_DOITAC;
        case "du-an":
          return ENDPOINT.GET_DUAN;
        case "goc-chuyen-gia":
          return ENDPOINT.GET_TTND;
        case "san-pham":
          return ENDPOINT.GET_SANPHAM;
        case "thong-tu-nghi-dinh":
          return ENDPOINT.GET_TTND;
        case "tin-tuc":
          return ENDPOINT.GET_BAIVIET;
        case "ve-chung-toi":
          return ENDPOINT.GET_VECHUNGTOI;
        default:
          return null;
      }
    }
  };

  useEffect(() => {
    const fetchScriptContent = async () => {
      const endpoint = getEndpoint(slug);
      if (!endpoint) {
        console.error("No endpoint found for this slug:", slug);
        return;
      }

      try {
        const response = await fetch(endpoint);
        if (response.ok) {
          const data = await response.json();
          // Giả sử nội dung script được trả về trong `data.content`
          setScriptContent(data.content || "");
        } else {
          console.error("Failed to fetch script content from API.");
        }
      } catch (error) {
        console.error("Error fetching script content:", error);
      }
    };

    fetchScriptContent();
  }, [slug]); // Thêm `slug` vào dependency array để gọi lại API khi slug thay đổi

  // if (!scriptContent) return null;

  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="topcontent" strategy="beforeInteractive">
      {scriptContent ? scriptContent : ""}
      {`console.log("Script loaded from API with slug:", "${slug}");`}
    </Script>
  );
};

export default ScriptFromAPI;
