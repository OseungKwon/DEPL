import { useState } from "react";
import { Chip } from "@material-ui/core";
import DoneIcon from "@material-ui/icons/Done";
import DeleteIcon from "@material-ui/icons/Delete";

const mockData = ["javascript", "java", "python", "golang", "flutter"];

function ChipCheckbox({ value, tags, setTags }) {
  const [state, setState] = useState(false);
  const [chipStyle, setChipStyle] = useState({
    variant: "outlined",
    color: "primary",
    deleteIcon: <DoneIcon />
  });

  const handleClick = event => {
    setState(!state);
    setChipStyle({
      variant: state ? "outlined" : "filled",
      deleteIcon: state ? <DoneIcon /> : <DeleteIcon />,
      color: "primary"
    });
    if (state) {
      setTags(tags.filter(item => item !== value));
    } else {
      setTags([...tags, value]);
    }
  };
  return (
    <Chip
      {...chipStyle}
      label={value}
      onDelete={handleClick}
      onClick={handleClick}
    />
  );
}

export default ChipCheckbox;
