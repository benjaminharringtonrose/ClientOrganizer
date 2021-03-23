import React, { useEffect, useRef } from "react";
import { IStringMap } from "../screens/RegisterScreen";

// Hook
export function usePrevious(props?: IStringMap<any>) {
  // The ref object is a generic container whose current property is mutable ...
  // ... and can hold any value, similar to an instance property on a class
  const ref = useRef<any>();
  // Store current value in ref
  useEffect(() => {
    ref.current = props;
  }, [props]); // Only re-run if value changes

  // Return previous value (happens before update in useEffect above)
  return ref.current;
}
