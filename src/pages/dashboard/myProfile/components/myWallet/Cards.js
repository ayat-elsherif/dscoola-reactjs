import { CircleDollarSign } from '../../../../../assets/svg';

export const WalletCard = ({ title, amount }) => {
  return (
    <div className="wallet-cards flex-center">
      <div>
        <p>{title}</p>
        <span>{amount}</span>
      </div>
      <span className="card-icon">
        <CircleDollarSign />
      </span>
    </div>
  );
};
