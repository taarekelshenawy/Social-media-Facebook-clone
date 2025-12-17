import { DotLoader} from "react-spinners"

export default function loading() {
  return (
    <div className="flex justify-center items-center h-screen ">
        <DotLoader size={80}  color="#1D4ED8" />
    </div>
  )
}
