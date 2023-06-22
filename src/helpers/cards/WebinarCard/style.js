import { css } from '@emotion/css';

export const WebinarCardStyles = css`
  position: relative;
  width: 27rem;
  max-width: 100%;
  height: auto;
  /* min-height: 37.1rem; */
  /* min-height: 38rem; */
  padding-bottom: 2rem;
  overflow: hidden;
  background-color: #fff;
  box-shadow: 0px 0.3rem 0.6rem #00000029;
  border-radius: 0.8rem;

  .card-body {
    padding: 0 1.5rem;
  }
  .author-name {
    font-size: 1.2rem;
    line-height: 2rem;
    color: #7e59d1;
  }

  .course-title {
    font-weight: 500;
    font-size: 1.5rem;
    line-height: 2.4rem;
    color: #2a2a2a;
  }
  .course-desc {
    font-size: 1.3rem;
    line-height: 1.9rem;
    color: #2a2a2a;
  }

  .course-duration-wrapper {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    font-size: 1.2rem;
    line-height: 2.3rem;
    color: #6a6f73;
  }

  .price-wrapper {
    display: flex;
    align-items: center;
    gap: 0.3rem;
    .price {
      font-weight: 500;
      font-size: 1.6rem;
      line-height: 2.5rem;
      color: #2a2a2a;
    }
    .old-price {
      font-size: 1.2rem;
      line-height: 1.8rem;
      color: #6a6f73;
      text-decoration: line-through;
    }
  }

  .btn-action {
    height: 3.5rem;
    font-size: 1.4rem;
  }
`;
