import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { useCallback } from 'react';
import { useSnackbar } from 'notistack';
// redux
import { useDispatch, useSelector } from 'src/redux/store';
import { Form, FormikProvider, useFormik } from 'formik';
import { Icon } from '@iconify/react';
import githubFill from '@iconify/icons-eva/github-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { LoadingButton } from '@material-ui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  InputAdornment,
  FormHelperText,
  FormControlLabel
} from '@material-ui/core';
// utils
import { fData } from 'src/utils/formatNumber';
import fakeRequest from 'src/utils/fakeRequest';
// routes
//import { PATH_DASHBOARD } from 'src/routes/paths';
//components
import Label from '../Label';
import { UploadAvatar } from '../upload';

// ----------------------------------------------------------------------

UserProfile.propTypes = {
  isEdit: PropTypes.bool,
  currentUser: PropTypes.object
};

const SOCIAL_LINKS_OPTIONS = [
   {
    value: 'githublink',
    icon: <Icon icon={githubFill} height={24} />
  },
  {
    value: 'facebookLink',
    icon: <Icon icon={facebookFill} height={24} />
  },
  {
    value: 'instagramLink',
    icon: <Icon icon={instagramFilled} height={24} />
  },
  {
    value: 'linkedinLink',
    icon: <Icon icon={linkedinFill} height={24} />
  },
];

export default function UserProfile({ isEdit, currentUser }) {
  const { enqueueSnackbar } = useSnackbar();
  const { myProfile } = useSelector((state) => state.user);

  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required('Name is required'),
    email: Yup.string().required('Email is required').email(),
    phoneNumber: Yup.string().required('Phone number is required'),
    address: Yup.string().required('Address is required'),
    avatarUrl: Yup.mixed().required('Avatar is required'),
    facebookLink: 'myProfile.facebookLink',
    instagramLink: 'myProfile.instagramLink',
    linkedinLink: 'myProfile.linkedinLink',
    githublink: 'myProfile.githublink',
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: currentUser?.name || '',
      email: currentUser?.email || '',
      phoneNumber: currentUser?.phoneNumber || '',
      address: currentUser?.address || '',
      country: currentUser?.country || '',
      state: currentUser?.state || '',
      city: currentUser?.city || '',
      zipCode: currentUser?.zipCode || '',
      avatarUrl: currentUser?.avatarUrl || null,
      isVerified: currentUser?.isVerified || true,
      status: currentUser?.status,
      company: currentUser?.company || '',
      role: currentUser?.role || '',
      facebookLink: 'facebookLink',
      instagramLink: 'instagramLink',
      linkedinLink: 'linkedinLink,',
      githublink: 'githublink'
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await fakeRequest(500);
        resetForm();
        setSubmitting(false);
        enqueueSnackbar(!isEdit ? 'Create success' : 'Update success', { variant: 'success' });
        //navigate(PATH_DASHBOARD.user.list);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Grid item xs={12} md={4}>
           
          </Grid>
        <Stack spacing={3}>
          <Card sx={{ p: 3 }}>
              <Typography variant="h6" gutterBottom component="div">사용자 정보</Typography>
              <Stack direction={{ xs: 'column'}} spacing={{ xs: 3, sm: 2 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.avatarUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                  caption={
                    <Typography
                      variant="caption"
                      sx={{
                        mt: 2,
                        mx: 'auto',
                        display: 'block',
                        textAlign: 'center',
                        color: 'text.secondary'
                      }}
                    >
                      *.jpeg, *.jpg, *.png 만 업로드 가능합니다.
                      <br /> max size of {fData(3145728)}
                    </Typography>
                  }
            />
            
                
            <Stack spacing={{ xs: 3, sm: 2 }}>
            
              <TextField
                    fullWidth
                    label="이름"
                    {...getFieldProps('name')}
                    error={Boolean(touched.name && errors.name)}
                    helperText={touched.name && errors.name}
                  />
                  <TextField
                    fullWidth
                    label="이메일"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="자기소개"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />

            </Stack>
              
          </Stack>
           
          </Card>
          
           <Card sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom component="div">SNS 정보</Typography>
            <Stack spacing={3} alignItems="flex-end">
              {SOCIAL_LINKS_OPTIONS.map((link) => (
                <TextField
                  key={link.value}
                  fullWidth
                  {...getFieldProps(link.value)}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">{link.icon}</InputAdornment>
                  }}
                />
              ))}
            </Stack>
       
            
          </Card>
        
          <Card sx={{ p: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting} fullWidth>
              정보수정
            </LoadingButton>
          </Card>
        </Stack>
        
        
      </Form>
    </FormikProvider>
  );
}
