"use client";

import { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import {
  Search,
  Download,
  Filter,
  CheckCircle2,
  Clock,
  XCircle,
  DollarSign,
  Users,
  TrendingUp,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";

interface DonationRecord {
  id: string;
  name: string;
  email: string;
  amount: number;
  campaign: string;
  date: string;
  status: "completed" | "pending" | "failed" | string;
  reference?: string;
  rawDate?: string;
}

export default function Donations() {
  const [donations, setDonations] = useState<DonationRecord[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCampaign, setFilterCampaign] = useState("all");
  const [statusTab, setStatusTab] = useState<"completed" | "pending" | "all">("completed");

  useEffect(() => {
    fetchDonations();
  }, []);

  async function fetchDonations() {
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/v1/admin/donations/get?limit=1000");
      const json = await res.json();
      if (json.success) {
        const mapped: DonationRecord[] = json.data.map((d: any) => ({
          id: d._id,
          name: d.name || `${d.firstName || ""} ${d.lastName || ""}`.trim() || "Anonymous",
          email: d.email || "—",
          amount: Number(d.amount) || 0,
          campaign: d.designation && d.designation !== "where-most-needed"
            ? d.designation
            : d.campaignTitle || "General Fund",
          date: d.createdAt ? new Date(d.createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          }) : "—",
          rawDate: d.createdAt,
          status: d.status || "pending",
          reference: d.reference || d.stripeSessionId,
        }));
        setDonations(mapped);
      } else {
        setError(json.message || "Failed to load donations");
      }
    } catch (err: any) {
      console.error("Fetch donations error:", err);
      setError(err?.message || "Failed to load donations");
    } finally {
      setLoading(false);
    }
  }

  // Calculate stats strictly on COMPLETED / PAID donations
  const completedDonations = useMemo(
    () => donations.filter((d) => d.status === "completed"),
    [donations]
  );
  const pendingDonations = useMemo(
    () => donations.filter((d) => d.status === "pending"),
    [donations]
  );

  const totalCompletedAmount = useMemo(
    () => completedDonations.reduce((sum, d) => sum + (d.amount || 0), 0),
    [completedDonations]
  );

  const avgCompletedDonation = useMemo(
    () => (completedDonations.length > 0 ? Math.round(totalCompletedAmount / completedDonations.length) : 0),
    [completedDonations, totalCompletedAmount]
  );

  // Filter list based on search, campaign, and status tab
  const filteredDonations = useMemo(() => {
    return donations.filter((donation) => {
      const matchesSearch =
        donation.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        donation.reference?.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesCampaign =
        filterCampaign === "all" || donation.campaign.toLowerCase() === filterCampaign.toLowerCase();

      const matchesStatus =
        statusTab === "all" || donation.status === statusTab;

      return matchesSearch && matchesCampaign && matchesStatus;
    });
  }, [donations, searchTerm, filterCampaign, statusTab]);

  // Export to CSV
  const handleExportCSV = () => {
    if (filteredDonations.length === 0) return;
    const headers = ["Donor Name", "Email", "Amount ($)", "Campaign/Designation", "Date", "Status", "Reference"];
    const rows = filteredDonations.map((d) => [
      `"${d.name.replace(/"/g, '""')}"`,
      `"${d.email.replace(/"/g, '""')}"`,
      d.amount,
      `"${d.campaign.replace(/"/g, '""')}"`,
      `"${d.date}"`,
      `"${d.status}"`,
      `"${d.reference || ""}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `donations_export_${statusTab}_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="font-display text-3xl font-bold text-foreground">
              Donations & Transactions
            </h1>
            <p className="text-muted-foreground mt-1 text-sm">
              Track confirmed donations and checkout activity
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={fetchDonations} disabled={loading}>
              <RefreshCw className={`w-4 h-4 mr-1.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={handleExportCSV}
              disabled={filteredDonations.length === 0}
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export CSV
            </Button>
          </div>
        </motion.div>

        {/* Stats Cards (Accurate metrics based strictly on COMPLETED donations) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-bold uppercase tracking-wider">
              <span>Total Received</span>
              <DollarSign className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-display text-3xl font-extrabold text-foreground mt-2">
              ${totalCompletedAmount.toLocaleString()}
            </div>
            <p className="text-xs text-emerald-600 mt-1 font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" /> Verified payments only
            </p>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-bold uppercase tracking-wider">
              <span>Completed Donors</span>
              <Users className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-display text-3xl font-extrabold text-foreground mt-2">
              {completedDonations.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Successful transactions
            </p>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-bold uppercase tracking-wider">
              <span>Average Donation</span>
              <TrendingUp className="w-4 h-4 text-emerald-600" />
            </div>
            <div className="font-display text-3xl font-extrabold text-foreground mt-2">
              ${avgCompletedDonation.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Per completed donation
            </p>
          </div>

          <div className="bg-card p-5 rounded-2xl border border-border shadow-sm">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-bold uppercase tracking-wider">
              <span>Pending / Incomplete</span>
              <Clock className="w-4 h-4 text-amber-500" />
            </div>
            <div className="font-display text-3xl font-extrabold text-amber-600 dark:text-amber-400 mt-2">
              {pendingDonations.length}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Sessions started on Stripe
            </p>
          </div>
        </motion.div>

        {/* Status Filter Tabs */}
        <div className="flex items-center gap-2 p-1.5 bg-muted/60 rounded-2xl border border-border w-fit max-w-full overflow-x-auto">
          <button
            onClick={() => setStatusTab("completed")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              statusTab === "completed"
                ? "bg-emerald-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <CheckCircle2 className="w-4 h-4" />
            Completed (Paid) ({completedDonations.length})
          </button>
          <button
            onClick={() => setStatusTab("pending")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              statusTab === "pending"
                ? "bg-amber-600 text-white shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Clock className="w-4 h-4" />
            Pending / Incomplete ({pendingDonations.length})
          </button>
          <button
            onClick={() => setStatusTab("all")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all whitespace-nowrap ${
              statusTab === "all"
                ? "bg-foreground text-background shadow-sm"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            All Activity ({donations.length})
          </button>
        </div>

        {/* Search & Campaign Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search by donor name, email, or reference..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 rounded-xl"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <select
              value={filterCampaign}
              onChange={(e) => setFilterCampaign(e.target.value)}
              className="h-10 px-3.5 rounded-xl border border-input bg-card text-foreground text-sm font-medium focus:outline-none focus:ring-2 focus:ring-ring"
            >
              <option value="all">All Causes / Campaigns</option>
              <option value="General Fund">General Fund</option>
              <option value="Medical Container">Medical Container</option>
              <option value="Healthcare Support">Healthcare Support</option>
            </select>
          </div>
        </motion.div>

        {/* Donations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm"
        >
          {loading ? (
            <div className="p-12 text-center text-muted-foreground">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2 text-emerald-600" />
              Loading donations...
            </div>
          ) : error ? (
            <div className="p-12 text-center text-red-600">{error}</div>
          ) : filteredDonations.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground">
              <p className="text-base font-semibold">No transactions found</p>
              <p className="text-xs mt-1">
                {statusTab === "completed"
                  ? "No completed donations match your current filters."
                  : statusTab === "pending"
                  ? "No pending checkout sessions found."
                  : "No donation activity recorded yet."}
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead className="bg-muted/60 border-b border-border text-xs uppercase tracking-wider font-bold text-muted-foreground">
                  <tr>
                    <th className="p-4">Donor</th>
                    <th className="p-4">Email</th>
                    <th className="p-4">Amount</th>
                    <th className="p-4">Cause / Campaign</th>
                    <th className="p-4">Date</th>
                    <th className="p-4">Payment Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border text-sm">
                  {filteredDonations.map((donation, index) => {
                    const isCompleted = donation.status === "completed";
                    const isPending = donation.status === "pending";

                    return (
                      <motion.tr
                        key={donation.id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: index * 0.02 }}
                        className="hover:bg-muted/30 transition-colors"
                      >
                        <td className="p-4 font-semibold text-foreground">
                          {donation.name}
                        </td>
                        <td className="p-4 text-muted-foreground">
                          {donation.email}
                        </td>
                        <td className="p-4">
                          <span
                            className={`font-bold text-base ${
                              isCompleted
                                ? "text-emerald-600 dark:text-emerald-400"
                                : "text-muted-foreground line-through opacity-70"
                            }`}
                          >
                            ${donation.amount.toLocaleString()}
                          </span>
                        </td>
                        <td className="p-4">
                          <span className="px-2.5 py-1 rounded-lg text-xs font-medium bg-muted text-foreground">
                            {donation.campaign}
                          </span>
                        </td>
                        <td className="p-4 text-muted-foreground whitespace-nowrap">
                          {donation.date}
                        </td>
                        <td className="p-4">
                          {isCompleted ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800">
                              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                              Completed (Paid)
                            </span>
                          ) : isPending ? (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-300 border border-amber-300 dark:border-amber-800" title="User initiated checkout on Stripe but has not completed payment yet">
                              <Clock className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                              Pending Checkout
                            </span>
                          ) : (
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 border border-red-300">
                              <XCircle className="w-3.5 h-3.5 text-red-600" />
                              {donation.status}
                            </span>
                          )}
                        </td>
                      </motion.tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </motion.div>
      </div>
    </AdminLayout>
  );
}

