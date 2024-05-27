import Link from "next/link";
import IconAngleRight from "../icons/IconAngleRight";
import IconAngleRightColorFull from "../icons/IconAngleRightColorFull";
import { useEffect, useState } from "react";

const MegaMenu = ({
  activeKey,
  isMenuOpen,
  isTransitioning,
}: {
  activeKey: string | null;
  isMenuOpen: boolean;
  isTransitioning: boolean;
}) => {
  const megaMenuItem = [
    {
      key: "san-pham",
      title: "Sản phẩm",
      description:
        "NTS Engineering với với đội ngũ chuyên gia luôn tìm tòi các sản phẩm plastic nhằm nâng cao hiệu quả công nghệ xử lý nước thải, xử lý nước cấp.",
      url: "/san-pham",
      content: [
        {
          title: "Vật liệu mới, thiết bị plastic ngành nước",
          Descriptions:
            "Chúng tôi tìm kiếm và thử nghiệm các vật liệu tiên tiến trên thế giới kết hợp với các vật liệu của các công ty uy tín hàng đầu tại Việt Nam.",
          url: null,
          icon: null,
          children: [
            {
              title: "Hệ thống lọc tổng",
              url: "/",
              icon: <IconAngleRight />,
            },
            {
              title: "Xử lý nước cấp sinh hoạt",
              url: "/",
              icon: <IconAngleRight />,
            },
          ],
        },
        {
          title: "Thiết bị xử lý nước",
          Descriptions:
            "Thiết bị xử lý nước nhập khẩu cao cấp được tối ưu hóa trong các giải pháp của chúng tôi giúp khách hàng tối ưu hóa chi phí đầu tư",
          url: null,
          icon: null,
          children: [
            {
              title: "Bệnh viện",
              url: "/",
              icon: <IconAngleRight />,
            },
            {
              title: "Khu dân cư",
              url: "/",
              icon: <IconAngleRight />,
            },
            {
              title: "Toà nhà văn phòng",
              url: "/",
              icon: <IconAngleRight />,
            },
            {
              title: "Trường học",
              url: "/",
              icon: <IconAngleRight />,
            },
          ],
        },
        {
          title: "Thiết bị tưới cây, tưới cây tự động",
          Descriptions:
            "Được truyền cảm hứng để biến nước thải trở thành nguồn tài nguyên có ích, góp phần bảo vệ môi trường. Thiết bị tưới cây giúp chúng tôi hoàn thiện giải pháp sử dụng nước hiện quả",
          url: null,
          icon: null,
          children: [
            {
              title: "Thu gom & sử dụng nước mưa",
              url: "/",
              icon: <IconAngleRight />,
            },
            {
              title: "Tái sử dụng nước thải",
              url: "/",
              icon: <IconAngleRight />,
            },
          ],
        },
      ],
    },
    {
      key: "dich-vu",
      title: "Dịch vụ",
      description:
        "Kết nối giữa học thuật và thực tiễn giúp chúng tôi tìm ra những giải pháp vượt trội giúp khách hàng tối ưu hóa chi phí đầu tư.",
      url: "/dich-vu",
      content: [
        {
          title: "Tư vấn giải pháp tái sử dụng nước",
          Descriptions:
            "Nước thải dùng cho tưới cây, nước mưa tái sử dụng cho nhiều mục đích khác nhau trong đời sống. ",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Bảo hành, bảo trì chuyên nghiệp",
          Descriptions:
            "Dù thiết bị tốt, giải pháp chuyên sâu nhưng bảo hành chu đáo và bảo trì chuyên nghiệp giúp cho khách hàng thực sự an tâm. ",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Thi công, chuyển giao công nghệ",
          Descriptions:
            "Nghiên cứu chuyên sâu giúp chúng tôi đưa ra các giải pháp tốt về mặt lý thuyết, triển khai thực tế giúp chúng tôi hoàn thiện các giải pháp của mình.  ",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Tư vấn kỹ thuật nước",
          Descriptions:
            "Kết nối giữa học thuật và thực tiễn giúp chúng tôi tìm ra những giải pháp vượt trội giúp khách hàng tối ưu hóa chi phí đầu tư. ",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Đào tạo nghề ngành nước",
          Descriptions:
            "Đào tạo ngành nước giúp chúng tôi có nguồn nhân lực, chia sẻ tri thức để góp phần nâng cao chất lượng chung của nhân lực ngành nước.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
      ],
    },
    {
      key: "du-an",
      title: "Dự án",
      description:
        "Lorem ipsum dolor sit amet consectetur. Diam ut volutpat aenean pellentesque fermentum dignissim molestie. Aliquam ut sagittis dolor sed blandit.",
      url: "/du-an",
      content: [
        {
          title: "Ngành Xử lý nước",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Ngành Thiết kế cơ điện",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices. ",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Dự án cộng đồng",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [
            {
              title: "ATM Nước",
              url: "/",
              icon: <IconAngleRight />,
            },
            {
              title: "Tư vấn quản lý và sử dụng nguồn nước hiệu quả",
              url: "/",
              icon: <IconAngleRight />,
            },
            {
              title: "Chuyện của nước",
              url: "/",
              icon: <IconAngleRight />,
            },
          ],
        },
      ],
    },
    {
      key: "ve-chung-toi",
      title: "Về chúng tôi",
      description:
        "Lorem ipsum dolor sit amet consectetur. Diam ut volutpat aenean pellentesque fermentum dignissim molestie. Aliquam ut sagittis dolor sed blandit.",
      url: "/ve-chung-toi",
      content: [
        {
          title: "Về chúng tôi",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Góc chuyên gia",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices. ",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Chương trình cộng đồng",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Các công ty thành viên",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
      ],
    },
    {
      key: "thong-tu-nghi-dinh",
      title: "Thông tư -  Nghị định",
      description:
        "Lorem ipsum dolor sit amet consectetur. Diam ut volutpat aenean pellentesque fermentum dignissim molestie. Aliquam ut sagittis dolor sed blandit.",
      url: "/ve-chung-toi",
      content: [
        {
          title: "Luật bảo vệ môi trường",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Môi trường nước",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices. ",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Chất thải rắn nguy hại",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Khí thải - Tiếng ồn",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Phòng cháy chữa cháy",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
        {
          title: "Thiết kế cơ điện",
          Descriptions:
            "Lorem ipsum dolor sit amet consectetur. Quisque diam in lacus sed ultrices.",
          url: "/",
          icon: <IconAngleRightColorFull />,
          children: [],
        },
      ],
    },
  ];

  const activeItem = megaMenuItem.find((item) => item.key === activeKey);

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timeoutId = setTimeout(
      () => {
        setIsOpen(isMenuOpen);
      },
      isTransitioning ? 450 : 0
    );

    return () => clearTimeout(timeoutId);
  }, [isMenuOpen, isTransitioning]);

  return (
    <>
      {activeKey === "doi-tac" || activeKey === "tin-tuc" ? null : (
        <div
          className={`hidden desktop:block px-[92px] py-[37.5px] border-t-2 border-[#28A645] absolute left-0 w-full bg-white z-50 transition-all duration-700 ease-in-out ${
            isMenuOpen ? "top-[100px]" : "-translate-y-full"
          }`}>
          {activeItem && (
            <div className="flex justify-between gap-[32.5px]">
              <div className="w-[300px]  flex-col justify-start items-start gap-8 inline-flex">
                <h2 className="self-stretch text-indigo-800 text-[40px] font-bold leading-[64px]">
                  {activeItem.title}
                </h2>
                <p className="w-[300px]  text-gray-500 text-base font-normal leading-normal">
                  {activeItem.description}
                </p>
                <Link
                  href={activeItem.url}
                  className="text-center text-base font-medium leading-normal px-6 py-3 bg-indigo-800 border border-indigo-800 hover:bg-[#fff] hover:border-indigo-800  text-white hover:text-indigo-800  transition-colors transition-border duration-300 ease-in-out rounded-[50px] justify-center items-center gap-2.5 inline-flex ">
                  Xem thêm
                </Link>
              </div>
              <div className="min-h-full w-1 bg-[#28A645] rounded"></div>
              <div className="flex-1  grid grid-cols-3 gap-x-8 gap-y-4">
                {activeItem.content.map((item, index) => {
                  return (
                    <>
                      <div className="flex flex-col  items-start">
                        <div className="w-full h-[175px]">
                          <h4
                            key={index}
                            className=" text-black text-lg font-semibold  leading-relaxed flex items-center justify-between">
                            {item.title} {item.icon !== null ? item.icon : ""}
                          </h4>
                          {item.Descriptions && (
                            <p className=" text-slate-400 text-xs font-normal leading-snug">
                              {" "}
                              {item.Descriptions}
                            </p>
                          )}
                        </div>
                        {item.children &&
                          item.children.map((child, childIndex) => (
                            <div
                              key={childIndex}
                              className="text-black hover:text-[#28A645] text-base font-semibold leading-normal w-full ">
                              <Link
                                href={child.url}
                                className="flex items-center justify-between mb-4 ">
                                {child.title}
                                {child.icon}
                              </Link>
                            </div>
                          ))}
                      </div>
                    </>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
};
export default MegaMenu;
