import * as Yup from 'yup';
import { useState } from 'react';
//import { useSnackbar } from 'notistack';
//import { Link as RouterLink } from 'react-router-dom';
import { useFormik, Form, FormikProvider } from 'formik';
import { Icon } from '@iconify/react';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
// material
import {
  Link,
  Stack,
  Alert,
  Checkbox,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
// routes
import { PATH_AUTH } from 'src/routes/paths';
// hooks
// import useAuth from 'src/hooks/useAuth';
// import useIsMountedRef from 'src/hooks/useIsMountedRef';
//
import { MIconButton } from 'src/components/@material-extend';

// ----------------------------------------------------------------------

export default function LoginForm() {
  //const { login } = useAuth();
  //const isMountedRef = useIsMountedRef();
  //const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const LoginSchema = Yup.object().shape({
    email: Yup.string().email('올바른 이메일 주소가 아닙니다!').required('이메일을 입력해 주세요.'),
    password: Yup.string().required('비밀번호를 입력해 주세요.')
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      remember: true
    },
    validationSchema: LoginSchema,
    onSubmit: async (values, { setErrors, setSubmitting, resetForm }) => {
      try {
        // await login(values.email, values.password);
        // enqueueSnackbar('Login success', {
        //   variant: 'success',
        //   action: (key) => (
        //     <MIconButton size="small" onClick={() => closeSnackbar(key)}>
        //       <Icon icon={closeFill} />
        //     </MIconButton>
        //   )
        // });
        // if (isMountedRef.current) {
        //   setSubmitting(false);
        // }
      } catch (error) {
        console.error(error);
        resetForm();
        // if (isMountedRef.current) {
        //   setSubmitting(false);
        //   setErrors({ afterSubmit: error.message });
        // }
      }
    }
  });   

    const { errors, touched, values, isSubmitting, handleSubmit, getFieldProps } = formik;

    
    const handleShowPassword = () => {
        setShowPassword((show) => !show);
    };

    return(
        <FormikProvider value={formik}>
            <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
                <Stack spacing={3}>
                    {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}
                    <TextField
                        fullWidth
                        autoComplete="username"
                        type="email"
                        label="이메일"
                        {...getFieldProps('email')}
                        error={Boolean(touched.email && errors.email)}
                        helperText={touched.email && errors.email}
                    />

                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="비밀번호"
                        {...getFieldProps('password')}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge="end">
                                <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                            </IconButton>
                            </InputAdornment>
                        )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
          
                    <TextField
                        fullWidth
                        autoComplete="current-password"
                        type={showPassword ? 'text' : 'password'}
                        label="비밀번호확인"
                        {...getFieldProps('passwordCheck')}
                        InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                            <IconButton onClick={handleShowPassword} edge="end">
                                <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                            </IconButton>
                            </InputAdornment>
                        )
                        }}
                        error={Boolean(touched.password && errors.password)}
                        helperText={touched.password && errors.password}
                    />
                </Stack>
                <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }} />
                
                <LoadingButton fullWidth size="large" type="submit" variant="contained" loading={isSubmitting}>
                    회원가입
                </LoadingButton>
            </Form>
        </FormikProvider>
    );
}
