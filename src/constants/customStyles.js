export const customStyles = {
  control: (styles) => ({
    ...styles,
    width: "100%",
    maxWidth: "20rem",
    minWidth: "6rem",
    borderRadius: "5px",
    color: "#000",
    fontSize: "0.6rem",
    lineHeight: "1.75rem",
    backgroundColor: "#FFFFFF",
    cursor: "pointer",
    border: "1px solid #000000",
  }),
  option: (styles) => {
    return {
      ...styles,
      color: "#000",
      fontSize: "0.6rem",
      lineHeight: "1.75rem",
      width: "100%",
      background: "#fff",
      ":hover": {
        backgroundColor: "rgb(243 244 246)",
        color: "#000",
        cursor: "pointer",
      },
    };
  },
  menu: (styles) => {
    return {
      ...styles,
      backgroundColor: "#fff",
      maxWidth: "14rem",
      border: "2px solid #000000",
      borderRadius: "5px",
    };
  },

  placeholder: (defaultStyles) => {
    return {
      ...defaultStyles,
      color: "#000",
      fontSize: "0.6rem",
      lineHeight: "1.75rem",
    };
  },
};
