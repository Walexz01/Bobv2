import Dashtable from "./Dashtable";
const Homeright = () => {
  const body: string[] = ["sddd", "ddddd", "", "dd"];
  return (
    <>
      <Dashtable
        isDetail={true}
        heading="Walexz"
        tHead={["id", "name", "Total Order", ""]}
        tbody={body}
        path="/"
      />
    </>
  );
};

export default Homeright;
