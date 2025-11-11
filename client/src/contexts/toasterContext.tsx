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
    type?: "info" | "warning" | "success" | "error";
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
    type: "info",
  },
  setToast: () => {},
};

export const ToasterContext = createContext<ToastContextProps>(initialState);
export const ToasterProvider = ({ children }: ToastProps) => {
  
  const [toast, setToast] = useState<{ message: string; type?: "info" | "warning" | "success" | "error" }>({ message: "", type: "info" });

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
