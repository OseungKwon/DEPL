import { useState, useRef, useEffect } from 'react';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
// routes
import { PATH_AUTH } from '../../routes/paths';
// material
import {
    Button, Dialog, DialogTitle, DialogContent, DialogActions, Divider,
    Box, Card, Stack, Link, Alert, Tooltip, Container, Typography
} from '@material-ui/core';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import AuthSocials from './AuthSocial';
// ----------------------------------------------------------------------

export default function LoginModal() {
  const [open, setOpen] = useState(false);
  const [isLogin, setIsLogin] = useState(true);
  
  const [scroll, setScroll] = useState('paper');

  const handleClickOpen = (scrollType) => () => {
    setOpen(true);
    setScroll(scrollType);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleRegister = (event) => {
    event.preventDefault();
    const clickValue = isLogin ? false : true;
    setIsLogin(clickValue);
    
    console.log("회원가입");
  }

  const descriptionElementRef = useRef(null);
  useEffect(() => {
    if (open) {
      const { current: descriptionElement } = descriptionElementRef;
      if (descriptionElement !== null) {
        descriptionElement.focus();
      }
    }
  }, [open]);
  const handleLoginAuth0 = async () => {
      try {
      // await login();
      } catch (error) {
      console.error(error);
      }
    };
  const loginText = isLogin ? "로그인" : "회원가입";
  const registerText = isLogin ? "회원가입" : "로그인";
  const ContentStyle = styled('div')(({ theme }) => ({
    maxWidth: 480,
    margin: 'auto',
    display: 'inline',
    minHeight: '100vh',
    flexDirection: 'column',
    justifyContent: 'center',
    padding: theme.spacing(0, 0)
  }));

  return (
    <>
      <Button variant="contained" onClick={handleClickOpen('paper')} sx={{ mr: 2 }}>
        {loginText}
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        scroll={scroll}
        maxWidth={'sm'}
        fullWidth={true}
      >
        <DialogTitle sx={{ pb: 2 }}>
          QLICK {loginText}
        </DialogTitle>
        <DialogContent dividers={scroll === 'paper'}>
          <ContentStyle>
            <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h4" gutterBottom>
                  QLICK {loginText}하기
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>이메일 또는 SNS로 {loginText} 가능합니다.</Typography>
              </Box>
            </Stack>

                {/* <AuthSocials /> */}

                {/* <Alert Alert severity="info" sx={{ mb: 3 }}> */}
              
                    {/* Use email : <strong>demo@minimals.cc</strong> / password :<strong>&nbsp;demo1234</strong> */}
                {/* </Alert> */}

             
            {isLogin ? <LoginForm /> : <RegisterForm />}
            <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                SNS로 {loginText}하기
              </Typography>
            </Divider>
            <AuthSocials/>
                    {/* <Button fullWidth size="large" type="submit" variant="contained" onClick={handleLoginAuth0}>
                    Login
                    </Button> */}
             
                    
          </ContentStyle>
        </DialogContent>
         
        <DialogActions>
          <Typography variant="body2" align="center" sx={{ mt: 1 }}>
            <Link variant="subtitle2" href="#" onClick={ handleRegister}>
                  QLICK {registerText}하기
              </Link>
          </Typography>
          {/* <Button onClick={handleClose}>Cancel</Button>
          <Button variant="contained" onClick={handleClose}>
            Subscribe
          </Button> */}
        </DialogActions>
      </Dialog>
      </>
  );
}
