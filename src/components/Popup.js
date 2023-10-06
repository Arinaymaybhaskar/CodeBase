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
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="bg-black bg-opacity-50 absolute inset-0"></div>
      <div
        ref={popupRef}
        className="bg-white p-8 rounded shadow-lg z-10 relative"
      >
        <button
          className="absolute top-2 right-2 bg-blue-500 text-white px-2 py-1 rounded"
          onClick={() => props.setTrigger(false)}
        >
          Close
        </button>
        <h2>Popup Content</h2>
        <p>This is the content of the popup.</p>
      </div>
    </div>
  ) : (
    ""
  );
};

export default Popup;
