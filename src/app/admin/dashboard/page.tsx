"use client";


import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import {
  DollarSign,
  Users,
  FileText,
  TrendingUp,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";

const stats = [
  {
    title: "Total Donations",
    value: "$45,500",
    change: "+12.5%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Active Projects",
    value: "4",
    change: "+1",
    trend: "up",
    icon: FileText,
  },
  {
    title: "Subscribers",
    value: "1,234",
    change: "+8.2%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Monthly Growth",
    value: "23%",
    change: "+5.1%",
    trend: "up",
    icon: TrendingUp,
  },
];

const recentDonations = [
  { id: 1, name: "John Smith", amount: "$250", date: "2024-01-15", campaign: "Medical Container" },
  { id: 2, name: "Sarah Johnson", amount: "$100", date: "2024-01-14", campaign: "General Fund" },
  { id: 3, name: "Michael Brown", amount: "$50", date: "2024-01-14", campaign: "Healthcare Support" },
  { id: 4, name: "Emily Davis", amount: "$500", date: "2024-01-13", campaign: "Medical Container" },
  { id: 5, name: "Robert Wilson", amount: "$75", date: "2024-01-12", campaign: "General Fund" },
];

const Dashboard = () => {
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