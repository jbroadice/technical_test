import { useState } from "react";
import AsyncSelect from "react-select/async";
import fetcher from "@lib/fetcher";

const promiseOptions = (setIsLoading) => async (inputValue) => {
  setIsLoading(true);

  const data = await fetcher(`/api/locations?name=${inputValue.trim()}`);

  setIsLoading(false);

  return data.locations.map((v) => ({
    label: v.name,
    value: v.id,
  }));
};

export default function LocationSelectInput(props) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <AsyncSelect
      {...props}
      cacheOptions
      defaultOptions
      loadOptions={promiseOptions(setIsLoading)}
      isClearable
      noOptionsMessage={() => "No locations found"}
      placeholder="Select Location"
      inputId="input-filter-location"
    />
  );
}
