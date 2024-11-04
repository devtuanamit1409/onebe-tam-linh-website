"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Script from "next/script";
import { ENDPOINT } from "@/enums/endpoint.enum";

const ScriptFromAPI: React.FC = () => {
  const [scriptContent, setScriptContent] = useState<any | null>(null);
  const pathname = usePathname();

  // Hàm để xác định endpoint dựa trên slug
  const getEndpoint = (slug: string): string | null => {
    const isTimestampedSlug = /\d{13}$/.test(slug);

    if (isTimestampedSlug) {
      // Trường hợp slug có chứa timestamp (danh mục chi tiết)
      return `${ENDPOINT.GET_DANHMUCCON}?filters[slug]=${slug}`;
    }

    // Xử lý các slug tĩnh khác (danh mục)
    switch (slug) {
      case "":
        return `${ENDPOINT.GET_HOME}`;
      case "cong-ty-thanh-vien":
        return `${ENDPOINT.GET_CTTV}`;
      case "dich-vu":
        return `${ENDPOINT.GET_DICHVU}?populate=main.top_content`;
      case "doi-tac":
        return ENDPOINT.GET_DOITAC;
      case "du-an":
        return `${ENDPOINT.GET_DUAN}?populate=main.top_content`;
      case "goc-chuyen-gia":
        return ENDPOINT.GET_GOCCHUYEN_GIA;
      case "san-pham":
        return `${ENDPOINT.GET_SANPHAM}?populate=main.top_content`;
      case "thong-tu-nghi-dinh":
        return `${ENDPOINT.GET_TTND}?populate=main.top_content`;
      case "tin-tuc":
        return ENDPOINT.GET_BAIVIET;
      case "ve-chung-toi":
        return `${ENDPOINT.GET_VECHUNGTOI}?populate=main.top_content`;
      default:
        // Nếu không có trong danh sách danh mục và không có timestamp, coi là bài viết chi tiết
        return `${ENDPOINT.GET_BAIVIET}?filters[slug]=${slug}`;
    }
  };

  useEffect(() => {
    // Tách slug từ đường dẫn hiện tại
    const slug = pathname.split("/").pop() || ""; // Lấy phần cuối của đường dẫn làm slug
    console.log("slug", slug);
    const token =
      process.env.NODE_ENV !== "production"
        ? process.env.DEV_TOKEN
        : process.env.DEV_TOKEN;

    const fetchScriptContent = async () => {
      const endpoint = getEndpoint(slug);
      console.log("endpoint", endpoint);
      if (!endpoint) {
        console.error("No endpoint found for this slug:", slug);
        return;
      }

      if (!endpoint) {
        console.error("No endpoint found for this slug:", slug);
        return;
      }

      try {
        const response = await fetch(endpoint, {
          headers: {
            Authorization: `Bearer ${token}`, // Thay 'token' bằng mã token của bạn
          },
        });
        if (!response.ok) {
          throw new Error(`Failed to fetch from ${endpoint}`);
        }

        const data = await response.json();
        console.log("data", data.data[0].attributes);
        setScriptContent(data.data.attributes || data.data[0].attributes);
      } catch (error) {
        console.error("Error fetching script content:", error);
      }
    };

    fetchScriptContent();
  }, [pathname]); // Thực thi lại khi đường dẫn thay đổi

  if (!scriptContent) {
    return null;
  }

  // Lấy nội dung JSON-LD từ scriptContent
  let jsonLdContent = scriptContent?.main
    ? scriptContent.main.top_content
    : scriptContent.top_content;

  // Biến để lưu trữ giá trị type (nếu có)
  let scriptType = "application/ld+json"; // Giá trị mặc định nếu không tìm thấy type

  // Sử dụng regex để tìm và tách thuộc tính type từ thẻ <script> nếu nó tồn tại
  const typeMatch = jsonLdContent?.match(/<script.*?type=["'](.*?)["'].*?>/i);
  if (typeMatch && typeMatch[1]) {
    scriptType = typeMatch[1]; // Lấy giá trị của type
  }

  // Loại bỏ thẻ <script> mở và đóng khỏi nội dung
  jsonLdContent = jsonLdContent?.replace(/<script.*?>|<\/script>/gi, "");

  return (
    // eslint-disable-next-line @next/next/no-before-interactive-script-outside-document
    <script
      id="dynamic-script"
      type={scriptType}
      dangerouslySetInnerHTML={{
        __html: jsonLdContent,
      }}
    />
  );
};

export default ScriptFromAPI;
