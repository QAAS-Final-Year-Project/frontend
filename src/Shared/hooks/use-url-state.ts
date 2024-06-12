import { useSearchParams } from "react-router-dom";

/**
 * A custom React hook that reads and sets the value of a URL search parameter.
 *
 * @param param - The name of the search parameter to read/set.
 * @param initialValue - The initial value of the parameter if it's not present in the URL.
 * @returns An array with the current value of the parameter and a function to update it.
 */
function useUrlState<T extends string | number | boolean>(
  param: string,
  initialValue?: T
): [T, (newValue: T | undefined) => void] {
  const [searchParams, setSearchParams] = useSearchParams();

  // Read the initial value from the URL search parameter
  const initialParam = searchParams.get(param);
  const value = initialParam ? (initialParam as T) : initialValue!; // Add non-null assertion operator

  // Function to update the search parameter in the URL
  const updateSearchParam = (newValue: T | undefined) => {
    const newSearchParams = new URLSearchParams(searchParams.toString());
    if (newValue === undefined) {
      newSearchParams.delete(param);
    } else {
      newSearchParams.set(param, newValue.toString());
    }
    setSearchParams(newSearchParams);
  };

  return [value, updateSearchParam];
}

export default useUrlState;

