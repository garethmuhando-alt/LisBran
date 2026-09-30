import Link from "next/link";
import { PageHeader } from "@/components/ui/PageHeader";

const earn = [
  { action: "Complete your profile", tokens: 500 },
  { action: "Answer a feedback survey", tokens: "50–150" },
  { action: "Rate a supplier after a job", tokens: 100 },
  { action: "Sign in on consecutive days", tokens: 50 },
];

const redeem = [
  { item: "KES 500 shopping voucher", cost: "2,000" },
  { item: "LisBran key holder", cost: "1,000" },
  { item: "LisBran T-shirt", cost: "5,000" },
];

export default function RewardsPage() {
  return (
    <div>
      <PageHeader title="Rewards" parent={{ href: "/profile", label: "Account" }} description="Earn tokens for helping the marketplace work, then swap them for vouchers and merchandise." />
      <div className="wrap pb-16">
        <p className="mb-8 inline-block border-[1.5px] border-cord text-cord px-3 py-1.5 text-sm font-semibold">Coming soon. Tokens start counting when accounts open.</p>
        <div className="grid grid-cols-12 gap-y-10 lg:gap-x-[2.5vw]">
          <section className="col-span-12 lg:col-span-6" aria-labelledby="earn">
            <h2 id="earn" className="font-display text-2xl mb-2">How you&apos;ll earn</h2>
            <table className="w-full text-left rod-top">
              <tbody>
                {earn.map((e) => (
                  <tr key={e.action} className="border-b border-rod-soft">
                    <td className="py-3">{e.action}</td>
                    <td className="py-3 text-right font-mono tabular">+{e.tokens}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
          <section className="col-span-12 lg:col-span-6" aria-labelledby="redeem">
            <h2 id="redeem" className="font-display text-2xl mb-2">What you&apos;ll redeem</h2>
            <table className="w-full text-left rod-top">
              <tbody>
                {redeem.map((r) => (
                  <tr key={r.item} className="border-b border-rod-soft">
                    <td className="py-3">{r.item}</td>
                    <td className="py-3 text-right font-mono tabular">{r.cost} tokens</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>
        <p className="mt-10 text-ink-2">Want to start early? <Link href="/surveys" className="underline text-ink hover:text-cord">Answer a survey</Link> and we&apos;ll credit you when accounts open.</p>
      </div>
    </div>
  );
}
