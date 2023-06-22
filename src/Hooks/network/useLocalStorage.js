import { useEffect, useState } from "react";

function useLocalStorage(key) {
  let localStorageItem;
  if (key) {
    localStorageItem = localStorage[key];
  }
  const [localState, setLocalState] = useState(localStorageItem);

  function syncLocalStorage(event) {
    if (event.key === key) {
      setLocalState(event.key);
    }
  }

  useEffect(() => {
    window.addEventListener("storage", syncLocalStorage);
    return () => {
      window.removeEventListener("storage", syncLocalStorage);
    };
  }, []);

  return localState;
}
export default useLocalStorage;
