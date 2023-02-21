import React, { createContext, ReactNode, useContext, useReducer } from "react";
import { chatPartner } from "../types/chat-partner";
import { useUser } from "./user-context";

type State = {
  chatId: string | undefined;
  // partnerId: string | undefined;
  user: any
}

type Action = { 
  type: "CHANGE_CHAT_PARTNER",
  payload: any,
};

type ContextType = {
  state: State | undefined;
  dispatch: React.Dispatch<Action> | undefined;
}

const ChatContext = createContext<ContextType>({
  state: undefined,
  dispatch: undefined
});

export const ChatProvider = ({children}: {children: ReactNode}) => {
  const { currentUser } = useUser();
  const initialState = {
    chatId: undefined,
    user: {},
  }

  const chatReducer = (state: State, action: Action) => {
    switch(action.type){
      case "CHANGE_CHAT_PARTNER":
        return {
          chatId: currentUser.uid > action.payload.partnerId ? currentUser.uid + action.payload.partnerId : action.payload.partnerId + currentUser.uid,
          user: action.payload,
        };
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(chatReducer, initialState)

  return (
    <ChatContext.Provider value={{state: state, dispatch }}>
      {children}
    </ChatContext.Provider>
  );
}

export const useChat = () => useContext(ChatContext)

// export const ChatContenxt = createContext({

// });

// export const ChatContextProvider = ({children}: {children: ReactNode}) => {
//   const {currentUser} = useUser()
//   const INITIAL_STATE = {
//     chatId: "null",
//     user: {},
//   }
//   console.log("chat context current user :", currentUser);

//   const chatReducer = (state: any, action: any) => {
//     switch(action.type){
//       case "CHANGE_USER":
//         return {
//           user: action.payload,
//           chatId: currentUser.uid > action.payload.uid ? currentUser.uid + action.payload.uid : action.payload.uid + currentUser.uid,
//         }
//       default:
//         return state
//     }
//   }

//   const [state, dispatch] = useReducer(chatReducer, INITIAL_STATE);

//   return (
//     <ChatContenxt.Provider value={{ data: state, dispatch }}>
//       {children}
//     </ChatContenxt.Provider>
//   );

// };
