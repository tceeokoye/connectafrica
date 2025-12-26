"use client";


import { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import { Search, Download, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const donations = [
  { id: 1, name: "John Smith", email: "john@email.com", amount: 250, campaign: "Medical Container", date: "2024-01-15", status: "completed" },
  { id: 2, name: "Sarah Johnson", email: "sarah@email.com", amount: 100, campaign: "General Fund", date: "2024-01-14", status: "completed" },
  { id: 3, name: "Michael Brown", email: "michael@email.com", amount: 50, campaign: "Healthcare Support", date: "2024-01-14", status: "completed" },
  { id: 4, name: "Emily Davis", email: "emily@email.com", amount: 500, campaign: "Medical Container", date: "2024-01-13", status: "completed" },
  { id: 5, name: "Robert Wilson", email: "robert@email.com", amount: 75, campaign: "General Fund", date: "2024-01-12", status: "completed" },
  { id: 6, name: "Jennifer Lee", email: "jennifer@email.com", amount: 150, campaign: "Medical Container", date: "2024-01-11", status: "completed" },
  { id: 7, name: "David Martinez", email: "david@email.com", amount: 200, campaign: "Healthcare Support", date: "2024-01-10", status: "completed" },
  { id: 8, name: "Lisa Anderson", email: "lisa@email.com", amount: 1000, campaign: "Medical Container", date: "2024-01-09", status: "completed" },
];


export default function Donations() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCampaign, setFilterCampaign] = useState("all");

  const filteredDonations = donations.filter((donation) => {
    const matchesSearch =
      donation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      donation.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCampaign =
      filterCampaign === "all" || donation.campaign === filterCampaign;
    return matchesSearch && matchesCampaign;
  });

  const totalDonations = filteredDonations.reduce((sum, d) => sum + d.amount, 0);

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
              Donations
            </h1>
            <p className="text-muted-foreground mt-1">
              Track and manage all donations
            </p>
          </div>
          <Button variant="outline">
            <Download className="w-5 h-5 mr-2" />
            Export CSV
          </Button>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="text-muted-foreground text-sm">Total Donations</div>
            <div className="font-display text-2xl font-bold text-foreground mt-1">
              ${totalDonations.toLocaleString()}
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="text-muted-foreground text-sm">Number of Donors</div>
            <div className="font-display text-2xl font-bold text-foreground mt-1">
              {filteredDonations.length}
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="text-muted-foreground text-sm">Average Donation</div>
            <div className="font-display text-2xl font-bold text-foreground mt-1">
              ${Math.round(totalDonations / filteredDonations.length || 0)}
            </div>
          </div>
        </motion.div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <Input
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-muted-foreground" />
            <select
              value={filterCampaign}
              onChange={(e) => setFilterCampaign(e.target.value)}
              className="h-10 px-3 rounded-md border border-input bg-background"
            >
              <option value="all">All Campaigns</option>
              <option value="Medical Container">Medical Container</option>
              <option value="Healthcare Support">Healthcare Support</option>
              <option value="General Fund">General Fund</option>
            </select>
          </div>
        </motion.div>

        {/* Donations Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card rounded-xl border border-border overflow-hidden"
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Donor
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Email
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
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredDonations.map((donation, index) => (
                  <motion.tr
                    key={donation.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 text-foreground font-medium">
                      {donation.name}
                    </td>
                    <td className="p-4 text-muted-foreground">{donation.email}</td>
                    <td className="p-4 text-primary font-semibold">
                      ${donation.amount}
                    </td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-secondary text-secondary-foreground">
                        {donation.campaign}
                      </span>
                    </td>
                    <td className="p-4 text-muted-foreground">{donation.date}</td>
                    <td className="p-4">
                      <span className="px-2 py-1 rounded-full text-xs bg-accent/10 text-accent">
                        {donation.status}
                      </span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </AdminLayout>
  );
};
