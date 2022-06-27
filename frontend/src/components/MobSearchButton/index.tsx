import { HiOutlineSearchCircle } from "react-icons/hi";
import './style.css';
export function MobSearchButton() {
  return (
    <button className="mob-search-btn empty-btn">
      <HiOutlineSearchCircle size={40} color={"var(--g1)"} />
    </button>
  )
}