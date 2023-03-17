import { useRef, useEffect, useState, useCallback } from "react";

const useChartWidthHook = () => {
  const blockRef = useRef<HTMLDivElement>(null);
  const [blockWidth, setBlockWidth] = useState<number>(0);
  const setChartWidth = useCallback(() => {
    const sectionWidth = blockRef.current?.getBoundingClientRect().width!;
    setBlockWidth(sectionWidth);
  }, []);
  useEffect(() => {
    setChartWidth();
    window.addEventListener("resize", setChartWidth);
    return () => window.removeEventListener("resize", setChartWidth);
  }, [setChartWidth]);
  return { blockWidth, blockRef, setChartWidth };
};

export default useChartWidthHook;
