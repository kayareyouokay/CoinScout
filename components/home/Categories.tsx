import { DataTable } from "@/components/DataTable";
import { fetcher } from "@/lib/coingecko.actions";
import { cn, formatCompactNumber, formatCurrency, formatPercent } from "@/lib/utils";
import { TrendingDown, TrendingUp } from "lucide-react";
import Image from "next/image";
import { CategoriesFallback } from "../fallback";

export async function Categories() {
  let categories: Category[];

  try {
    categories = await fetcher<Category[]>('/coins/categories', undefined, 300);
  } catch (error) {
    console.error('Error fetching categories:', error);
    return <CategoriesFallback />;
  }

  const columns: DataTableColumn<Category>[] = [
    {
      header: 'Category',
      cellClassName: 'category-cell',
      cell: (category) => category.name,
    },
    {
      header: 'Top Coins',
      cellClassName: 'top-gainers-cell',
      cell: (category) => (
        <>
          {category.top_3_coins.slice(0, 3).map((coin) => (
            <Image key={coin} src={coin} alt="" width={28} height={28} />
          ))}
        </>
      ),
    },
    {
      header: '24h Change',
      cellClassName: 'change-cell',
      cell: (category) => {
        const isPositive = category.market_cap_change_24h >= 0;

        return (
          <span className={cn('flex items-center gap-1', isPositive ? 'text-green-500' : 'text-red-500')}>
            {isPositive ? <TrendingUp width={16} height={16} /> : <TrendingDown width={16} height={16} />}
            {formatPercent(category.market_cap_change_24h)}
          </span>
        );
      },
    },
    {
      header: 'Market Cap',
      cellClassName: 'market-cap-cell',
      cell: (category) => formatCurrency(category.market_cap),
    },
    {
      header: 'Volume',
      cellClassName: 'volume-cell',
      cell: (category) => formatCompactNumber(category.volume_24h),
    },
  ];

  return (
    <div id="categories">
      <h4>Categories</h4>
      <DataTable
        columns={columns}
        data={categories.slice(0, 8)}
        rowKey={(category) => category.name}
      />
    </div>
  );
}
