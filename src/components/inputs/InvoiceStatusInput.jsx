import { useState } from "react";
import Select from "react-select";
import InvoiceStatusLabel from "@components/labels/InvoiceStatusLabel";
import { INVOICE_STATUS_TYPES } from "appConstants";

const options = INVOICE_STATUS_TYPES.map((value) => ({ value }));

const handleChange = (setSelectedOption, props) => (selectedOption) => {
  setSelectedOption(selectedOption);

  if (typeof props.onChange === "function") {
    props.onChange(selectedOption);
  }
};

const formatOptionLabel = (statusType) => (
  <InvoiceStatusLabel>{statusType.value}</InvoiceStatusLabel>
);

export default function InvoiceStatusInput(props) {
  const [selectedOption, setSelectedOption] = useState(null);

  return (
    <Select
      {...props}
      options={options}
      inputId="input-invoice-status"
      placeholder="Select Status"
      onChange={handleChange(setSelectedOption, props)}
      formatOptionLabel={formatOptionLabel}
      value={selectedOption}
      isClearable
    />
  );
}
