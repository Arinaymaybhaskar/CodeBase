import React, { useEffect, useState } from "react";
import {
  ToastContainer,
  toast
} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CodeEditorWindow from "../components/CodeEditorWindow";
import axios from "axios";
import { classnames } from "../utils/general";
import { languageOptions } from "../constants/languageOptions";
import { defineTheme } from "../lib/defineTheme";
import useKeyPress from "../hooks/useKeyPress";
import OutputWindow from "../components/OutputWindow";
import CustomInput from "../components/CustomInput";
import OutputDetails from "../components/OutputDetails";
import ThemeDropdown from "../components/ThemeDropdown";
import LanguagesDropdown from "../components/LanguagesDropdown";
import { defaultCode } from "../constants/LanguageDefaultCode";

const Landing = () => {
  const [customInput, setCustomInput] = useState("");
  const [outputDetails, setOutputDetails] = useState(null);
  const [processing, setProcessing] = useState(null);
  const [clear, setClear] = useState(false);
  const compilerCodeKey = "compilerCodeKey";
  const compilerLanguageKey = "compilerLanguageKey";
  const compilerThemeKey = "compilerThemeKey";
  
  const [code, setCode] = useState(
    localStorage.getItem(compilerCodeKey) || null
  );
  const [theme, setTheme] = useState(
    localStorage.getItem(compilerThemeKey) || "cobalt"
  );
  const [language, setLanguage] = useState(
    localStorage.getItem(compilerLanguageKey) || languageOptions[0]
  );

  const enterPress = useKeyPress("Enter");
  const ctrlPress = useKeyPress("Control");

  const handleClear = () => {
    setCode("");
    setClear(true);
    setCustomInput("");
    setTimeout(() => {
      setClear(false);
    }, 100);
  };

  const onSelectChange = (selectedOption) => {
    setLanguage(selectedOption);
    setCode(defaultCode[selectedOption.value] || "");
  };

  useEffect(() => {
    if (enterPress && ctrlPress) {
      handleCompile();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ctrlPress, enterPress]);

  useEffect(() => {
    if (code) {
      localStorage.setItem(compilerCodeKey, code);
    }
  }, [code]);

  const onChange = (action, data) => {
    switch (action) {
      case "code": {
        setCode(data);
        break;
      }
      default: {
        console.warn("Case not handled!", action, data);
      }
    }
  };

  const handleCompile = () => {
    setProcessing(true);
    const formData = {
      language_id: language.id,
      source_code: btoa(code),
      stdin: btoa(customInput),
    };
    const options = {
      method: "POST",
      url: process.env.REACT_APP_RAPID_API_URL,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "content-type": "application/json",
        "Content-Type": "application/json",
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
      data: formData,
    };

    axios
      .request(options)
      .then(function (response) {
        const token = response.data.token;
        checkStatus(token);
      })
      .catch((err) => {
        let error = err.response ? err.response.data : err;
        let status = err.response.status;
        if (status === 429) {
          showErrorToast(
            `Quota of 100 requests exceeded for the Day!`,
            10000
          );
        }
        console.log(error)
        setProcessing(false);
      });
  };

  const checkStatus = async (token) => {
    const options = {
      method: "GET",
      url: process.env.REACT_APP_RAPID_API_URL + "/" + token,
      params: { base64_encoded: "true", fields: "*" },
      headers: {
        "X-RapidAPI-Host": process.env.REACT_APP_RAPID_API_HOST,
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    try {
      let response = await axios.request(options);
      let statusId = response.data.status?.id;

      if (statusId === 1 || statusId === 2) {
        setTimeout(() => {
          checkStatus(token);
        }, 2000);
        return;
      } else {
        setProcessing(false);
        setOutputDetails(response.data);
        showSuccessToast(`Compiled Successfully!`);
        return;
      }
    } catch (err) {
      setProcessing(false);
      showErrorToast();
    }
  };

  const handleThemeChange = (selectedTheme) => {
    const theme = selectedTheme;

    if (["light", "vs-dark"].includes(theme.value)) {
      setTheme(theme);
      localStorage.setItem(compilerThemeKey, theme.value);
    } else {
      defineTheme(theme.value).then((_) => {
        setTheme(theme);
        localStorage.setItem(compilerThemeKey, theme.value);
      });
    }
  };

  useEffect(() => {
    const storedTheme = localStorage.getItem(compilerThemeKey);
    defineTheme(storedTheme || "oceanic-next").then((_) =>
      setTheme({ value: storedTheme || "oceanic-next", label: "Oceanic Next" })
    );
  }, []);

  const showSuccessToast = (msg) => {
    toast.success(msg || `Compiled Successfully!`, {
      position: "top-right",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  const showErrorToast = (msg, timer) => {
    toast.error(msg || `Something went wrong! Please try again.`, {
      position: "top-right",
      autoClose: timer ? timer : 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="flex flex-row w-full">
        <div className="px-4 py-2">
          <LanguagesDropdown onSelectChange={onSelectChange} />
        </div>
        <div className="px-4 py-2">
          <ThemeDropdown handleThemeChange={handleThemeChange} theme={theme} />
        </div>
        <div className="px-4 py-2">
          <button
            onClick={handleClear}
            className="py-[10px] flex px-4 border-2 border-black rounded-[5px]"
          >
            Clear
          </button>
        </div>
      </div>
      <div className="flex flex-row space-x-4 items-start px-4 py-4 w-full">
        <div className="flex flex-col w-full h-full justify-start items-end">
          <CodeEditorWindow
            code={code}
            onChange={onChange}
            language={language?.value}
            theme={theme.value}
            clearCode={clear}
          />
        </div>

        <div className="right-container flex flex-shrink-0 w-[30%] flex-col">
          <OutputWindow outputDetails={outputDetails} />
          <div className="flex flex-col items-end">
            <CustomInput
              customInput={customInput}
              setCustomInput={setCustomInput}
            />
            <button
              onClick={handleCompile}
              className={classnames(
                "mt-4 p-2 border-2 border-black rounded-[5px]",
              )}
            >
              {processing ? "Processing..." : "Compile and Execute"}
            </button>
          </div>
          {outputDetails && (
            <div>
              <OutputDetails outputDetails={outputDetails} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Landing;
