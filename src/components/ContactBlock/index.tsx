import React from "react";
import IconPhone from "../../../public/images/logo/phone.png";
import IconZalo from "../../../public/images/logo/zalo.png";
import Link from "next/link";
import Image from "next/image";

export default function ContactBlock() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-[24px]">
      {/* <Link
        href={`tel:0983123599`}
        className="bg-white rounded-full p-4 h-[60px] w-[60px] relative call-btn">
        <Image src={IconPhone} alt="call for calltact" />
      </Link> */}
      <Link
        href={`tel:0983123599`}
        className="relative call-btn"
        // className="bg-white rounded-full p-4 h-[60px] w-[60px] relative call-btn"
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
        href={`https://zalo.me/0983123599`}
        className="h-[60px] w-[60px]">
        <Image src={IconZalo} alt="call for calltact" objectFit="cover" />
      </Link>
    </div>
  );
}
