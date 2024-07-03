import Link from "next/link"
import style from "./index.module.css"
import { IoHomeOutline } from "react-icons/io5"

export default function HomeReturn() {
  return (
    <div className={style.divHeader}>
      <Link className={style.link} href="/">
        <IoHomeOutline size={25} />
      </Link>
    </div>
  )
}
