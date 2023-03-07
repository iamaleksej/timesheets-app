import { useEffect, useState } from "react";

export const useDebounce = (value, delay) => {
   const [debounceValue, setDebounceValue] = useState(value);

   useEffect(() => {
      const timer = setTimeout(() => {
         setDebounceValue(value);
      }, delay);
      return () => {
         clearInterval(timer);
      };
   }, [value]);

   return debounceValue;
};