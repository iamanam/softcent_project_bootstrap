import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Icon({ name, color }) {
  return <FontAwesomeIcon color={color} icon={name}></FontAwesomeIcon>;
}
