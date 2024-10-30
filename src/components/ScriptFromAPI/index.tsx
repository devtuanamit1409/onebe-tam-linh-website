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
  const getEndpoint = (slug: string): string | null => {
    const isTimestampedSlug = /\d{13}$/.test(slug);

    if (isTimestampedSlug) {
      // Trường hợp slug có chứa timestamp (danh mục chi tiết)
      return `${ENDPOINT.GET_DANHMUCCON}?filters[slug]=${slug}`;
    }

    // Xử lý các slug tĩnh khác (danh mục)
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
        // Nếu không có trong danh sách danh mục và không có timestamp, coi là bài viết chi tiết
        return `${ENDPOINT.GET_BAIVIET}?filters[slug]=${slug}`;
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
        if (!response.ok) {
          throw new Error(`Failed to fetch from ${endpoint}`);
        }

        const data = await response.json();
        setScriptContent(data.content || "");
      } catch (error) {
        console.error("Error fetching script content:", error);
      }
    };

    fetchScriptContent();
  }, [slug]);

  if (!scriptContent) {
    return null;
  }

  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <Script id="dynamic-script" strategy="beforeInteractive">
      {scriptContent}
      {`console.log("Script loaded from API with slug:", "${slug}");`}
    </Script>
  );
};

export default ScriptFromAPI;
