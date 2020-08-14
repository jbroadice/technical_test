export default function InvoiceStatusLabel(props) {
  switch (props.children) {
    case "draft":
      return <strong style={{ color: "grey" }}>DRAFT</strong>;
    case "open":
      return <strong style={{ color: "red" }}>OPEN</strong>;
    case "processed":
      return <strong style={{ color: "green" }}>PROCESSED</strong>;
  }
}
