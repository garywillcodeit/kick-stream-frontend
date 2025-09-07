import { useState } from "react";
import { createContext } from "react";

export const InteractionsContext = createContext(null);

export default function InteractionsContextProvider({ children }) {
  const [comment, setComment] = useState("");
  const [commentList, setCommentList] = useState([]);

  return (
    <InteractionsContext.Provider
      value={{
        comment,
        setComment,
        commentList,
        setCommentList,
      }}
    >
      {children}
    </InteractionsContext.Provider>
  );
}
