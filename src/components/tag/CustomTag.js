import { Tag } from "antd";
import "./styles.scss";

const CustomTag = ({ status,hover }) => {
  let text = null;
  let color = null;
  switch (status) {
    case "Pending":
      text = "Pending";
      color = "blue";
      break;
    case "Done":
      text = "Done";
      color = "green";
      break;
    case "No Show":
      text = "No Show";
      color = "default";
      break;
    case "Cancelled":
      text = "Cancelled";
      color = "red";
      break;
    case "In complete":
      text = "In Complete";
      color = "grey";
      break;
    case 0:
      text = "In Progress";
      color = "orange";
      break;
    case 1:
      text = "Approved";
      color = "green";
      break;
    case 2:
      text = "Rejected";
      color = "red";
      break;
    case "Manifest Ready":
      text = "Manifest Ready";
      color = "orange";
      break;
    case "Manifest Process":
      text = "Manifest Process";
      color = "blue";
      break;
    case "In Progress":
      text = "In Progress";
      color = "orange";
      break;
      case "Invalid":
        text = "Invalid";
        color = "red";
        break;
    case "Manifest Complete":
      text = "Manifest Complete";
      color = "green";
      break;
    default:
      text = "No status";
      color = "grey";
  }
  return (
    <Tag color={color} className="status-tag" data-text={hover}>
      {text}
      <span className="hover-text">{hover}</span>
    </Tag>
  );
};
export default CustomTag;
