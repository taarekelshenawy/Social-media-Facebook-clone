
import Homepage from "./(protected)/Homepage/page";
import Gaurd from "../Components/Gaurd/Gaurd"


export default function Home() {
  return (
    <>
      <Gaurd>
        <Homepage/>
      </Gaurd>
    </>
  );
}
