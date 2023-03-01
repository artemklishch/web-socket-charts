import { useRef, useEffect, useState } from "react";

const useChartWidthHook = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [blockWidth, setBlockWidth] = useState<number>(0);
  const setChartWidth = () => {
    const sectionWidth = blockRef.current?.getBoundingClientRect().width!;
    setBlockWidth(sectionWidth);
  };
  useEffect(() => {
    setChartWidth();
    window.addEventListener("resize", setChartWidth);
    return () => window.removeEventListener("resize", setChartWidth);
  }, []);
  return { blockWidth, blockRef };
};

export default useChartWidthHook;
