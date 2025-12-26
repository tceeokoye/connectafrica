"use client";


import { useState } from "react";
import { motion } from "framer-motion";
import AdminLayout from "@/components/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Save, Globe, Mail, Bell } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export default function Setting() {
  const { toast } = useToast();
  const [settings, setSettings] = useState({
    siteName: "Connect with Africa",
    siteDescription: "Bridging global generosity with local needs across African communities.",
    email: "connectwithafrica@gmail.com",
    phone: "",
    address: "United States",
    socialFacebook: "",
    socialTwitter: "",
    socialInstagram: "",
    socialLinkedin: "",
    notifyDonations: true,
    notifySubscribers: true,
    notifyMessages: true,
  });

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Your settings have been updated successfully.",
    });
  };

  return (
    <AdminLayout>
      <div className="space-y-8 max-w-3xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="font-display text-3xl font-bold text-foreground">
            Settings
          </h1>
          <p className="text-muted-foreground mt-1">
            Manage your site settings and preferences
          </p>
        </motion.div>

        {/* General Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-card p-6 rounded-xl border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">
              General Settings
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <Label htmlFor="siteName">Site Name</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) =>
                  setSettings({ ...settings, siteName: e.target.value })
                }
              />
            </div>

            <div>
              <Label htmlFor="siteDescription">Site Description</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) =>
                  setSettings({ ...settings, siteDescription: e.target.value })
                }
                rows={3}
              />
            </div>
          </div>
        </motion.div>

        {/* Contact Settings */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-card p-6 rounded-xl border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
              <Mail className="w-5 h-5 text-accent" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Contact Information
            </h2>
          </div>

          <div className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.email}
                  onChange={(e) =>
                    setSettings({ ...settings, email: e.target.value })
                  }
                />
              </div>
              <div>
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  type="tel"
                  value={settings.phone}
                  onChange={(e) =>
                    setSettings({ ...settings, phone: e.target.value })
                  }
                  placeholder="Optional"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) =>
                  setSettings({ ...settings, address: e.target.value })
                }
              />
            </div>
          </div>
        </motion.div>

        {/* Social Media */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-card p-6 rounded-xl border border-border"
        >
          <h2 className="font-display text-xl font-bold text-foreground mb-6">
            Social Media Links
          </h2>

          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="facebook">Facebook</Label>
              <Input
                id="facebook"
                value={settings.socialFacebook}
                onChange={(e) =>
                  setSettings({ ...settings, socialFacebook: e.target.value })
                }
                placeholder="https://facebook.com/..."
              />
            </div>
            <div>
              <Label htmlFor="twitter">Twitter</Label>
              <Input
                id="twitter"
                value={settings.socialTwitter}
                onChange={(e) =>
                  setSettings({ ...settings, socialTwitter: e.target.value })
                }
                placeholder="https://twitter.com/..."
              />
            </div>
            <div>
              <Label htmlFor="instagram">Instagram</Label>
              <Input
                id="instagram"
                value={settings.socialInstagram}
                onChange={(e) =>
                  setSettings({ ...settings, socialInstagram: e.target.value })
                }
                placeholder="https://instagram.com/..."
              />
            </div>
            <div>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input
                id="linkedin"
                value={settings.socialLinkedin}
                onChange={(e) =>
                  setSettings({ ...settings, socialLinkedin: e.target.value })
                }
                placeholder="https://linkedin.com/..."
              />
            </div>
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-card p-6 rounded-xl border border-border"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Bell className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-display text-xl font-bold text-foreground">
              Notifications
            </h2>
          </div>

          <div className="space-y-4">
            {[
              { key: "notifyDonations", label: "New Donation Notifications" },
              { key: "notifySubscribers", label: "New Subscriber Notifications" },
              { key: "notifyMessages", label: "Contact Form Notifications" },
            ].map((item) => (
              <label
                key={item.key}
                className="flex items-center justify-between p-4 bg-muted/30 rounded-lg cursor-pointer"
              >
                <span className="text-foreground">{item.label}</span>
                <input
                  type="checkbox"
                  checked={settings[item.key as keyof typeof settings] as boolean}
                  onChange={(e) =>
                    setSettings({ ...settings, [item.key]: e.target.checked })
                  }
                  className="w-5 h-5 rounded border-input text-primary focus:ring-primary"
                />
              </label>
            ))}
          </div>
        </motion.div>

        {/* Save Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Button onClick={handleSave} className="bg-primary">
            <Save className="w-5 h-5 mr-2" />
            Save Settings
          </Button>
        </motion.div>
      </div>
    </AdminLayout>
  );
};

