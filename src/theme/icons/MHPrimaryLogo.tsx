import { ReactComponent as MHLogo } from '../../static/svg/primary-logo.svg';

import clsx from 'clsx';

export default function MHPrimaryLogo(props: { className?: string }) {
  return <MHLogo title="mh-logo" className={clsx(props.className)} />;
}
