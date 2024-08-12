import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

//  React to Print Custom Hook
export function usePrintComponent() {
  const componentRefPrint = useRef();

  // table-to-print
  const handlePrint = useReactToPrint({
    content: () => componentRefPrint.current,
  });

  return { componentRefPrint, handlePrint };
}

//  table to excel
export function useExcelPrint() {
  const excelPrintRef = useRef();
  return { excelPrintRef };
}
