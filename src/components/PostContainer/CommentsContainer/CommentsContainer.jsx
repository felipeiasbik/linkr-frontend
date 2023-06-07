import CircleLoader from '../LoaderSpinner/CircleLoader';
import { Container } from './commentsContainerStyles';

export default function CommentsContainer({ showComments }) {
  return (
    <Container showComments={showComments}>
      <CircleLoader />
    </Container>
  );
}
