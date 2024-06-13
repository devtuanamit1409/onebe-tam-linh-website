import React from "react";
import { useRouter } from "next/router";

// Định nghĩa interface cho props của component
interface CustomLinkProps {
  href: string; // Kiểu dữ liệu cho href là string
  children: React.ReactNode; // Kiểu dữ liệu cho children, có thể là bất kỳ React node nào
}

const CustomLink: React.FC<CustomLinkProps> = ({ href, children }) => {
  const router = useRouter();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault(); // Ngăn trình duyệt tải lại trang
    router.replace(href); // Sử dụng router.replace hoặc bạn có thể thay đổi thành router.push nếu cần
  };

  return (
    <a href={href} onClick={handleClick}>
      {children}
    </a>
  );
};

export default CustomLink;
