import SlideHome from "@/components/Slidehome/SlideHome";
import SliderKhachHang from "@/components/SlideKhachHang/SliderKhachHang";
import "../styles/pages/home.css";
import Image from "next/image";
import SlideMember from "@/components/SlideMember/SlideMember";
import Construction from "@/components/Construction/Construction";

export default function Home() {
  return (
    <main>
      <SlideHome />
      <div className="flex justify-center  ">
        <div className="container">
          <div className="py-[72px] ">
            <SliderKhachHang />
          </div>
        </div>
      </div>
      <div className="section-gioi-thieu ">
        <div className="py-[72px]">
          <h2 className="text-center pb-[24px] text-[48px] text-[#3B559E] font-bold">
            Giới Thiệu Về Chúng Tôi
          </h2>
          <div className="flex justify-center">
            <div className="md:w-[1038px] z-50">
              <p className="text-[#111928] py-[24px] text-start md:text-center text-[20px] font-medium">
                Thành lập từ năm 2013, Công ty TNHH Kỹ thuật NTS định hướng trở
                thành nhà cung cấp hàng đầu cho các giải pháp kỹ thuật công
                trình. Theo đó những lĩnh vực chính mà NTS theo đuổi một cách
                tâm huyết ngay từ những ngày đầu là: Tư vấn cơ điện, Xử lý nước,
                Tái sử dụng nước; Cung cấp thiết bị sân vườn, thiết bị tưới cây;
                Thiết bị thu hồi nước mưa và các tiện ích khác…
              </p>
              <div className="flex justify-center z-100">
                <button className="bg-[#3B559E] text-[#fff] py-[12px] px-[24px] rounded-[50px] border border-[#3B559E] hover:bg-[#fff] hover:text-[#3B559E]">
                  Về chúng tôi
                </button>
              </div>
              <div className="grid grid-cols-12 gap-[24px] pt-[32px]">
                <div className="col-span-12 md:col-span-4">
                  <div className="sp  overflow-hidden h-[437px]">
                    <div className="p-[32px] ">
                      <div className="bg-[#fff] w-[60px] h-[60px] rounded-[100px] flex justify-center items-center mx-0">
                        <Image
                          src="/svg-home/water.svg"
                          alt="icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h4 className="pt-[16px] text-[24px] font-bold text-[#fff]">
                        Sản phẩm
                      </h4>
                      <p className="text-[16px] pt-[16px] text-[#fff] h-[182px] relative z-50">
                        NTS Engineering với đội ngũ chuyên gia luôn tìm tòi các
                        sản phẩm plastic nhằm nâng cao hiệu quả công nghệ xử lý
                        nước thải, xử lý nước cấp.
                      </p>
                      <div className="pt-[16px]">
                        <button className="btn-more py-[12px] px-[24px] text-[#28A645]  bg-[#fff] rounded-[50px] border border-[#fff]  hover:bg-[#E8FBF6] hover:border-[#28A645] ">
                          Xem thêm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="dv  overflow-hidden h-[437px]">
                    <div className="p-[32px] ">
                      <div className="bg-[#fff] w-[60px] h-[60px] rounded-[100px] flex justify-center items-center mx-0">
                        <Image
                          src="/svg-home/garden.svg"
                          alt="icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h4 className="pt-[16px] text-[24px] font-bold text-[#fff]">
                        Dịch vụ
                      </h4>
                      <p className="text-[16px] pt-[16px] text-[#fff] h-[182px] relative z-50">
                        NTS Engineering với với đội ngũ chuyên gia luôn tìm tòi
                        các sản phẩm plastic nhằm nâng cao hiệu quả công nghệ xử
                        lý nước thải, xử lý nước cấp.
                      </p>
                      <div className="pt-[16px]">
                        <button className="btn-more py-[12px] px-[24px] text-[#28A645]  bg-[#fff] rounded-[50px] border border-[#fff]  hover:bg-[#E8FBF6] hover:border-[#28A645]">
                          Xem thêm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-span-12 md:col-span-4">
                  <div className="du  overflow-hidden h-[437px]">
                    <div className="p-[32px] ">
                      <div className="bg-[#fff] w-[60px] h-[60px] rounded-[100px] flex justify-center items-center mx-0">
                        <Image
                          src="/svg-home/quill.svg"
                          alt="icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h4 className="pt-[16px] text-[24px] font-bold text-[#fff]">
                        Dự án cộng đồng
                      </h4>
                      <p className="text-[16px] pt-[16px] text-[#fff] h-[182px] relative z-50">
                        Mang nước sạch cho cộng đồng được xem là nghĩa vụ và
                        trách nhiệm của chúng tôi khi hoạt động trong lĩnh vực
                        nước. Đây là cơ hội để chúng tôi được chia sẻ với những
                        vùng đất, con người khó khăn.
                      </p>
                      <div className="pt-[16px]">
                        <button className="btn-more py-[12px] px-[24px] text-[#28A645]  bg-[#fff] rounded-[50px] border border-[#fff]  hover:bg-[#E8FBF6] hover:border-[#28A645]">
                          Xem thêm
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="h-[0px] md:h-[110px]"></div>
      </div>
      <div className="section-member py-[120px]">
        <div className="flex justify-center">
          <div className="container">
            <div className="grid grid-cols-12 gap-8 pt-[5%]">
              <div className="col-span-12 md:col-span-6 relative">
                <div className="h-[417px] w-[356px] card-member relative z-50">
                  <SlideMember />
                </div>

                <Image
                  className="absolute top-[0%] left-[-7%] z-10"
                  src="/home/Intersect.png"
                  alt=""
                  width={480}
                  height={100}
                />
              </div>
              <div className="col-span-12 md:col-span-6">
                <div className="flex justify-end">
                  <div>
                    <h2 className="font-bold text-[48px]">
                      Các Công Ty Thành Viên
                    </h2>
                    <p className="pt-[24px] text-[18px] max-w-[572px] font-medium text-end">
                      Thành lập từ năm 2013, Công ty TNHH Kỹ thuật NTS định
                      hướng trở thành nhà cung cấp hàng đầu cho các giải pháp kỹ
                      thuật công trình. Tất cả đều hướng đến trọng tâm là phục
                      vụ tiện ích cho cuộc sống một cách bền vững và lâu dài.
                    </p>
                    <div className="pt-[24px] flex justify-end">
                      <button className="py-[12px] px-[24px] bg-[#28A645] text-[white] rounded-[50px] border border-[#28A645] hover:bg-[#fff] hover:text-[#28A645] ">
                        Xem thêm
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pt-[120px]">
        <div className="flex justify-center">
          <div className="md:w-[1038px]">
            <div className="text-center">
              <h3 className="text-[#28A645] text-[20px] font-bold">DỰ ÁN</h3>
              <h2 className="text-[#111928] text-[40px] font-bold py-[16px]">
                Công Trình Đã Thực Hiện
              </h2>
              <div className="flex justify-center">
                <p className="text-[#637381] text-[20px] md:w-[572px]">
                  This is a short description about this content.This is a short
                  description about this content.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <div className="container">
            <div className="pt-[40px]">
              <Construction />
            </div>
            <div className="py-[80px]">
              <div className="w-full h-[256px] flex items-center px-[78px]  justify-between section-contact">
                <div>
                  <p className="font-medium  text-[#fff]">
                    Khởi đầu dự án của bạn ngay thôi
                  </p>
                  <h2 className="pt-[15px] font-bold text-[40px] text-[#ffff]">
                    Liên hệ với chúng tôi
                  </h2>
                </div>
                <div>
                  <button className="flex items-center bg-[#28A645] rounded-[32px] py-[12px] px-[24px]">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="19"
                      viewBox="0 0 20 19"
                      fill="none"
                    >
                      <path
                        d="M15.1871 18.7232C12.6558 18.7232 9.06208 16.9107 5.74958 13.7857C1.24958 9.47317 -0.656665 4.66067 1.34333 2.53567C1.43708 2.44192 1.56208 2.34817 1.68708 2.28567L4.21833 0.848169C4.87458 0.473169 5.68708 0.660669 6.12458 1.28567L7.96833 3.91067C8.18708 4.22317 8.28083 4.59817 8.18708 4.97317C8.12458 5.31692 7.90583 5.62942 7.59333 5.84817L6.49958 6.56692C7.34333 7.78567 9.62458 10.8169 13.2496 12.9732C13.2808 13.0044 13.3121 12.9732 13.3121 12.9732L14.0933 11.9107C14.5308 11.3169 15.3746 11.1607 16.0308 11.5669L18.7808 13.3169C19.4371 13.7232 19.6246 14.5669 19.2183 15.2232L17.7183 17.6294C17.6246 17.7544 17.5308 17.8794 17.4371 17.9732C16.8746 18.4732 16.0933 18.7232 15.1871 18.7232ZM4.93708 2.06692C4.90583 2.06692 4.93708 2.06692 4.93708 2.06692L2.37458 3.50442C1.18708 4.78567 2.65583 8.87942 6.74958 12.7544C10.9058 16.6919 15.1871 18.0982 16.5621 16.9107L18.0621 14.5044L15.3121 12.7544C15.2808 12.7544 15.2496 12.7544 15.2496 12.7544L14.4683 13.8169C14.0308 14.4107 13.1871 14.5669 12.5621 14.1919C8.65583 11.8482 6.21833 8.59817 5.34333 7.31692C5.12458 7.00442 5.06208 6.62942 5.12458 6.28567C5.18708 5.91067 5.40583 5.59817 5.71833 5.41067L6.81208 4.69192L4.99958 2.09817C4.96833 2.09817 4.93708 2.06692 4.93708 2.06692Z"
                        fill="white"
                      />
                    </svg>
                    <span className="mx-[10px] text-[#fff]">
                      Gọi ngay 0888 167 247
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
