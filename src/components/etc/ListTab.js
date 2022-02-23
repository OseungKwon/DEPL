import PropTypes from "prop-types";
// material
import { Tabs, Tab } from "@material-ui/core";
// ----------------------------------------------------------------------

ListSortTab.propTypes = {
  query: PropTypes.string,
  options: PropTypes.array,
  onSort: PropTypes.func
};

/*
query : 첫번째 설정 탭,
options 탭 목록
onSort: onChange 옵션
*/
export default function ListSortTab({ query, options, onSort, style }) {
  return (
    <div style={{ ...style }}>
      <Tabs
        value={query}
        scrollButtons="auto"
        variant="scrollable"
        allowScrollButtonsMobile
        onChange={onSort}
      >
        {options.map(option => (
          <Tab
            disableRipple
            key={option.value}
            value={option.value}
            label={option.label}
          />
        ))}
      </Tabs>
    </div>
  );
}
