
  
  export function setLocalStorage(key, value) {
    const data = JSON.stringify(value);
    if (typeof window !== "undefined") {
      return window?.localStorage?.setItem(key, data);
    } else {
      return {key, value};
    }
  }
  export function getLocalStorage(key) {
    if (typeof window !== "undefined") {
      const data = localStorage.getItem(key);
      return data === "undefined" ? null : JSON.parse(data);
    }
  }
  