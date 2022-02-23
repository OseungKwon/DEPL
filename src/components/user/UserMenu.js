import NavSection from "src/components/NavSection";
import SvgIconStyle from "src/components/SvgIconStyle";
// routes
import { PATH_MY } from "src/routes/paths";

export default function UserMenu({ menu }) {
  const getIcon = name => (
    <SvgIconStyle
      src={`/static/icons/navbar/${name}.svg`}
      sx={{ width: "100%", height: "100%" }}
    />
  );

  const ICONS = {
    user: getIcon("ic_user"),
    blog: getIcon("ic_blog"),
    ecommerce: getIcon("ic_ecommerce"),
    analytics: getIcon("ic_analytics"),
    dashboard: getIcon("ic_dashboard")
  };
  const sidebarConfig = [
    {
      subheader: "설정",
      items: [
        {
          title: "프로필",
          path: PATH_MY.setting,
          icon: ICONS.user
        },
        {
          title: "내가 쓴 글",
          path: PATH_MY.posts,
          icon: ICONS.blog
        },
        {
          title: "구독한 목록",
          path: PATH_MY.likes,
          icon: "-"
        },
        {
          title: "구독자 목록",
          path: PATH_MY.likeUsers,
          icon: "-"
        },
        {
          title: "패스워드 변경",
          path: PATH_MY.changePassword,
          icon: "-"
        }
      ]
    }
  ];

  return <NavSection navConfig={sidebarConfig} />;
}
