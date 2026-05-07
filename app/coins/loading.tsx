import { DataTable } from "@/components/DataTable";

export default function LoadingCoins() {
  const rows = Array.from({ length: 10 }, (_, id) => ({ id }));
  const columns: DataTableColumn<{ id: number }>[] = [
    { header: '#', cell: () => <div className="h-4 w-8 rounded bg-dark-400 animate-pulse" /> },
    { header: 'Token', cell: () => <div className="h-5 w-40 rounded bg-dark-400 animate-pulse" /> },
    { header: 'Price', cell: () => <div className="h-4 w-24 rounded bg-dark-400 animate-pulse" /> },
    { header: '24h', cell: () => <div className="h-4 w-20 rounded bg-dark-400 animate-pulse" /> },
    { header: 'Market Cap', cell: () => <div className="h-4 w-24 rounded bg-dark-400 animate-pulse" /> },
    { header: 'Volume', cell: () => <div className="h-4 w-24 rounded bg-dark-400 animate-pulse" /> },
  ];

  return (
    <main id="coins-page">
      <div className="content">
        <div>
          <p className="text-sm text-purple-100">Market screener</p>
          <h4>All Coins</h4>
        </div>
        <DataTable columns={columns} data={rows} rowKey={(row) => row.id} tableClassName="coins-table" />
      </div>
    </main>
  );
}
