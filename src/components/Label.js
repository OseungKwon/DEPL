import PropTypes from "prop-types";
// material
import { alpha, experimentalStyled as styled } from "@material-ui/core/styles";

// ----------------------------------------------------------------------

const RootStyle = styled("span")(({ theme, styleProps }) => {
  return {
    height: 22,
    minWidth: 22,
    lineHeight: 0,
    borderRadius: 8,
    cursor: "default",
    alignItems: "center",
    whiteSpace: "nowrap",
    display: "inline-flex",
    justifyContent: "center",
    padding: theme.spacing(0, 1),
    color: theme.palette.grey[999], // temp color
    fontSize: theme.typography.pxToRem(12),
    fontFamily: theme.typography.fontFamily,
    fontWeight: theme.typography.fontWeightBold
  };
});

// ----------------------------------------------------------------------

export default function Label({
  color = "default",
  variant = "ghost",
  children,
  ...other
}) {
  return (
    <RootStyle styleProps={{ color, variant }} {...other}>
      {children}
    </RootStyle>
  );
}

Label.propTypes = {
  children: PropTypes.node,
  color: PropTypes.oneOf([
    "default",
    "primary",
    "secondary",
    "info",
    "success",
    "warning",
    "error"
  ]),
  variant: PropTypes.oneOf(["filled", "outlined", "ghost"])
};
