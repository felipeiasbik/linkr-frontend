import { Oval } from 'react-loader-spinner';
import { LoaderContainer } from './circleStyles';

export default function CircleLoader() {
  return (
    <LoaderContainer>
      <Oval
        height={40}
        width={40}
        color="#F3F3F3"
        wrapperStyle={{}}
        wrapperClass=""
        visible
        ariaLabel="oval-loading"
        secondaryColor="#ffffff"
        strokeWidth={2}
        strokeWidthSecondary={2}
      />
    </LoaderContainer>
  );
}
