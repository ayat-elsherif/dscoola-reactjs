import './style.scss';
import { WalletCard } from './Cards';
import { InvoicesTable } from './table';
import { useGetWalletInfo } from './hooks';
import { Loading } from '../../../../../components/common/Loading';

export const Mywallet = () => {
  const { data } = useGetWalletInfo();

  if (!data?.data) return <Loading />;

  return (
    <div className="wallet-wrapper">
      <div className="wallet-header flex-center">
        <div>
          <h2>My Wallet</h2>
          <p>Here you can check your balance</p>
        </div>
        <button className="main-btn-dashboard">Withdraw</button>
      </div>

      <div className="wallet-cards-wrapper flex-center">
        <WalletCard title="Total Balance" amount={data?.data?.totalBlance} />
        <WalletCard title="On Hold Balance" amount={data?.data?.holdBlance} />
        <WalletCard
          title="Available Balance"
          amount={data?.data?.availableBlance}
        />
      </div>
      <div className="transactions-list">
        <p>All Transactions</p>
        <InvoicesTable data={data?.data?.transactions} />
      </div>
    </div>
  );
};
