interface pogressType {
  pogress: number;
  color: string;
}

const PogressBar: React.FC<pogressType> = ({ pogress, color }) => {
  return (
    <div className=" w-[50%]  rounded-full ">
      <div
        className={`   rounded-full py-1 flex justify-center items-center font-bold text2xl`}
        style={{ backgroundColor: color, width: `${pogress}%` }}
      >
        {`${pogress}%`}
      </div>
    </div>
  );
};
export default PogressBar;
