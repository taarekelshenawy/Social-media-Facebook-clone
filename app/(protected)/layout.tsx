import Gaurd from "../../Components/Gaurd/Gaurd"
type childrenProps={
    children:React.ReactNode;
}
export default function Layout({children}:childrenProps) {
 
  return (
    <Gaurd>
      <div>{children}</div>
    </Gaurd>
  )
}
