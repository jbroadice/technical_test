import { Badge } from "react-bootstrap";

export default function InvoiceStatusLabel(props) {
  switch (props.children) {
    case "draft":
      return (
        <Badge pill variant="warning">
          DRAFT
        </Badge>
      );
    case "open":
      return (
        <Badge pill variant="info">
          OPEN
        </Badge>
      );
    case "processed":
      return (
        <Badge pill variant="success">
          PROCESSED
        </Badge>
      );
  }
}
