import { useState } from "react";
import useSWR from "swr";
import fetcher from "@lib/fetcher";
import objectToQueryParamsString from "@lib/objectToQueryParamsString";

import LocationSelectInput from "@components/inputs/LocationSelectInput";
import InvoiceStatusInput from "@components/inputs/InvoiceStatusInput";
import InvoiceStatusLabel from "@components/labels/InvoiceStatusLabel";
import DateRangePicker from "@components/inputs/DateRangePicker";

const getInvoicesApiUrl = (filters = {}) => {
  const { dateRange, statusType, locationId } = filters;

  const queryParams = objectToQueryParamsString({
    dateStart: dateRange && dateRange.startDate && dateRange.startDate.toISOString(),
    dateEnd: dateRange && dateRange.endDate && dateRange.endDate.toISOString(),
    statusType,
    locationId,
  });

  return `/api/invoices?${queryParams}`;
};

const onFilterInputChange = (setFilterFunc) => (option) => {
  const value = (option && option.value) || option;
  setFilterFunc(value);
};

function renderTableBody(data) {
  if (!data) return <p>Loading...</p>;

  if (data.invoices.length === 0) {
    return <p>No invoices found.</p>;
  }

  return data.invoices.map((invoice, invoiceKey) => {
    return (
      <tr
        key={invoiceKey}
        style={{ backgroundColor: invoiceKey % 2 == 0 ? "pink" : "white" }}
      >
        <td>{invoice.id}</td>
        <td>{invoice.location.name}</td>
        <td>{invoice.date}</td>
        <td>
          <InvoiceStatusLabel>{invoice.status}</InvoiceStatusLabel>
        </td>
        <td>
          {new Intl.NumberFormat("en-GB", {
            style: "currency",
            currency: "GBP",
          }).format(invoice.totalValue)}
        </td>
      </tr>
    );
  });
}

export async function getServerSideProps() {
  const data = await fetcher(getInvoicesApiUrl());
  return { props: { data } };
}

export default function Index(props) {
  const [dateRange, setFilterDateRange] = useState(null);
  const [statusType, setFilterStatus] = useState(null);
  const [locationId, setFilterLocation] = useState(null);
  const [hasRendered, setHasRendered] = useState(false);

  const { data } = useSWR(
    getInvoicesApiUrl({ dateRange, statusType, locationId }),
    fetcher,
    {
      initialData: hasRendered ? undefined : props.data,
    },
  );

  if (!hasRendered) setHasRendered(true);

  return (
    <div>
      <div>
        <DateRangePicker onChange={onFilterInputChange(setFilterDateRange)} />
        <InvoiceStatusInput onChange={onFilterInputChange(setFilterStatus)} />
        <LocationSelectInput onChange={onFilterInputChange(setFilterLocation)} />
      </div>

      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
            <th>Total Value</th>
          </tr>
        </thead>
        <tbody>{renderTableBody(data)}</tbody>
      </table>
    </div>
  );
}
