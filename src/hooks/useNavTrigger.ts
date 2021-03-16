import { useState, useEffect } from "react";

export function useNavTrigger({ prevLoadingProp, loadingProp, errorProp, route, props }: any) {
  const [shouldNavigate, setShouldNavigate] = useState<any>({
    shouldNavigate: false,
  });

  useEffect(() => {
    if (prevLoadingProp && !loadingProp && !errorProp) {
      setShouldNavigate(true);
    }
  }, [loadingProp, errorProp]);
  return shouldNavigate;
}
