import { Icon } from '@iconify/react';
import homeFill from '@iconify/icons-eva/home-fill';
import fileFill from '@iconify/icons-eva/file-fill';
// routes
import { PATH_DASHBOARD, PATH_BLOG, QnA } from '../../routes/paths';

// ----------------------------------------------------------------------

const ICON_SIZE = {
  width: 22,
  height: 22,
};

const menuConfig = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon={homeFill} {...ICON_SIZE} />,
  },
  { title: '포스트', path: PATH_BLOG.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
  { title: '피드', path: PATH_DASHBOARD.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
  { title: '펠로우', path: PATH_DASHBOARD.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
  { title: 'Q&A', path: QnA.root, icon: <Icon icon={fileFill} {...ICON_SIZE} /> },
];

export default menuConfig;
