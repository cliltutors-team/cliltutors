"use client";

import { useTranslation } from "react-i18next";
import {
  User,
  Mail,
  Globe,
  BookOpen,
  Clock,
  Flame,
  LogOut,
  Loader2,
} from "lucide-react";
import { useState, useMemo } from "react";
import {
  useProfile,
  useUpdateProfile,
  useLogout,
} from "@/src/lib/queries/auth";
import { useRouter } from "next/navigation";

function ProfileForm({
  profile,
  onSave,
}: {
  profile: {
    first_name?: string;
    last_name?: string;
    email: string;
    preferred_language?: string;
  };
  onSave: (data: {
    first_name: string;
    last_name: string;
    email: string;
    preferred_language: "en" | "es" | "pt";
  }) => void;
}) {
  const { t, i18n } = useTranslation();
  const [saved, setSaved] = useState(false);

  const initialData = useMemo(
    () => ({
      firstName: profile.first_name || "",
      lastName: profile.last_name || "",
      email: profile.email,
      language: profile.preferred_language || "en",
    }),
    [profile],
  );

  const [editedFirstName, setEditedFirstName] = useState(initialData.firstName);
  const [editedLastName, setEditedLastName] = useState(initialData.lastName);
  const [editedEmail, setEditedEmail] = useState(initialData.email);
  const [editedLanguage, setEditedLanguage] = useState<string>(
    initialData.language,
  );

  const handleSave = () => {
    onSave({
      first_name: editedFirstName,
      last_name: editedLastName,
      email: editedEmail,
      preferred_language: editedLanguage as "en" | "es" | "pt",
    });
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="card space-y-4">
      <h2
        className="font-semibold text-base"
        style={{ color: "var(--color-brand-navy)" }}
      >
        {t("profile.editProfile") || "Edit Profile"}
      </h2>

      <div>
        <label
          className="text-sm font-medium flex items-center gap-2 mb-1.5"
          style={{ color: "var(--color-brand-navy)" }}
        >
          <User size={14} /> {t("profile.firstName") || "First Name"}
        </label>
        <input
          type="text"
          value={editedFirstName}
          onChange={(e) => setEditedFirstName(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border text-sm outline-none"
          style={{
            borderColor: "var(--color-gray-200)",
            background: "var(--color-gray-50)",
          }}
        />
      </div>

      <div>
        <label
          className="text-sm font-medium flex items-center gap-2 mb-1.5"
          style={{ color: "var(--color-brand-navy)" }}
        >
          <User size={14} /> {t("profile.lastName") || "Last Name"}
        </label>
        <input
          type="text"
          value={editedLastName}
          onChange={(e) => setEditedLastName(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border text-sm outline-none"
          style={{
            borderColor: "var(--color-gray-200)",
            background: "var(--color-gray-50)",
          }}
        />
      </div>

      <div>
        <label
          className="text-sm font-medium flex items-center gap-2 mb-1.5"
          style={{ color: "var(--color-brand-navy)" }}
        >
          <Mail size={14} /> {t("profile.email") || "Email"}
        </label>
        <input
          type="email"
          value={editedEmail}
          onChange={(e) => setEditedEmail(e.target.value)}
          className="w-full h-10 px-3 rounded-lg border text-sm outline-none"
          style={{
            borderColor: "var(--color-gray-200)",
            background: "var(--color-gray-50)",
          }}
        />
      </div>

      <div>
        <label
          className="text-sm font-medium flex items-center gap-2 mb-1.5"
          style={{ color: "var(--color-brand-navy)" }}
        >
          <Globe size={14} /> {t("profile.language") || "Language"}
        </label>
        <select
          value={editedLanguage}
          onChange={(e) => {
            setEditedLanguage(e.target.value);
            i18n.changeLanguage(e.target.value);
          }}
          className="w-full h-10 px-3 rounded-lg border text-sm outline-none cursor-pointer"
          style={{
            borderColor: "var(--color-gray-200)",
            background: "var(--color-gray-50)",
            color: "var(--color-slate)",
          }}
        >
          <option value="en">English</option>
          <option value="es">Español</option>
          <option value="pt">Português</option>
        </select>
      </div>

      <button
        onClick={handleSave}
        className="btn btn-primary btn-md flex items-center gap-2"
      >
        {saved
          ? t("profile.saved") || "Saved!"
          : t("profile.save") || "Save Changes"}
      </button>
    </div>
  );
}

export default function ProfilePage() {
  const { t } = useTranslation();
  const router = useRouter();
  const { data: profile, isLoading, error } = useProfile();
  const updateProfile = useUpdateProfile();
  const logout = useLogout();

  const handleSave = async (data: {
    first_name: string;
    last_name: string;
    email: string;
    preferred_language: "en" | "es" | "pt";
  }) => {
    await updateProfile.mutateAsync(data);
  };

  const handleLogout = async () => {
    await logout.mutateAsync();
    router.push("/login");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Loader2
          className="w-8 h-8 animate-spin"
          style={{ color: "var(--color-brand-blue)" }}
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl">
        <div className="card text-center py-8">
          <p style={{ color: "var(--color-brand-coral)" }}>
            {t("profile.error") || "Failed to load profile. Please try again."}
          </p>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  const displayName =
    [profile.first_name, profile.last_name].filter(Boolean).join(" ") ||
    profile.username;
  const initials = displayName
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  return (
    <div className="max-w-2xl space-y-6">
      <div>
        <h1
          className="text-2xl font-bold mb-1"
          style={{
            fontFamily: "var(--font-heading)",
            color: "var(--color-brand-navy)",
          }}
        >
          {t("profile.title") || "Profile"}
        </h1>
        <p style={{ color: "var(--color-slate-light)", fontSize: "0.9375rem" }}>
          {t("profile.subtitle") || "Manage your account and preferences"}
        </p>
      </div>

      <div className="card flex items-center gap-4">
        <div
          className="w-16 h-16 rounded-full flex items-center justify-center text-white font-bold text-xl flex-shrink-0"
          style={{
            background:
              "linear-gradient(135deg, var(--color-brand-blue), var(--color-brand-purple))",
          }}
        >
          {initials}
        </div>
        <div>
          <h2
            className="font-bold text-lg"
            style={{ color: "var(--color-brand-navy)" }}
          >
            {displayName}
          </h2>
          <p className="text-sm" style={{ color: "var(--color-slate-light)" }}>
            {profile.email}
          </p>
          <div className="flex gap-2 mt-2">
            {profile.level && (
              <span className="badge badge-blue">{profile.level}</span>
            )}
            <span className="badge badge-green">{profile.role}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="stat-card text-center">
          <div
            className="flex items-center justify-center mb-2"
            style={{ color: "var(--color-brand-blue)" }}
          >
            <Clock size={20} />
          </div>
          <div className="stat-card-value">{profile.total_hours || 0}h</div>
          <div className="stat-card-label">
            {t("profile.hoursStudied") || "Hours Studied"}
          </div>
        </div>
        <div className="stat-card text-center">
          <div
            className="flex items-center justify-center mb-2"
            style={{ color: "var(--color-brand-coral)" }}
          >
            <Flame size={20} />
          </div>
          <div className="stat-card-value">{profile.streak || 0}</div>
          <div className="stat-card-label">
            {t("profile.dayStreak") || "Day Streak"}
          </div>
        </div>
        <div className="stat-card text-center">
          <div
            className="flex items-center justify-center mb-2"
            style={{ color: "var(--color-brand-purple)" }}
          >
            <BookOpen size={20} />
          </div>
          <div className="stat-card-value">
            {profile.enrolled_courses?.length || 0}
          </div>
          <div className="stat-card-label">
            {t("profile.courses") || "Courses"}
          </div>
        </div>
      </div>

      <ProfileForm profile={profile} onSave={handleSave} />

      <div
        className="card"
        style={{ borderColor: "var(--color-brand-coral-50)" }}
      >
        <button
          onClick={handleLogout}
          disabled={logout.isPending}
          className="btn btn-ghost text-sm flex items-center gap-2"
          style={{ color: "var(--color-brand-coral)" }}
        >
          {logout.isPending ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <LogOut size={16} />
          )}
          {t("profile.logout") || "Log Out"}
        </button>
      </div>
    </div>
  );
}
