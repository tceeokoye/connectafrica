"use client";

import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import { useState, useEffect } from "react";
import { useHttp } from "@/hooks/useHttp";
import {
  DollarSign,
  Users,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
  CheckCircle,
  AlertCircle,
  Layers,
} from "lucide-react";

const Dashboard = () => {
  const { sendRequest } = useHttp();
  const [stats, setStats] = useState<any[]>([]);
  const [recentDonations, setRecentDonations] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        setError(null);

        // Fetch dashboard stats
        const statsResponse = await sendRequest({
          url: "/api/v1/admin/dashboard/stats",
          method: "GET",
        });

        if (statsResponse.success) {
          const data = statsResponse.data;
          const statsData = [
            {
              title: "Total Donations",
              value: `₦${(data.totalDonations || 0).toLocaleString()}`,
              change: `${data.donationGrowth >= 0 ? '+' : ''}${data.donationGrowth.toFixed(1)}%`,
              trend: data.donationGrowth >= 0 ? "up" : "down",
              icon: DollarSign,
            },
            {
              title: "Active Campaigns",
              value: data.activeCampaigns || "0",
              change: `of ${data.totalCampaigns || "0"}`,
              trend: "up",
              icon: CheckCircle,
            },
            {
              title: "Expired Campaigns",
              value: data.expiredCampaigns || "0",
              change: `of ${data.totalCampaigns || "0"}`,
              trend: "down",
              icon: AlertCircle,
            },
            {
              title: "Total Campaigns",
              value: data.totalCampaigns || "0",
              change: `${(data.activeCampaigns || 0) + (data.expiredCampaigns || 0) ? "Ongoing projects" : "No campaigns"}`,
              trend: data.totalCampaigns > 0 ? "up" : "down",
              icon: Layers,
            },
            {
              title: "Subscribers",
              value: (data.totalSubscribers || 0).toLocaleString(),
              change: `${data.subscriberGrowth >= 0 ? '+' : ''}${data.subscriberGrowth.toFixed(1)}%`,
              trend: data.subscriberGrowth >= 0 ? "up" : "down",
              icon: Users,
            },
          ];
          setStats(statsData);
        }

        // Fetch recent donations
        const donationsResponse = await sendRequest({
          url: "/api/v1/admin/donations/get",
          method: "GET",
          params: { limit: 5, skip: 0 },
        });

        if (donationsResponse.success) {
          const formattedDonations = donationsResponse.data.map((donation: any) => ({
            id: donation._id,
            name: donation.name,
            amount: `₦${(donation.amount || 0).toLocaleString()}`,
            date: new Date(donation.createdAt).toLocaleDateString('en-US', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            }),
            campaign: donation.designation === "medical-container" ? "Medical Container" : "General Fund",
          }));
          setRecentDonations(formattedDonations);
        }
      } catch (err: any) {
        console.error("Failed to fetch dashboard data:", err);
        setError(err?.message || "Failed to fetch dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, [sendRequest]);

  if (loading) {
    return (
      <AdminLayout>
        <div className="flex items-center justify-center h-screen">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </AdminLayout>
    );
  }

  if (error) {
    return (
      <AdminLayout>
        <div className="space-y-8">
          <div className="bg-destructive/10 border border-destructive/50 text-destructive p-4 rounded-lg">
            <p>Error loading dashboard: {error}</p>
          </div>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground">
            Dashboard
          </h1>
          <p className="text-muted-foreground mt-1">
            Welcome back! Here's what's happening with Connect with Africa.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-card p-6 rounded-xl border border-border"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <span
                  className={`flex items-center text-sm font-medium ${
                    stat.trend === "up" ? "text-accent" : "text-destructive"
                  }`}
                >
                  {stat.change}
                  {stat.trend === "up" ? (
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                  ) : (
                    <ArrowDownRight className="w-4 h-4 ml-1" />
                  )}
                </span>
              </div>
              <div className="font-display text-2xl font-bold text-foreground">
                {stat.value}
              </div>
              <div className="text-muted-foreground text-sm">{stat.title}</div>
            </motion.div>
          ))}
        </div>

        {/* Recent Donations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-card rounded-xl border border-border"
        >
          <div className="p-6 border-b border-border">
            <h2 className="font-display text-xl font-bold text-foreground">
              Recent Donations
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Donor
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Amount
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Campaign
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Date
                  </th>
                </tr>
              </thead>
              <tbody>
                {recentDonations.map((donation, index) => (
                  <motion.tr
                    key={donation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 + index * 0.05 }}
                    className="border-b border-border last:border-0"
                  >
                    <td className="p-4 text-foreground">{donation.name}</td>
                    <td className="p-4 text-primary font-semibold">
                      {donation.amount}
                    </td>
                    <td className="p-4 text-muted-foreground">{donation.campaign}</td>
                    <td className="p-4 text-muted-foreground">{donation.date}</td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          {[
            { title: "Add New Project", description: "Create a new campaign or initiative" },
            { title: "Export Reports", description: "Download donation and activity reports" },
            { title: "Send Newsletter", description: "Communicate with your subscribers" },
          ].map((action, index) => (
            <div
              key={index}
              className="bg-card p-6 rounded-xl border border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <h3 className="font-semibold text-foreground mb-1">{action.title}</h3>
              <p className="text-muted-foreground text-sm">{action.description}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </AdminLayout>
  );
};

export default Dashboard;