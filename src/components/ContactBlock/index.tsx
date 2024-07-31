import React from "react";
import IconPhone from "../../../public/images/logo/phone.png";
import IconZalo from "../../../public/images/logo/zalo.png";
import Link from "next/link";
import Image from "next/image";
import { apiService } from "@/services/api.service";
import { ENDPOINT } from "@/enums/endpoint.enum";

const searchData = {
  populate: [
    "phone",
    "address",
    "sanpham",
    "dichvu",
    "congty",
    "icon.urlIcon",
  ].toString(),
};
const searchParams = new URLSearchParams(searchData).toString();

async function fetchData(endpoint: string) {
  try {
    const data = await apiService.get(endpoint);
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
}

const ContactBlock = async () => {
  const dataFooter = await fetchData(`${ENDPOINT.GET_HOTLINE}?${searchParams}`);

  const phoneNumber = (dataFooter as { data: { attributes: { phone: any } } })
    ?.data?.attributes.phone;
  const zaloNumber = (dataFooter as { data: { attributes: { zalo: any } } })
    ?.data?.attributes.zalo;
  console.log("phoneNumber", phoneNumber);
  console.log("zaloNumber", zaloNumber);

  const removeSpaceOnPhoneNumber = (phoneNumber: String) => {
    // remove all space at phoneNumber string
    return phoneNumber.replace(/\s/g, "");
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-[24px]">
      <Link
        href={`tel:${removeSpaceOnPhoneNumber(phoneNumber)}`}
        target="_blank"
        className="relative call-btn"
      >
        <div className="wrapper h-[60px] w-[60px]">
          <div className="ring">
            <div className="coccoc-alo-phone coccoc-alo-green coccoc-alo-show">
              <div className="coccoc-alo-ph-circle"></div>
              <div className="coccoc-alo-ph-circle-fill"></div>
              <div className="coccoc-alo-ph-img-circle"></div>
            </div>
          </div>
        </div>
        <Image src={IconPhone} alt="call for calltact" />
      </Link>
      <Link
        target="_blank"
        href={`https://zalo.me/${removeSpaceOnPhoneNumber(zaloNumber)}`}
        className="h-[60px] w-[60px]"
      >
        <Image src={IconZalo} alt="call for calltact" objectFit="cover" />
      </Link>
    </div>
  );
};

export default ContactBlock;
