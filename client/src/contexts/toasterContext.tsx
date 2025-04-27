import {
  createContext,
  useContext,
  useMemo,
  useState
} from "react";

interface ToastProps {
  children: React.ReactNode;
}

export type ToastContextProps = {
  toast: {
    message: string;  
  };
  setToast: React.Dispatch<
    React.SetStateAction<{
      message: string;
    }>
  >;
};

const initialState: ToastContextProps = {
  toast: {
    message: "",
  },
  setToast: () => {}
};
export const ToasterContext = createContext<ToastContextProps>(initialState);
export const ToasterProvider = ({ children }: ToastProps) => {
  const [toast, setToast] = useState({ message: "" });

  const value = useMemo(() => {
    return {
      toast,
      setToast,
    };
  }, [toast]);
  return (
    <ToasterContext.Provider value={value}>{children}</ToasterContext.Provider>
  );
};

export const useToasterContext = () => useContext(ToasterContext);
