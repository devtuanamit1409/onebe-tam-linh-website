import Link from "next/link";
import IconAngleRight from "../icons/IconAngleRight";
import Image from "next/image";
import { useState } from "react";
interface ListMemberProps {
  id: number;
  title: string;
  description: string;
  path: string;
  logo: {
    data: {
      attributes: {
        width: number;
        height: number;
        url: string;
      };
    };
  };
}
interface listMember {
  listMember: ListMemberProps[];
}

const ListMember = (listMember: listMember) => {
 

  const baseUrl = process.env.URL_API;
  let numberItem = 6;

  // const [visibleItem, setVisibleItem] = useState(numberItem);
  // const handleLoadMore = () => {
  //   setVisibleItem(numberItem + visibleItem);
  // };
  return (
    <div className="pb-[80px]">
      <div className="container">
        <div className="grid grid-cols-12 desktop:gap-[50px] tablet:gap-[32px]">
          {listMember?.listMember
            // .slice(0, visibleItem)
            .map((item) => {
              return (
                <div
                  key={item.id}
                  className="col-span-12 tablet:col-span-6 desktop:col-span-4 pb-[32px] desktop:pb-[0px]">
                  <div className="border border-[#DFE4EA]">
                    <div className="px-[24px] pb-[24px] pt-[100px]">
                      <div className="flex flex-col gap-[24px]">
                        <div className="flex justify-center">
                          <div className="max-w-[190x] max-h-[103px]">
                            <div className="max-w-[190x] max-h-[103px] overflow-hidden">
                              <Image
                                src={`${baseUrl}${item.logo.data.attributes.url}`}
                                alt="logo"
                                width={item.logo.data.attributes.width}
                                height={item.logo.data.attributes.height}
                                layout="responsive"
                              />
                            </div>
                          </div>
                        </div>
                        <h2 className="text-center font-semibold text-[28px]">
                          {item.title}
                        </h2>
                        <p className="text-[#6B7280] text-[18px]">
                          {item.description}
                        </p>
                        <div className="py-[24px] flex justify-center">
                          <button className="py-[16px] flex  items-center text-[16px] text-[#28A645] px-[24px] bg-[#FFFFFF] btn-truy-cap-web">
                            <Link href={item.path} className="mr-[8px]">
                              Truy cập website
                            </Link>
                            <IconAngleRight />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>

        <div className="flex justify-center pt-[40px]">
          <button
            // onClick={handleLoadMore}
            className="py-[12px] px-[24px] bg-[#28A645] text-[white] rounded-[50px] border border-[#28A645] hover:bg-[#fff] hover:text-[#28A645] ">
            Xem thêm
          </button>
        </div>
      </div>
    </div>
  );
};
export default ListMember;
