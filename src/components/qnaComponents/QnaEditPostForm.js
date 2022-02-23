import React, {
  useCallback,
  useState,
  useRef,
  forwardRef,
  useEffect
} from "react";
import { useRouter } from "next/router";
import * as Yup from "yup";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";
import Comment from "./Comment";
import { useSnackbar } from "notistack";

import { editQna, getQna } from "src/redux/slices/qna";
import { Form, Formik, useFormik } from "formik";
import { useDispatch } from "src/redux/store";
// material
import { LoadingButton } from "@material-ui/lab";
import { experimentalStyled as styled } from "@material-ui/core/styles";
import {
  Card,
  Grid,
  Chip,
  Stack,
  Button,
  Switch,
  TextField,
  Typography,
  Autocomplete,
  FormHelperText,
  FormControlLabel
} from "@material-ui/core";
// utils
const Viewer = dynamic(() => import("../editor/TuiViewer"), { ssr: false });
const Editor = dynamic(() => import("../editor/TuiEditor"), { ssr: false });
const EditorWithForwardedRef = forwardRef((props, ref) => (
  <Editor {...props} forwardedRef={ref} />
));
const TAGS_OPTION = ["Javascript", "Java", "React", "Vue", "Angular"];

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));
const QnaEditPostForm = ({ user }) => {
  const qna = useSelector(state => state.qna.qna);
  const router = useRouter();
  const editorRef = useRef(null);
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const [open, setOpen] = useState(false);
  const initialTags = qna?.tags?.map(el => el.tag?.name);
  const handleOpenPreview = () => {
    setOpen(true);
  };
  const handleClosePreview = () => {
    setOpen(false);
  };
  const NewBlogSchema = Yup.object().shape({
    title: Yup.string().required("제목을 입력하세요")
  });

  const formik = useFormik({
    initialValues: {
      is_private: qna?.is_private,
      is_temp: qna?.is_temp,
      text: qna?.text,
      title: qna?.title,
      is_markdown: qna?.is_markdown,
      tags: qna?.tags.map(el => el.tag.name)
    },
    validationSchema: NewBlogSchema,
    //글쓰기
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const instance = editorRef.current.getInstance();
        values.text = instance.getMarkdown();

        const data = {
          is_private: values.is_private,
          is_temp: values.is_temp,
          text: values.text,
          title: values.title,
          is_markdown: values.is_markdown,
          delete_tags: qna.tags.filter(
            el => !values.tags.includes(el.tag.name)
          ),
          create_tags: values.tags.filter(el => !initialTags.includes(el))
        };

        await dispatch(editQna(qna.id, data));
        enqueueSnackbar("저장되었습니다.", { variant: "success" });
        router.back();
      } catch (error) {
        console.error(error);
        setSubmitting(false);
      }
    }
  });

  // console.log(qna?.tags, formik.values.tags);
  // // 삭제된 tag

  // console.log(
  //   "삭제된 tag",
  //   qna?.tags.filter(el => !formik.values.tags.includes(el.tag.name))
  // );
  // // 추가된 tag
  // console.log(
  //   "추가된 tag",
  //   formik.values.tags.filter(el => !initialTags.includes(el))
  // );
  const qnaSubmit = () => {};

  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps,
    handleChange
  } = formik;

  return (
    <div style={{ marginTop: "10rem" }}>
      {qna?.text && (
        <Formik enableReinitialize={true} value={formik}>
          <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={12}>
                <Card sx={{ p: 3 }}>
                  <Stack spacing={3}>
                    <TextField
                      fullWidth
                      label="제목"
                      {...getFieldProps("title")}
                      error={touched.title && Boolean(errors.title)}
                      helperText={touched.title && errors.title}
                      value={values.title}
                      onChange={handleChange}
                    />
                    <Autocomplete
                      multiple
                      freeSolo
                      value={values.tags}
                      onChange={(event, newValue) => {
                        setFieldValue("tags", newValue);
                      }}
                      options={TAGS_OPTION.map(option => option)}
                      renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                          <Chip
                            key={option}
                            size="small"
                            label={option}
                            {...getTagProps({ index })}
                          />
                        ))
                      }
                      renderInput={params => (
                        <TextField {...params} label="태그" />
                      )}
                    />

                    <div>
                      <LabelStyle>내용</LabelStyle>
                      <EditorWithForwardedRef
                        placeholder="머릿 속 풍부한 내용들을 정리해 주세요."
                        initialValue={values.text}
                        previewStyle="vertical"
                        height="600px"
                        initialEditType="markdown"
                        useCommandShortcut={true}
                        ref={editorRef}
                      />

                      {touched.text && errors.text && (
                        <FormHelperText error sx={{ px: 2 }}>
                          {touched.text && errors.text}
                        </FormHelperText>
                      )}
                    </div>

                    <div>
                      <FormControlLabel
                        control={
                          <Switch
                            {...getFieldProps("publish")}
                            checked={values.is_private}
                          />
                        }
                        label="공개여부"
                        labelPlacement="start"
                        sx={{
                          mb: 1,
                          mx: 0,
                          width: "100%",
                          justifyContent: "space-between"
                        }}
                      />
                    </div>
                  </Stack>
                  <Stack
                    direction="row"
                    justifyContent="flex-end"
                    sx={{ mt: 3 }}
                  >
                    <LoadingButton
                      fullWidth
                      type="submit"
                      variant="contained"
                      size="large"
                      loading={isSubmitting}
                      onClick={e => qnaSubmit}
                    >
                      작성하기
                    </LoadingButton>
                    <Button
                      fullWidth
                      type="button"
                      color="inherit"
                      variant="outlined"
                      size="large"
                      onClick={() => router.back()}
                      sx={{ ml: 1.5 }}
                    >
                      나가기
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default QnaEditPostForm;
