import Link from "@components/ui/link";
import HomeIcon from "@assets/icons/home-icon";
import { useUI } from "@contexts/ui.context";
import dynamic from "next/dynamic";
import { Drawer } from "@components/common/drawer/drawer";
import ProductIcon from "@assets/icons/product-icon";
import GiftIcon from "@assets/icons/gift-icon";
import ProfilIcon from "@assets/icons/profile-icon";
import LocationIcon from "@assets/icons/location";

const MobileMenu = dynamic(() =>
  import("@components/layout/header/mobile-menu")
);

const MobileNavigation = () => {
  const { openSidebar, closeSidebar, displaySidebar } = useUI();
  const contentWrapperCSS = { left: 0 };

  function handleMobileMenu() {
    return openSidebar();
  }

  return (
    <>
      <div className=" bg-orange-50 lg:hidden fixed z-30 -bottom-0.5 flex items-center justify-between shadow-bottomNavigation w-full h-14 px-4 ">
        <Link
          href="/"
          className="inline-flex flex-col items-center justify-center"
        >
          <ProductIcon color="#FF7643" />
          <small className="text-slate-700 font-normal">Продукты</small>
        </Link>

        <Link
          href="/gifts"
          className="inline-flex flex-col items-center justify-center"
        >
          <GiftIcon color="#FF7643" />
          <small className="text-slate-700 font-normal">Дары</small>
        </Link>
        <Link
          href="/location"
          className="inline-flex flex-col items-center justify-center"
        >
          <LocationIcon color="#FF7643" />
          <small className="text-slate-700 font-normal">Расположение</small>
        </Link>

        <button
          aria-label="Menu"
          className="flex flex-col items-center justify-center flex-shrink-0 font-medium outline-none focus:outline-none"
          onClick={handleMobileMenu}
        >
          <ProfilIcon color="#FF7643" />
          <small className="text-slate-700 font-normal">Профиль</small>
        </button>
      </div>
      <Drawer
        placement="left"
        open={displaySidebar}
        onClose={closeSidebar}
        handler={false}
        showMask={true}
        level={null}
        contentWrapperStyle={contentWrapperCSS}
      >
        <MobileMenu />
      </Drawer>
    </>
  );
};

export default MobileNavigation;
