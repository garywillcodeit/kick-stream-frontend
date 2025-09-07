import React, { createContext, useState } from "react";

export const ScrollContentContext = createContext();

export default function ScrollContentContextProvider({ children }) {
  const [activeContent, setActiveContent] = useState({});
  const [contentList, setContentList] = useState([]);

  return (
    <ScrollContentContext.Provider
      value={{
        activeContent,
        setActiveContent,
        contentList,
        setContentList,
      }}
    >
      {children}
    </ScrollContentContext.Provider>
  );
}
