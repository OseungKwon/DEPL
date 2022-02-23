import PropTypes from "prop-types";
import { Icon } from "@iconify/react";
import pinFill from "@iconify/icons-eva/pin-fill";
import emailFill from "@iconify/icons-eva/email-fill";
import roundBusinessCenter from "@iconify/icons-ic/round-business-center";
// material
import { experimentalStyled as styled } from "@material-ui/core/styles";
import { Link, Card, Typography, CardHeader, Stack } from "@material-ui/core";

// ----------------------------------------------------------------------

const IconStyle = styled(Icon)(({ theme }) => ({
  width: 20,
  height: 20,
  marginTop: 1,
  flexShrink: 0,
  marginRight: theme.spacing(2)
}));

// ----------------------------------------------------------------------

ProfileAbout.propTypes = {
  profile: PropTypes.object
};

export default function ProfileAbout({ profile }) {
  // const { quote, country, email, role, company, school } = profile;

  return (
    <Card>
      <CardHeader title="소개" />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Typography variant="body2">{profile?.quote}</Typography>

        <Stack direction="row">
          <IconStyle icon={emailFill} />
          <Typography variant="body2">abc@abc.com</Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            2010~2012 &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              페이스북 에서 일했어요
            </Link>
          </Typography>
        </Stack>

        <Stack direction="row">
          <IconStyle icon={roundBusinessCenter} />
          <Typography variant="body2">
            현재 &nbsp;
            <Link component="span" variant="subtitle2" color="text.primary">
              여기서
            </Link>
            &nbsp;근무중입니다.
          </Typography>
        </Stack>
      </Stack>
    </Card>
  );
}
