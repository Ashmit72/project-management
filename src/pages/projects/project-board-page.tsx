import { useParams } from 'react-router-dom';

export default function ProjectBoardPage() {
  const { projectId } = useParams();
  return <div>Viewing project board {projectId}</div>;
}
