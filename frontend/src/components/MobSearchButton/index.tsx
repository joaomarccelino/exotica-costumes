import { HiOutlineSearchCircle } from "react-icons/hi";
import './style.css';

type MobSearchButtonProps = {
  handleShowSearchInput(): void;
}

export function MobSearchButton({handleShowSearchInput}: MobSearchButtonProps) {
  return (
    <button
     className="mob-search-btn empty-btn"
     onClick={handleShowSearchInput}
     >
      <HiOutlineSearchCircle size={40} color={"var(--g1)"} />
    </button>
  )
}