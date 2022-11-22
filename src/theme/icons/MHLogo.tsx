import { ReactComponent as MHIcon } from '../../static/svg/brand/mhatwork.svg';

export default function MHLogo({ style }: { style?: object }) {
  return (
    <MHIcon
      style={{
        margin: '0',
        ...style
      }}
    />
  );
}
