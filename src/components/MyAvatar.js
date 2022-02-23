import { useSession } from "next-auth/client";
import { MAvatar } from "./@material-extend";
import createAvatar from "src/utils/createAvatar";

// ----------------------------------------------------------------------

export default function MyAvatar({ ...other }) {
  const [session, loading] = useSession();
  return (
    <MAvatar
      src={"사진주소"}
      alt={"이름"}
      color={session?.photoURL ? "default" : createAvatar("ㄴㄴㄴ").color}
      {...other}
    >
      {createAvatar("ㄴㄴㄴ").name}
    </MAvatar>
  );
}
