"use client";

import { useCallback, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { Check, LogOut, X } from "lucide-react";
import { PageHeader } from "@/components/ui/PageHeader";
import { serviceBySlug } from "@/lib/catalog";
import { supabase } from "@/lib/supabase";

// Security model
// - Sign-in is Supabase Auth (email + password). Admin accounts are created in
//   the Supabase dashboard and given app_metadata.role = "admin", which users
//   cannot set on themselves.
// - The role check below only decides what this page shows. The real gate is
//   Row Level Security on `vendors` (supabase/migrations/*_vendors_rls.sql):
//   without the admin claim, reads of unverified vendors, updates and deletes
//   are refused by the database.

type Vendor = { id: string; business_name: string; category?: string; email?: string; phone?: string; city?: string; created_at?: string };

const isAdmin = (s: Session | null) => s?.user?.app_metadata?.role === "admin";

export default function AdminPage() {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(!supabase);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const [pending, setPending] = useState<Vendor[]>([]);
  const [counts, setCounts] = useState<{ live: number | null; pending: number | null }>({ live: null, pending: null });

  useEffect(() => {
    if (!supabase) return;
    supabase.auth.getSession().then(({ data }) => { setSession(data.session); setReady(true); });
    const { data: sub } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => sub.subscription.unsubscribe();
  }, []);

  const load = useCallback(async () => {
    if (!supabase) return;
    const [list, live, waiting] = await Promise.all([
      supabase.from("vendors").select("id,business_name,category,email,phone,city,created_at").eq("verified", false).order("created_at", { ascending: true }),
      supabase.from("vendors").select("id", { count: "exact", head: true }).eq("verified", true),
      supabase.from("vendors").select("id", { count: "exact", head: true }).eq("verified", false),
    ]);
    if (list.error) setError(list.error.message);
    setPending((list.data as Vendor[]) ?? []);
    setCounts({ live: live.count ?? null, pending: waiting.count ?? null });
  }, []);

  useEffect(() => {
    if (!isAdmin(session)) return;
    const id = requestAnimationFrame(() => { void load(); });
    return () => cancelAnimationFrame(id);
  }, [session, load]);

  const signIn = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!supabase) return;
    setBusy(true);
    setError("");
    const { data, error: err } = await supabase.auth.signInWithPassword({ email, password });
    if (err) setError("Those details didn't work.");
    else if (!isAdmin(data.session)) {
      await supabase.auth.signOut();
      setError("This account doesn't have admin access.");
    }
    setPassword("");
    setBusy(false);
  };

  const decide = async (v: Vendor, approve: boolean) => {
    if (!supabase) return;
    if (!approve && !window.confirm(`Reject and remove the application from ${v.business_name}? This can't be undone.`)) return;
    setError("");
    const res = approve
      ? await supabase.from("vendors").update({ verified: true }).eq("id", v.id)
      : await supabase.from("vendors").delete().eq("id", v.id);
    if (res.error) { setError(res.error.message); return; }
    await load();
  };

  if (!ready) return <div className="wrap py-16 text-ink-3">Loading…</div>;

  if (!supabase) {
    return (
      <div>
        <PageHeader title="Admin" />
        <div className="wrap pb-16 max-w-xl">
          <p className="text-ink-2">Admin sign-in isn&apos;t available right now. If you&apos;re on the LisBran team, contact the site administrator.</p>
        </div>
      </div>
    );
  }

  if (!isAdmin(session)) {
    return (
      <div>
        <PageHeader title="Admin sign in" description="For the LisBran team only." />
        <form onSubmit={signIn} className="wrap pb-16 max-w-md flex flex-col gap-4">
          <div>
            <label htmlFor="admin-email" className="block text-sm font-semibold text-ink-2 mb-1.5">Email</label>
            <input id="admin-email" type="email" required autoComplete="username" value={email} onChange={(e) => setEmail(e.target.value)} className="min-h-12 w-full bg-surface border-[1.5px] border-rod px-3 focus:outline-none focus:border-cord" />
          </div>
          <div>
            <label htmlFor="admin-password" className="block text-sm font-semibold text-ink-2 mb-1.5">Password</label>
            <input id="admin-password" type="password" required autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} className="min-h-12 w-full bg-surface border-[1.5px] border-rod px-3 focus:outline-none focus:border-cord" />
          </div>
          {error && <p role="alert" className="text-sm font-semibold text-cord">{error}</p>}
          <button type="submit" disabled={busy} className="self-start min-h-12 px-6 bg-ink text-ground font-bold hover:bg-cord hover:text-cord-ink disabled:opacity-50">
            {busy ? "Signing in…" : "Sign in"}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div>
      <PageHeader title="Admin" description={`Signed in as ${session?.user.email}`}>
        <button type="button" onClick={() => supabase!.auth.signOut()} className="inline-flex min-h-11 items-center gap-2 px-4 border-[1.5px] border-rod font-bold hover:bg-ink hover:text-ground">
          <LogOut size={16} /> Sign out
        </button>
      </PageHeader>

      <div className="wrap pb-16 flex flex-col gap-10">
        <dl className="grid grid-cols-2 max-w-md border-[1.5px] border-rod">
          <div className="p-4 border-r-[1.5px] border-rod"><dt className="text-sm text-ink-3">Live suppliers</dt><dd className="font-mono tabular text-3xl mt-1">{counts.live ?? "–"}</dd></div>
          <div className="p-4"><dt className="text-sm text-ink-3">Waiting for review</dt><dd className="font-mono tabular text-3xl mt-1">{counts.pending ?? "–"}</dd></div>
        </dl>

        <section aria-labelledby="queue">
          <h2 id="queue" className="font-display text-3xl rod-top pt-3 mb-2">Applications</h2>
          {error && <p role="alert" className="text-sm font-semibold text-cord mb-2">{error}</p>}
          {pending.length === 0 ? (
            <p className="py-6 text-ink-2">No applications waiting.</p>
          ) : (
            <ul>
              {pending.map((v) => (
                <li key={v.id} className="border-b border-rod-soft py-4 grid grid-cols-1 md:grid-cols-[1fr_auto] gap-3 md:items-center">
                  <div className="min-w-0">
                    <p className="font-semibold">{v.business_name}</p>
                    <p className="text-sm text-ink-2 break-words">
                      {serviceBySlug(v.category ?? "")?.name ?? v.category ?? "No service"} · {v.city ?? "No city"} · {v.email} · <span className="font-mono tabular">{v.phone}</span>
                    </p>
                    {v.created_at && <p className="text-xs text-ink-3 font-mono tabular">{new Date(v.created_at).toLocaleString("en-KE", { dateStyle: "medium", timeStyle: "short" })}</p>}
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={() => decide(v, false)} className="min-h-10 px-4 inline-flex items-center gap-1.5 border-[1.5px] border-rod text-sm font-semibold hover:bg-ink hover:text-ground"><X size={15} /> Reject</button>
                    <button type="button" onClick={() => decide(v, true)} className="min-h-10 px-4 inline-flex items-center gap-1.5 bg-cord text-cord-ink text-sm font-bold hover:brightness-110"><Check size={15} /> Approve</button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
