import { Collapse, Typography } from "antd";
import { useState } from "react";
import { DownOutlined, MenuOutlined, RightOutlined } from "@ant-design/icons"; // Thêm icon từ Ant Design

const { Panel } = Collapse;
const { Text } = Typography;

interface CategoryDetail {
  id: number;
  title: string;
  slug: string;
  childrens?: CategoryDetail[];
}

interface DetailCategoryProps {
  categories: CategoryDetail[];
}

// Hàm xử lý cuộn mượt mà với khoảng cách top 200px
const scrollToSection = (slug: string) => {
  const element = document.getElementById(slug);
  if (element) {
    const yOffset = -200; // Cách top 200px
    const y =
      element.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: "smooth" });
  }
};

const DetailCategory: React.FC<DetailCategoryProps> = ({ categories }) => {
  const [activeCategory, setActiveCategory] = useState<number | null>(null);

  const handleCategoryClick = (id: number) => {
    setActiveCategory((prev) => (prev === id ? null : id));
  };

  return (
    <div className="py-[40px] laptop:px-[156px] tablet:px-[128px] mobile:px-[16px] mobile:pb-[20px] rounded-md detailNew-category">
      <Collapse
        defaultActiveKey={["main"]}
        expandIconPosition="end"
        className="rounded-none border-2 border-gray-800 bg-[#fff] p-0">
        <Panel
          className="text-[24px] font-[700]"
          header={
            <Text className="text-[24px] font-bold text-gray-800">
              <MenuOutlined className="mr-[8px]" /> Nội dung bài viết
            </Text>
          }
          key="main">
          {/* Lặp qua các danh mục lớn */}
          {categories.map((category) => (
            <div key={category.id} className="mb-2">
              {category.childrens && category.childrens.length > 0 ? (
                // Nếu có danh mục con, sử dụng Collapse để hiển thị danh mục cha với danh mục con
                <Collapse
                  activeKey={
                    activeCategory === category.id ? "active" : undefined
                  }
                  onChange={() => handleCategoryClick(category.id)}
                  className="border-none bg-white text-base font-bold flex items-center py-0 px-[23px]">
                  <Panel
                    header={category.title}
                    key="active"
                    className="!border-none !bg-white">
                    {/* Danh mục con */}
                    <ul className="ml-4 space-y-2">
                      {category.childrens.map((child) => (
                        <li key={child.id}>
                          <span
                            onClick={() => scrollToSection(child.slug)}
                            className="text-gray-600 ml-[16px] hover:text-blue-500 cursor-pointer">
                            {child.title}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </Panel>
                </Collapse>
              ) : (
                // Nếu không có danh mục con, hiển thị danh mục cha như một liên kết để cuộn đến
                <div
                  onClick={() => scrollToSection(category.slug)}
                  className="text-base font-bold text-gray-800 hover:text-blue-500 cursor-pointer py-2 px-[23px] ml-[40px]">
                  {category.title}
                </div>
              )}
            </div>
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default DetailCategory;
