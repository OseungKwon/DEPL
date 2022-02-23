import { Icon } from "@iconify/react";
import { useState } from "react";
import Link from "next/link";
import searchFill from "@iconify/icons-eva/search-fill";
import TagIcon from "@material-ui/icons/Tag";
import MoreHorizOutlinedIcon from "@material-ui/icons/MoreHorizOutlined";
// material
import { experimentalStyled as styled, alpha } from "@material-ui/core/styles";
import {
  Box,
  Input,
  Button,
  TextField,
  InputAdornment,
  Autocomplete,
  Container,
  Stack,
  Divider,
  Grid,
  Typography,
  IconButton,
  Tooltip,
  InputBase
} from "@material-ui/core";
import ChipCheckbox from "./ChipCheckbox";
import { PATH_TAGS } from "src/routes/paths";
// ----------------------------------------------------------------------

const APPBAR_MOBILE = 64;
const APPBAR_DESKTOP = 80;

const tagMockData = [
  "javascript",
  "java",
  "python",
  "golang",
  "flutter",
  "C",
  "C++",
  "Ruby On Rails"
];

const SearchbarStyle = styled("div")(({ theme }) => ({
  top: 55,
  width: "100%",
  display: "flex",
  position: "relative",
  alignItems: "center",
  height: APPBAR_MOBILE,
  [theme.breakpoints.up("md")]: {
    height: APPBAR_DESKTOP,
    padding: theme.spacing(0, 0)
  }
}));

// ----------------------------------------------------------------------

function TagSearchbar({ openState }) {
  const [tags, setTags] = useState([]);
  const TagbarStyle = styled("div")(({ theme }) => ({
    top: 15,
    left: 0,
    width: "100%",
    display: openState ? "flex" : "none",
    height: APPBAR_MOBILE - 20,
    backdropFilter: "blur(6px)",
    WebkitBackdropFilter: "blur(6px)", // Fix on Mobile
    [theme.breakpoints.up("md")]: {
      height: APPBAR_DESKTOP - 20,
      padding: theme.spacing(0, 0)
    }
  }));

  const handleChange = () => {
    alert("검색");
  };
  return (
    <>
      <div style={{ display: openState ? "flex" : "none" }}>
        {/* <div>
          <StarOutlineIcon
            sx={{
              color: "text.disabled",
              width: 30,
              height: 30
            }}
          />
          인기태그 :
        </div> */}
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          sx={{ color: "text.disabled", mr: 2 }}
        >
          인기태그 :
        </Typography>

        <Stack direction="row" spacing={0.5}>
          {tagMockData.map((value, index) => (
            <ChipCheckbox
              key={index}
              value={value.toString()}
              item
              tags={tags}
              setTags={setTags}
            />
          ))}
          <Link href={PATH_TAGS.general.list}>
            <Tooltip title="전체 태그보기">
              <IconButton size="small" color="primary">
                <MoreHorizOutlinedIcon />
              </IconButton>
            </Tooltip>
          </Link>
        </Stack>
      </div>

      <TagbarStyle>
        <TagIcon
          sx={{ color: "text.disabled", width: 20, height: 20, mt: 0.5 }}
        />
        <Autocomplete
          fullWidth
          multiple
          freeSolo
          value={tags}
          onChange={(event, newValue) => {
            event.preventDefault();
            setTags([...newValue]);
          }}
          options={[]}
          renderInput={params => (
            <TextField
              {...params}
              variant="standard"
              placeholder="태그명으로 검색"
            />
          )}
        />
      </TagbarStyle>
    </>
  );
}

export default function Searchbar() {
  const [isOpen, setOpen] = useState(false);
  const handleClose = () => {
    alert("검색");
  };
  const handleTagButton = () => {
    setOpen(!isOpen);
  };
  const handleKeyPress = event => {
    if (event.key === "Enter") {
      handleClose();
    }
  };
  return (
    <>
      <Container>
        <SearchbarStyle>
          <Grid container spacing={2}>
            <Grid item xs={10}>
              <Input
                disableUnderline
                fullWidth
                placeholder="제목, 내용, 작성자명으로 검색"
                startAdornment={
                  <InputAdornment position="start">
                    <Box
                      component={Icon}
                      icon={searchFill}
                      sx={{ color: "text.disabled", width: 20, height: 20 }}
                    />
                  </InputAdornment>
                }
                sx={{ mr: 1, fontWeight: "fontWeightBold" }}
                onKeyPress={handleKeyPress}
              />
            </Grid>
            <Grid item xs={2} sx={{ textAlign: "right" }}>
              <Button variant="contained" onClick={handleClose}>
                검색
              </Button>
              <Button
                width="100"
                variant="text"
                onClick={handleTagButton}
                sx={{ ml: 1 }}
              >
                #태그검색
              </Button>
            </Grid>
          </Grid>
        </SearchbarStyle>
      </Container>
      <Divider sx={{ marginTop: 6 }} />
      <Container>
        <TagSearchbar openState={isOpen} />
      </Container>
    </>
  );
}
