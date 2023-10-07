import React, { useRef, useEffect } from "react";

const Popup = (props) => {
  const popupRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        props.setTrigger(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [props]);

  return props.trigger ? (
    <div className="fixed inset-0 flex items-center justify-center z-50 ">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div
        ref={popupRef}
        className="bg-white p-8 rounded shadow-lg z-10 relative max-w-6xl max-h-[70vh] overflow-scroll"
      >
        <button
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
