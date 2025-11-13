"use client";

import { createContext, useEffect, useState } from "react";

interface DataContextType {
  data: any; 
}

export const DataContext = createContext<DataContextType | null>(null);

interface DataContextProviderProps {
  data: any; 
  children: React.ReactNode;
}

export function DataContextProvider({ data, children }: DataContextProviderProps) {
  const [dataState, setDataState] = useState(() => {
    if (data && !Array.isArray(data)) return data;
    return null;
  });

  useEffect(() => {
    setDataState(data);
  }, [data]);

  return (
    <DataContext.Provider value={{ data: dataState }}>
      {children}
    </DataContext.Provider>
  );
}