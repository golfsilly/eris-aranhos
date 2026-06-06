import Image from "next/image";

const url =
  "https://github.com/KongNontawatDev/Black-Mourning-Ribbon/tree/main";

export function MourningRibbonTopRibbonLeft() {
  return (
    <div className="fixed top-0 left-0 w-32 opacity-90 z-9999 pointer-events-none">
      <Image
        src="/images/mourningribbon/ribbon_top_left.png"
        alt="Black mourning ribbon"
        width={100}
        height={100}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority={true}
        unoptimized={false}
      />
    </div>
  );
}

export function MourningRibbonTopRibbonRight() {
  return (
    <div className="fixed top-0 right-0 w-32 opacity-90 z-9999 pointer-events-none">
      <Image
        src="/images/mourningribbon/ribbon_top_right.png"
        alt="Black mourning ribbon, top right"
        width={80}
        height={80}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority={true}
        unoptimized={false}
      />
    </div>
  );
}

export function MourningRibbonBottomLeft() {
  return (
    <div className="fixed bottom-0 left-0 w-32 opacity-90 z-9999 pointer-events-none">
      <Image
        src="/images/mourningribbon/ribbon_bottom_left.png"
        alt="Black mourning ribbon, bottom left"
        width={80}
        height={80}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority={true}
        unoptimized={false}
      />
    </div>
  );
}

export function MourningRibbonBottomRight() {
  return (
    <div className="fixed bottom-0 right-0 w-32 opacity-90 z-9999 pointer-events-none">
      <Image
        src="/images/mourningribbon/ribbon_bottom_right.png"
        alt="Black mourning ribbon, bottom right"
        width={80}
        height={80}
        style={{ width: "100%", height: "auto", display: "block" }}
        priority={true}
        unoptimized={false}
      />
    </div>
  );
}
