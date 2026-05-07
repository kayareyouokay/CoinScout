import { ExternalLink } from "lucide-react";
import Link from "next/link";

function firstAvailable(values: string[]) {
  return values.find(Boolean);
}

export function CoinDetails({ coin }: { coin: CoinDetailsData }) {
  const homepage = firstAvailable(coin.links.homepage);
  const blockchain = firstAvailable(coin.links.blockchain_site);

  return (
    <section className="details">
      <h4>Details</h4>
      <ul className="details-grid">
        <li>
          <span className="label">Homepage</span>
          {homepage ? (
            <Link className="link" href={homepage} target="_blank" rel="noreferrer">
              Website <ExternalLink width={16} height={16} />
            </Link>
          ) : <span>Unavailable</span>}
        </li>
        <li>
          <span className="label">Blockchain</span>
          {blockchain ? (
            <Link className="link" href={blockchain} target="_blank" rel="noreferrer">
              Explorer <ExternalLink width={16} height={16} />
            </Link>
          ) : <span>Unavailable</span>}
        </li>
        <li>
          <span className="label">Community</span>
          {coin.links.subreddit_url ? (
            <Link className="link" href={coin.links.subreddit_url} target="_blank" rel="noreferrer">
              Reddit <ExternalLink width={16} height={16} />
            </Link>
          ) : <span>Unavailable</span>}
        </li>
      </ul>
    </section>
  );
}
