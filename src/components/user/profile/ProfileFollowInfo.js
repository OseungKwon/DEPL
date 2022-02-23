import PropTypes from "prop-types";
// material
import { Card, Stack, Typography, Divider } from "@material-ui/core";
// utils
import { fNumber } from "src/utils/formatNumber";

// ----------------------------------------------------------------------

ProfileFollowInfo.propTypes = {
  profile: PropTypes.object
};

export default function ProfileFollowInfo({ profile }) {
  // const { follower, following } = profile;

  return (
    <Card sx={{ py: 3 }}>
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(111)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            팔로워
          </Typography>
        </Stack>

        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(2222)}</Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            팔로잉
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
