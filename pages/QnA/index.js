import { QnA } from 'src/routes/paths';

// ----------------------------------------------------------------------

function Page() {
  return null;
}

export default Page;

export const getServerSideProps = () => {
  return {
    redirect: {
      destination: QnA.general.list,
      permanent: false,
    },
  };
};
