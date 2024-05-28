// app/[id]/page.tsx
"use client";

import BoxTinTuc from "@/components/BoxTinTuc/BoxTinTuc";
import ContactEnd from "@/components/ContactEnd/ContactEnd";
import IconArrowRight from "@/components/icons/IconArrowRight";
import { Breadcrumb } from "antd";
import Link from "next/link";

const DetailPage = ({ params }: { params: { id: string } }) => {
  const data =
    '<h2 style="text-align:center;">Hệ thống lọc tổng</h2><p>&nbsp;</p><figure class="image"><img src="https://medbuy.demo-amit.com/ecommerce_files/images/15f2fba0-1c03-11ef-9293-b7d9b1ad3ece--Rectangle 4432.png"></figure><p>&nbsp;</p><p>Thực trạng nguồn nước mặt bị ô nhiễm như hiện nay khiến chúng ta khó mà tin tưởng sử dụng nguồn nước từ Hệ thống cấp nước đô thị.&nbsp;Nước sạch đang là một vấn đề cấp bách trong cả sinh hoạt gia đình cũng như trong sản xuất công nghiệp. Nhằm đảm bảo nguồn nước sử dụng luôn sạch và an toàn nhất. Hãy cùng&nbsp;NTS&nbsp;tìm hiểu về&nbsp;Hệ thống lọc tổng&nbsp;qua bài viết sau đây.</p><h3>Khi nào cần đến hệ thống lọc tổng?</h3><p>Cho dù bạn đang sử dụng nước máy (từ hệ thống cấp nước) hoặc nước giếng khoan hàng ngày. Có thể bạn chưa gặp bất kì vấn đề gì về sức khỏe, cũng như những rắc rối khác trong sinh hoạt. Điều này có thể làm bạn lầm tưởng rằng, nước đang dùng không có bất kì vấn đề gì về chất lượng.<br>Tuy nhiên, rất nhiều chất ô nhiễm không tạo ra màu, mùi, hay vị khác lạ ở hàm lượng nhỏ. Nhưng nếu sử dụng liên tục sẽ dẫn đến tích tụ và nguy hại nghiêm trọng đến sức khỏe. Kèm theo đó là một số biểu hiện của các bệnh do nguồn nước không đảm bảo chất lượng như:</p><ul><li>Các bệnh đường tiêu hóa thường gặp như: tả, lỵ, thương hàn, tiêu chảy;</li><li>Bệnh giun sán: Giun đũa, giun tóc, giun móc, giun kim;</li><li>Các bệnh về mắt, ngoài da, bệnh phụ khoa,…</li><li>Hậu quả chung của tình trạng ô nhiễm nước là tỉ lệ người mắc các bệnh cấp và mạn tính liên quan đến ô nhiễm nước ngày càng gia tăng.<br>&nbsp;</li></ul><h3>Hệ thống lọc tổng</h3><p>Hệ thống lọc tổng&nbsp;là một hệ thống lọc nước được lắp ở đầu nguồn nước cấp cho cả một căn nhà/toàn nhà, công ty, nhà xưởng,… Hệ thống này sẽ giúp bạn có nguồn nước sạch sinh hoạt và sản xuất hằng ngày ở bất cứ vị trí nào trong nhà/ công trình.<br>Hệ thống lọc tổng sẽ giải quyết triệt để vấn đề nguồn nước bạn sử dụng với mục đích gì chăng nữa và tại bất kì vị trí lấy nước nào cũng hoàn toàn sạch và đảm bảo chất lượng từ đó đảm bảo an toàn cho bạn và gia đình mình.</p><p>&nbsp;</p><p><img src="https://medbuy.demo-amit.com/ecommerce_files/images/638eb070-1c03-11ef-9293-b7d9b1ad3ece--Rectangle 4433.png"><br>&nbsp;</p><p>&nbsp;</p><p>Ưu điểm</p><ul style="list-style-type:disc;"><li>Loại bỏ dư lượng hóa chất lọc, khử màu và mùi có trong nước máy; phèn và kim loại nặng trong nước giếng khoan.</li><li>Loại bỏ hoàn toàn tạp chất hữu cơ, rỉ sét do đường ống phai ra.</li><li>Loại bỏ các đốm trắng, cặn đen, vết ố vàng trên thành bát đĩa, cốc, đồ thủy tinh, đồ sứ, chậu rửa, vòi nước, ngăn ngừa vi khuẩn, ký sinh hoặc bám bẩn, gây khó chịu cho người sử dụng.</li><li>Bảo vệ thiết bị sử dụng nước, tăng độ bền cho các thiết bị trong gia đình. Giữ chậu rửa, bồn rửa, nhà vệ sinh sạch lâu hơn.&nbsp;</li><li>Giảm tần suất sử dụng các chất tẩy rửa, bảo vệ môi trường.</li><li>Bảo vệ sức khỏe của tất cả các thành viên trong gia đình.</li><li>Hạn chế tối đa rủi ro phát sinh ngoài ý muốn mà nhà máy nước không xử lý được.</li><li>Cung cấp nguồn nước sạch sinh hoạt và sản xuất hằng ngày ở bất cứ vị trí nào trong nhà/ công trình.</li></ul><p>&nbsp;</p><h3>Cấu tạo hệ thống lọc tổng của&nbsp;NTS</h3><p>Hệ thống lọc nước tổng sinh hoạt thường được lắp đặt ở đầu nguồn cấp nước cho toàn công trình, thường là sau bồn cấp nước mái, hoặc trước bơm cấp nước tăng áp. Đó là sự khách biệt lớn nhất của lọc tổng so với một hệ thống lọc nước cục bộ tại vòi.</p><p>&nbsp;</p><p><img src="https://medbuy.demo-amit.com/ecommerce_files/images/cf05d400-1c03-11ef-9293-b7d9b1ad3ece--Rectangle 4434.png"></p><p>Về cấu tạo, một hệ thống lọc nước tổng sinh hoạt không có nhiều khác biệt so với lọc cục bộ. Có thể có 1 cột, 2 cột hoặc 3 cột, tùy vào chất lượng nước đầu vào. Sau đây,&nbsp;NTS&nbsp;xin đưa ra ví dụ cho một hệ thống lọc tổng.<br>Đầu tiên, nước đầu nguồn sẽ được máy bơm hút vào hệ thống lọc tổng. Sau đó, nước sẽ được chuyển qua lần lượt các bước cụ thể như sau:</p><ul><li>Bồn lọc ODM-2F: Dạng hạt 0.8 – 2.0 mm, có tính hấp phụ giúp khử sắt, mangan, asen, duy trì và ổn định pH, loại bỏ hoàn toàn các kim loại nặng, dầu mỡ, chất hữu cơ, hợp chất Nitơ và các độc tố.</li><li>Bồn lọc than hoạt tính: Dạng hạt từ 4.76mm – 0.250mm, có tính hấp phụ. Hỗ trợ loại bỏ các chất hữu cơ, khử mùi, khử màu, hút các chất hóa học độc hại và tạp chất hòa tan trong nước.</li><li>Lõi lọc P5-10’’: Sợi cotton trắng với cấp lọc 5 micro, giúp loại bỏ các cặn lơ lửng có kích thước lớn hơn 5 micro trong nước, điển hình như một số rong rêu.</li><li>Lõi lọc P1-10’’: Sợi cotton trắng với cấp lọc 1 micro. Loại bỏ các cặn lơ lửng có kích thước lớn hơn 1 micro trong nước.</li><li>Lõi lọc than EP-10’’: Lõi than hoạt tính với cấp lọc 5 micro. Loại bỏ mùi clorine, mùi hôi, màu và các chất hữu cơ gây mùi vị bất thường.</li><li>Màng lọc UF: Màng sợi rỗng kích thước lỗ rỗng từ 0.01 – 0.1 micromet. Công dụng là lọc tách được các chất keo, chất rắn hòa tan trong nước. Khi nước qua màng UF, chất rắn lơ lửng, vi khuẩn và vi khuẩn và các vi rút được giữ lại.</li><li>Đèn UV VT1/2: Đèn UV Viqua có khả năng tiêu diệt mạnh mẽ các vi khuẩn tiếp xúc với nó, hỗ trợ diệt khuẩn và khử trùng cho nước thải, đảm bảo nước trong, sạch, vệ sinh và sử dụng được cho nước uống trực tiếp.</li></ul><p><br>&nbsp;<u>NTS&nbsp;</u>tự hào mang đến cho khách hàng giải pháp xử lý nước và&nbsp;hệ thống lọc tổng&nbsp;chất lượng nhất hiện nay. Nếu còn thắc mắc gì về hệ thống lọc tổng thì liên hệ ngay với&nbsp;NTS&nbsp;để được tư vấn chi tiết nhé!<br>Với công nghệ xử lý hiện đại được áp dụng vào thực tiễn, việc thiết kế và xây dựng một hệ thống lọc nước tổng hiệu quả nhưng lại có mức giá phải chăng là điều mà&nbsp;<u>NTS&nbsp;</u>Engineering luôn hướng đến. Đội ngũ nhân viên của chúng tôi với phong cách làm việc tận tâm, chuyên nghiệp và nghiêm túc chắc chắn sẽ làm khách hàng hài lòng.<br>Nếu cần hỗ trợ tư vấn chi tiết vui lòng liên hệ cho&nbsp;<u>NTS&nbsp;</u>theo Hotline<strong> 0888 167 247.</strong><br><br><br><br><br><br><br><br><br>&nbsp;</p>';

  const data_tin_tuc = [
    {
      url: "/images/tin-tuc/tin-tuc-1.jpg",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-2.jpg",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-3.jpg",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-1.jpg",
      title: "Meet AutoManage, the best AI management tools",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-2.jpg",
      title: "How to earn more money as a wellness coach",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
    {
      url: "/images/tin-tuc/tin-tuc-3.jpg",
      title: "The no-fuss guide to upselling and cross selling",
      description:
        "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    },
  ];
  return (
    <>
      <div className=" bg-gray-50 ">
        <div className="container mx-auto py-4 text-gray-500 text-base font-medium leading-normal">
          <Breadcrumb separator="/">
            <Breadcrumb.Item>
              <Link className="hover:bg-transparent !bg-transparent" href="/">
                Trang chủ
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                className="hover:bg-transparent !bg-transparent"
                href="/san-pham">
                Sản phẩm
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>
              <Link
                className="hover:bg-transparent !bg-transparent"
                href="/vat-lieu-moi-thiet-bi-plastic-nganh-nuoc">
                Vật liệu mới, thiết bị plastic ngành nước
              </Link>
            </Breadcrumb.Item>
            <Breadcrumb.Item>Hệ thống lọc tổng</Breadcrumb.Item>
          </Breadcrumb>
        </div>
      </div>
      <div className="container">
        <p className="text-center text-green-600 text-xl font-medium leading-normal mb-6">
          SẢN PHẨM
        </p>

        <div
          className="blog-content desktop:py-[40px] desktop:px-[120px] mobile:px-0 mobile:py-[20px]"
          dangerouslySetInnerHTML={{
            __html: data ? String(data) : "",
          }}
        />

        <ContactEnd />
      </div>
      <div className="bg-[#F3F6FE] py-[80px]">
        <div className="container">
          <div className="inline-flex justify-between items-center w-full py-2 pb-[40px]">
            <h2 className="text-black text-[32px] font-bold capitalize leading-[51.20px]">
              Tin Tức
            </h2>
            <Link
              href={"/"}
              className="text-center text-indigo-800 text-base font-medium leading-normal inline-flex gap-2.5">
              Tới trang tin tức <IconArrowRight width={20} height={20} />
            </Link>
          </div>
          <BoxTinTuc data={data_tin_tuc.slice(0, 3)} />
        </div>
      </div>
    </>
  );
};
export default DetailPage;
