import SlideHome from "@/components/Slidehome/SlideHome";
import SliderKhachHang from "@/components/SlideKhachHang/SliderKhachHang";
import "../styles/pages/home.css";
import Image from "next/image";
import SlideMember from "@/components/SlideMember/SlideMember";
import Construction from "@/components/Construction/Construction";
import ContactEnd from "@/components/ContactEnd/ContactEnd";

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
            <div className="laptop:w-[1038px] z-40">
              <p className="text-[#111928] py-[24px] text-start laptop:text-center text-[20px] font-medium">
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
                <div className="col-span-12 laptop:col-span-4">
                  <div className="sp  overflow-hidden h-[437px]">
                    <div className="p-[32px] ">
                      <div className="bg-[#fff] w-[60px] h-[60px] rounded-[100px] flex justify-center items-center mx-0">
                        <Image
                          src="images/svg-home/water.svg"
                          alt="icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h4 className="pt-[16px] text-[24px] font-bold text-[#fff]">
                        Sản phẩm
                      </h4>
                      <p className="text-[16px] pt-[16px] text-[#fff] h-[182px] relative z-40">
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
                <div className="col-span-12 laptop:col-span-4">
                  <div className="dv  overflow-hidden h-[437px]">
                    <div className="p-[32px] ">
                      <div className="bg-[#fff] w-[60px] h-[60px] rounded-[100px] flex justify-center items-center mx-0">
                        <Image
                          src="images/svg-home/garden.svg"
                          alt="icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h4 className="pt-[16px] text-[24px] font-bold text-[#fff]">
                        Dịch vụ
                      </h4>
                      <p className="text-[16px] pt-[16px] text-[#fff] h-[182px] relative z-40">
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
                <div className="col-span-12 laptop:col-span-4">
                  <div className="du  overflow-hidden h-[437px]">
                    <div className="p-[32px] ">
                      <div className="bg-[#fff] w-[60px] h-[60px] rounded-[100px] flex justify-center items-center mx-0">
                        <Image
                          src="images/svg-home/quill.svg"
                          alt="icon"
                          width={32}
                          height={32}
                        />
                      </div>
                      <h4 className="pt-[16px] text-[24px] font-bold text-[#fff]">
                        Dự án cộng đồng
                      </h4>
                      <p className="text-[16px] pt-[16px] text-[#fff] h-[182px] relative z-40">
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
        <div className="h-[0px] laptop:h-[110px]"></div>
      </div>
      <div className="section-member py-[120px]">
        <div className="flex justify-center">
          <div className="container">
            <div className="grid grid-cols-12 gap-8 pt-[5%]">
              <div className="col-span-12 laptop:col-span-6 relative">
                <div className="h-[417px] w-[356px] card-member relative z-40">
                  <SlideMember />
                </div>

                <Image
                  className="absolute top-[0%] left-[-7%] z-10"
                  src="/images/home/Intersect.png"
                  alt=""
                  width={480}
                  height={100}
                />
              </div>
              <div className="col-span-12 laptop:col-span-6">
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
          <div className="laptop:w-[1038px]">
            <div className="text-center">
              <h3 className="text-[#28A645] text-[20px] font-bold">DỰ ÁN</h3>
              <h2 className="text-[#111928] text-[40px] font-bold py-[16px]">
                Công Trình Đã Thực Hiện
              </h2>
              <div className="flex justify-center">
                <p className="text-[#637381] text-[20px] laptop:w-[572px]">
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

            <ContactEnd />
          </div>
        </div>
      </div>
    </main>
  );
}
