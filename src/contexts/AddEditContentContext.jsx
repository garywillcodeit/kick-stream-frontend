import { createContext, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

export const AddEditContentContext = createContext();

const contentDataInit = {
  file: null,
  videoUrl: null,
  title: "",
  categories: [],
};

export default function AddEditContentContextProvider({ children }) {
  const pathname = useLocation();

  const [step, setStep] = useState(1);
  const [progressBar, setProgressBar] = useState(0);
  const [duration, setDuration] = useState(0);
  const [contentData, setContentData] = useState(contentDataInit);
  const resetContentData = () => setContentData(contentDataInit);
  const videoRef = useRef(null);
  const scrollRef = useRef(null);
  return (
    <AddEditContentContext.Provider
      value={{
        videoRef,
        scrollRef,
        step,
        setStep,
        progressBar,
        setProgressBar,
        duration,
        setDuration,
        contentData,
        setContentData,
        resetContentData,
      }}
    >
      {children}
    </AddEditContentContext.Provider>
  );
}
