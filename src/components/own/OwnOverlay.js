import cls from "classnames";
import { css } from "@emotion/css";
import { AiOutlineClose } from "react-icons/ai";

function OwnOverlay({
  visible,
  onClick,
  opacity,
  className,
  style,
  btnClose,
  zIndex,
}) {
  const OwnOverlayStyles = css`
    position: fixed;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    width: 100vw;
    height: 100vh;
    z-index: ${zIndex || 99};
    background: rgba(0, 0, 0, ${opacity || 0.4});

    .btn-close {
      position: absolute;
      top: 4rem;
      right: 4rem;
      z-index: 1000;

      svg {
        font-size: 2.6rem;
        color: #fff;
      }
    }
  `;
  return (
    <div
      className={cls(OwnOverlayStyles, className)}
      style={{ display: visible ? "block" : "none", ...style }}
      onClick={onClick}
    >
      {btnClose && (
        <button className="btn-close" onClick={onClick}>
          <AiOutlineClose />
        </button>
      )}
    </div>
  );
}

export default OwnOverlay;
