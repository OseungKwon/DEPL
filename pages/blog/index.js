import { PATH_BLOG } from "src/routes/paths";

// ----------------------------------------------------------------------

function Page() {
  return null;
}

export default Page;

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: PATH_BLOG.general.list,
      permanent: false
    }
  };
};
