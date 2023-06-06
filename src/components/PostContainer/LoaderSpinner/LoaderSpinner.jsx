import { ThreeDots } from 'react-loader-spinner';

export default function LoaderSpinner() {
  return (
    <ThreeDots
      height="20"
      width="40"
      radius="26"
      color="#FFFFFF"
      ariaLabel="three-dots-loading"
      wrapperStyle={{}}
      wrapperClassName=""
      visible
    />
  );
}
