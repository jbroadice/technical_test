import { useState } from "react";
import DatePicker from "react-datepicker";

export default function DateRangePicker(props) {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const onDateChange = (dateType) => (date) => {
    const setDateFunc = dateType === "startDate" ? setStartDate : setEndDate;
    setDateFunc(date);

    if (typeof props.onChange === "function") {
      const change = { startDate, endDate };

      change[dateType] = date;

      props.onChange(change);
    }
  };

  const dateFormat = "dd/MM/yyyy";

  return (
    <>
      <DatePicker
        selected={startDate}
        onChange={onDateChange("startDate")}
        selectsStart
        startDate={startDate}
        endDate={endDate}
        placeholderText="Start Date"
        dateFormat={dateFormat}
        isClearable
      />
      <DatePicker
        selected={endDate}
        onChange={onDateChange("endDate")}
        selectsEnd
        startDate={startDate}
        endDate={endDate}
        minDate={startDate}
        placeholderText="End Date"
        dateFormat={dateFormat}
        isClearable
      />
    </>
  );
}
