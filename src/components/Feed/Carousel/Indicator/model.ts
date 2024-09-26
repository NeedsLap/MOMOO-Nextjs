export default interface IndicatorProps {
  imgUrlList: string[];
  currIndex: number;
  updateCurrIndex: (index: number) => void;
}
