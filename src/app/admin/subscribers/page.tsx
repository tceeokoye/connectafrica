"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import  AdminLayout  from "@/components/AdminLayout";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Download, Mail, Trash2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Subscribers() {
  const { toast } = useToast();
  const [subscribers, setSubscribers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const filteredSubscribers = subscribers.filter((sub) => {
    const matchesSearch =
      sub.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sub.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      filterStatus === "all" || sub.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const activeCount = subscribers.filter((s) => s.status === "active").length;

  const fetchSubscribers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch('/api/v1/admin/subscribers/get?limit=500');
      const data = await res.json();
      if (data.success) {
        // map to expected shape
        const mapped = data.data.map((s: any, i: number) => ({
          id: s._id || i,
          email: s.email,
          name: s.name || '',
          date: s.subscribedAt ? new Date(s.subscribedAt).toLocaleDateString() : '',
          status: s.status || 'active'
        }));
        setSubscribers(mapped);
      } else {
        setError(data.message || 'Failed to load subscribers');
      }
    } catch (err: any) {
      console.error('Fetch subscribers error:', err);
      setError(err?.message || 'Failed to load subscribers');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (subscriberIdOrEmail: any) => {
    const email = typeof subscriberIdOrEmail === 'string' ? subscriberIdOrEmail : (subscriberIdOrEmail.email || '');
    try {
      const encoded = encodeURIComponent(email);
      const res = await fetch(`/api/v1/admin/subscribers/delete/${encoded}`, { method: 'DELETE' });
      const data = await res.json();
      if (data.success) {
        toast({ title: 'Subscriber Removed', description: data.message });
        fetchSubscribers();
      } else {
        toast({ title: 'Error', description: data.message || 'Failed to remove subscriber', variant: 'destructive' });
      }
    } catch (err: any) {
      console.error('Delete subscriber error', err);
      toast({ title: 'Error', description: err?.message || 'Failed to remove subscriber', variant: 'destructive' });
    }
  };

  useEffect(() => { fetchSubscribers(); }, []);

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
              Subscribers
            </h1>
            <p className="text-muted-foreground mt-1">
              Manage your newsletter subscribers
            </p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">
              <Download className="w-5 h-5 mr-2" />
              Export
            </Button>
            <Button className="bg-primary">
              <Mail className="w-5 h-5 mr-2" />
              Send Newsletter
            </Button>
          </div>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid sm:grid-cols-3 gap-6"
        >
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="text-muted-foreground text-sm">Total Subscribers</div>
            <div className="font-display text-2xl font-bold text-foreground mt-1">
              {subscribers.length}
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="text-muted-foreground text-sm">Active</div>
            <div className="font-display text-2xl font-bold text-accent mt-1">
              {activeCount}
            </div>
          </div>
          <div className="bg-card p-6 rounded-xl border border-border">
            <div className="text-muted-foreground text-sm">Unsubscribed</div>
            <div className="font-display text-2xl font-bold text-muted-foreground mt-1">
              {subscribers.length - activeCount}
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
          <select
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
            className="h-10 px-3 rounded-md border border-input bg-background"
          >
            <option value="all">All Status</option>
            <option value="active">Active</option>
            <option value="unsubscribed">Unsubscribed</option>
          </select>
        </motion.div>

        {/* Subscribers Table */}
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
                    Name
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Email
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Subscribed
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Status
                  </th>
                  <th className="text-left p-4 text-sm font-medium text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredSubscribers.map((subscriber, index) => (
                  <motion.tr
                    key={subscriber.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 + index * 0.03 }}
                    className="border-b border-border last:border-0 hover:bg-muted/30 transition-colors"
                  >
                    <td className="p-4 text-foreground font-medium">
                      {subscriber.name}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {subscriber.email}
                    </td>
                    <td className="p-4 text-muted-foreground">
                      {subscriber.date}
                    </td>
                    <td className="p-4">
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          subscriber.status === "active"
                            ? "bg-accent/10 text-accent"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {subscriber.status}
                      </span>
                    </td>
                    <td className="p-4">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(subscriber.id)}
                        className="text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
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

