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
            <Collapse
              key={category.id}
              activeKey={activeCategory === category.id ? "active" : undefined}
              onChange={() => handleCategoryClick(category.id)}
              // expandIcon={({ isActive }) =>
              //   isActive ? (
              //     <DownOutlined className="mr-2" />
              //   ) : (
              //     <RightOutlined className="mr-2" />
              //   )
              // }
              className="border-none bg-white text-base font-bold flex items-center py-0 px-[23px]">
              <Panel header={category.title} key="active">
                {/* Danh mục con */}
                <ul className="ml-4 space-y-2">
                  {category.childrens?.map((child) => (
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
          ))}
        </Panel>
      </Collapse>
    </div>
  );
};

export default DetailCategory;
