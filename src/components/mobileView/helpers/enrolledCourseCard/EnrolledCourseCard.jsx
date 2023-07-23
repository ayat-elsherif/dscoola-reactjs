import { Progress } from 'antd';
import { Link } from 'react-router-dom';
import './enrolledCourseCard.scss';
export default function EnrolledCourseCard({ percentage }) {
  return (
    <Link className="enrolled-course" href="/courseoverview/id">
      <figure>
        <img src="/frontend/infixlmstheme/img/course/9.jpg" alt="course" />
      </figure>
      <div className="course-details">
        <h4>Live Session : Agile And Scrum For Product Owners</h4>
        <span className="total-lessons">Total Lessons : 6</span>
        <Progress percent={percentage} showInfo={false} />
        <span className="progress-info">You completed {percentage}%</span>
      </div>
    </Link>
  );
}
