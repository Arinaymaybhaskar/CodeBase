import { classnames } from "../utils/general";

const CustomInput = ({ customInput, setCustomInput }) => {
  return (
    <>
      {" "}
      <textarea
        rows="5"
        value={customInput}
        onChange={(e) => setCustomInput(e.target.value)}
        placeholder={`Custom Input`}
        className={classnames(
          "focus:outline-none w-full border-2 border-black placeholder:text-4xl px-2 rounded-md bg-white mt-2"
        )}
        style={{
          background: `repeating-linear-gradient(
            to bottom,
            #F9FAFB,
            #F9FAFB 1.5em,
            #F3F4F6 1.5em,
            #F3F4F6 3em
          )`,
        }}
      ></textarea>
    </>
  );
};

export default CustomInput;
