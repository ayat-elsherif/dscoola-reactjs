import { css } from '@emotion/css';
import { Link } from 'react-router-dom';

function HelpTopicItem({ icon, title, desc, to }) {
  const HelpTopicItemStyles = css`
    width: 27rem;
    max-width: 100%;
    min-height: 25rem;
    padding: 2.4rem 1.6rem;
    background: #ffffff;
    box-shadow: 0px 3px 6px #00000029;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    align-items: center;
    /* gap: 1rem; */

    .icon {
      margin-bottom: 2rem;
      svg {
        width: 6.5rem;
      }
    }
    .title {
      font-weight: 500;
      font-size: 1.8rem;
      line-height: 3rem;
      color: #2a2a2a;
      text-transform: capitalize;
      text-align: center;
      margin-bottom: 0.5rem;
    }

    p {
      font-size: 1.6rem;
      line-height: 3.6rem;
      color: #2a2a2a;
      text-align: center;
    }
  `;

  return (
    <div to={to} className={HelpTopicItemStyles}>
      <div className="icon">{icon}</div>
      <Link className="title">{title}</Link>
      <p>{desc}</p>
    </div>
  );
}

export default HelpTopicItem;
