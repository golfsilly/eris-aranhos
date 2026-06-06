import * as React from "react";

// กำหนดช่วง Breakpoints ตามมาตรฐาน
const BREAKPOINTS = {
  mobile: 576,
  tablet: 1024, // ต่ำกว่า 1024 คือ Tablet, ตั้งแต่ 1024 ขึ้นไปคือ Desktop
};

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = React.useState<{
    isMobile: boolean;
    isTablet: boolean;
    isDesktop: boolean;
  }>({
    isMobile: false,
    isTablet: false,
    isDesktop: false
  });

  React.useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      
      setBreakpoint({
        isMobile: width < BREAKPOINTS.mobile,
        isTablet: width >= BREAKPOINTS.mobile && width < BREAKPOINTS.tablet,
        isDesktop: width >= BREAKPOINTS.tablet,
      });
    };

    // รันครั้งแรกตอน Mount component
    handleResize();

    // ดักจับการ Resize หน้าจอ
    window.addEventListener("resize", handleResize);
    
    // Cleanup event เมื่อ unmount
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return breakpoint;
}