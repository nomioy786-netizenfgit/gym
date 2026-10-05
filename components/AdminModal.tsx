'use client';

import React, { useState } from 'react';
import { useGym } from '@/lib/GymContext';
import { MembershipPlan, WorkoutProgram, Trainer, GalleryItem, MembershipEnquiry, ContactMessage } from '@/lib/types';
import {
  X,
  Lock,
  LogOut,
  Users,
  Dumbbell,
  DollarSign,
  Mail,
  Camera,
  Settings,
  Plus,
  Trash2,
  Edit2,
  Check,
  Phone,
  MessageCircle,
  Code,
  FileText,
  Copy,
  CheckCircle2,
  AlertTriangle,
  RotateCcw,
} from 'lucide-react';

export const AdminModal: React.FC = () => {
  const {
    isAdminModalOpen,
    setIsAdminModalOpen,
    settings,
    updateSettings,
    plans,
    addPlan,
    updatePlan,
    deletePlan,
    programs,
    addProgram,
    updateProgram,
    deleteProgram,
    trainers,
    addTrainer,
    updateTrainer,
    deleteTrainer,
    gallery,
    addGalleryItem,
    deleteGalleryItem,
    enquiries,
    updateEnquiryStatus,
    deleteEnquiry,
    messages,
    updateMessageStatus,
    deleteMessage,
    resetToDefaults,
    getWhatsAppUrl,
  } = useGym();

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('admin');
  const [password, setPassword] = useState('gym2026');
  const [authError, setAuthError] = useState('');

  const [activeTab, setActiveTab] = useState<
    'overview' | 'enquiries' | 'messages' | 'plans' | 'programs' | 'trainers' | 'gallery' | 'settings' | 'export'
  >('overview');

  // Edit states
  const [editingPlan, setEditingPlan] = useState<MembershipPlan | null>(null);
  const [newPlan, setNewPlan] = useState({ name: '', price: 1200, period: 'Month', isPopular: false, features: 'Gym Access, Locker' });
  const [isAddingPlan, setIsAddingPlan] = useState(false);

  const [editingProgram, setEditingProgram] = useState<WorkoutProgram | null>(null);
  const [newProgram, setNewProgram] = useState({
    name: '',
    tagline: '',
    description: '',
    image: '/images/hero.jpg',
    duration: '8 Weeks',
    level: 'Beginner',
    features: 'Strength, Cardio',
    trainerName: 'Tariq Khan',
  });
  const [isAddingProgram, setIsAddingProgram] = useState(false);

  const [editingTrainer, setEditingTrainer] = useState<Trainer | null>(null);
  const [newTrainer, setNewTrainer] = useState({
    name: '',
    speciality: '',
    experience: '5+ Years',
    image: '/images/trainer1.jpg',
    bio: '',
  });
  const [isAddingTrainer, setIsAddingTrainer] = useState(false);

  const [newGalleryItem, setNewGalleryItem] = useState({
    title: '',
    category: 'equipment' as GalleryItem['category'],
    image: '/images/about.jpg',
  });
  const [isAddingGallery, setIsAddingGallery] = useState(false);

  const [copiedCodeKey, setCopiedCodeKey] = useState<string | null>(null);

  if (!isAdminModalOpen) return null;

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() === 'admin' && (password === 'gym2026' || password === 'admin123')) {
      setIsAuthenticated(true);
      setAuthError('');
    } else {
      setAuthError('Invalid credentials. Default is: admin / gym2026');
    }
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedCodeKey(key);
    setTimeout(() => setCopiedCodeKey(null), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6 overflow-hidden">
      <div
        className="relative max-w-6xl w-full h-[92vh] bg-neutral-950 border border-neutral-800 rounded-3xl overflow-hidden shadow-2xl flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-neutral-800 bg-neutral-900/90 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-yellow-400 text-black flex items-center justify-center font-black">
              <Lock className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-black uppercase text-white tracking-wide">
                  {settings.gymName} — Admin Dashboard
                </h3>
                <span className="px-2 py-0.5 text-[10px] font-bold bg-yellow-400/20 text-yellow-400 border border-yellow-400/40 rounded">
                  Secure Portal
                </span>
              </div>
              <p className="text-xs text-neutral-400">
                Manage memberships, enquiries, workout plans, and gym data
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated && (
              <button
                onClick={() => setIsAuthenticated(false)}
                className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-neutral-400 hover:text-white bg-neutral-800 rounded-md transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Log Out</span>
              </button>
            )}
            <button
              onClick={() => setIsAdminModalOpen(false)}
              className="w-8 h-8 rounded-full bg-neutral-800 hover:bg-neutral-700 text-neutral-400 hover:text-white flex items-center justify-center transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body Container */}
        {!isAuthenticated ? (
          /* Authentication Screen */
          <div className="flex-1 flex items-center justify-center p-6 bg-neutral-950">
            <div className="max-w-md w-full bg-neutral-900 border border-neutral-800 rounded-2xl p-8 shadow-2xl">
              <div className="w-12 h-12 rounded-xl bg-yellow-400/10 text-yellow-400 border border-yellow-400/20 flex items-center justify-center mx-auto mb-4">
                <Lock className="w-6 h-6" />
              </div>
              <h4 className="text-xl font-black uppercase text-center text-white mb-1">
                Admin Authentication
              </h4>
              <p className="text-xs text-neutral-400 text-center mb-6">
                Enter your administrative credentials to manage GYM website data
              </p>

              {authError && (
                <div className="mb-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  <span>{authError}</span>
                </div>
              )}

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-yellow-400 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    placeholder="admin"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-400 mb-1.5">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full bg-neutral-950 border border-neutral-700 focus:border-yellow-400 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                    placeholder="gym2026"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full py-3 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-sm uppercase tracking-wider rounded-lg transition-colors shadow-lg shadow-yellow-400/20"
                  >
                    Login to Dashboard
                  </button>
                </div>

                <div className="pt-2 text-center text-xs text-neutral-500">
                  Demo credentials: <strong className="text-neutral-300">admin</strong> /{' '}
                  <strong className="text-neutral-300">gym2026</strong>
                </div>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
            {/* Sidebar Navigation */}
            <aside className="w-full md:w-60 bg-neutral-900 border-r border-neutral-800 p-4 shrink-0 flex md:flex-col gap-1 overflow-x-auto md:overflow-y-auto">
              <button
                onClick={() => setActiveTab('overview')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-left ${
                  activeTab === 'overview'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <DollarSign className="w-4 h-4 shrink-0" />
                <span>Overview</span>
              </button>

              <button
                onClick={() => setActiveTab('enquiries')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-left ${
                  activeTab === 'enquiries'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Users className="w-4 h-4 shrink-0" />
                  <span>Enquiries</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200">
                  {enquiries.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('messages')}
                className={`flex items-center justify-between px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-left ${
                  activeTab === 'messages'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <Mail className="w-4 h-4 shrink-0" />
                  <span>Messages</span>
                </div>
                <span className="text-[10px] px-1.5 py-0.5 rounded bg-neutral-800 text-neutral-200">
                  {messages.length}
                </span>
              </button>

              <button
                onClick={() => setActiveTab('plans')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-left ${
                  activeTab === 'plans'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <DollarSign className="w-4 h-4 shrink-0" />
                <span>Plans &amp; Pricing</span>
              </button>

              <button
                onClick={() => setActiveTab('programs')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-left ${
                  activeTab === 'programs'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Dumbbell className="w-4 h-4 shrink-0" />
                <span>Programs</span>
              </button>

              <button
                onClick={() => setActiveTab('trainers')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-left ${
                  activeTab === 'trainers'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Users className="w-4 h-4 shrink-0" />
                <span>Trainers</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-left ${
                  activeTab === 'gallery'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Camera className="w-4 h-4 shrink-0" />
                <span>Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('settings')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-left ${
                  activeTab === 'settings'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-neutral-400 hover:text-white hover:bg-neutral-800'
                }`}
              >
                <Settings className="w-4 h-4 shrink-0" />
                <span>Gym Settings</span>
              </button>

              <div className="my-2 border-t border-neutral-800 hidden md:block" />

              <button
                onClick={() => setActiveTab('export')}
                className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors whitespace-nowrap text-left ${
                  activeTab === 'export'
                    ? 'bg-yellow-400 text-black shadow-md'
                    : 'text-emerald-400 hover:text-emerald-300 hover:bg-neutral-800'
                }`}
              >
                <Code className="w-4 h-4 shrink-0" />
                <span>PHP &amp; MySQL Export</span>
              </button>

              <div className="mt-auto hidden md:block pt-4">
                <button
                  onClick={resetToDefaults}
                  className="flex items-center gap-2 text-[11px] text-neutral-500 hover:text-rose-400 px-3 py-1.5 transition-colors"
                  title="Reset sample data"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset All Data</span>
                </button>
              </div>
            </aside>

            {/* Main Panel Content */}
            <main className="flex-1 p-6 overflow-y-auto bg-neutral-950">
              {/* TAB: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black uppercase text-white mb-1">
                      Gym Performance Overview
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Live status of customer membership enquiries and contact messages
                    </p>
                  </div>

                  {/* Stat Cards */}
                  <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                      <div className="text-xs font-bold uppercase text-neutral-400">
                        Total Enquiries
                      </div>
                      <div className="text-3xl font-black text-white mt-1 tabular-nums">
                        {enquiries.length}
                      </div>
                      <div className="text-[11px] text-yellow-400 mt-1">
                        {enquiries.filter((e) => e.status === 'New').length} New Pending
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                      <div className="text-xs font-bold uppercase text-neutral-400">
                        Contact Messages
                      </div>
                      <div className="text-3xl font-black text-white mt-1 tabular-nums">
                        {messages.length}
                      </div>
                      <div className="text-[11px] text-emerald-400 mt-1">
                        {messages.filter((m) => m.status === 'Unread').length} Unread
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                      <div className="text-xs font-bold uppercase text-neutral-400">
                        Membership Plans
                      </div>
                      <div className="text-3xl font-black text-yellow-400 mt-1 tabular-nums">
                        {plans.length}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1">
                        Active in PKR
                      </div>
                    </div>

                    <div className="p-5 rounded-2xl bg-neutral-900 border border-neutral-800">
                      <div className="text-xs font-bold uppercase text-neutral-400">
                        Active Trainers
                      </div>
                      <div className="text-3xl font-black text-white mt-1 tabular-nums">
                        {trainers.length}
                      </div>
                      <div className="text-[11px] text-neutral-400 mt-1">
                        Certified Coaches
                      </div>
                    </div>
                  </div>

                  {/* Recent Enquiries Preview */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-4">
                      <h4 className="text-sm font-black uppercase text-white">
                        Recent Membership Enquiries
                      </h4>
                      <button
                        onClick={() => setActiveTab('enquiries')}
                        className="text-xs text-yellow-400 hover:underline"
                      >
                        View All Enquiries &rarr;
                      </button>
                    </div>

                    <div className="divide-y divide-neutral-800">
                      {enquiries.slice(0, 4).map((enq) => (
                        <div key={enq.id} className="py-3 flex items-center justify-between text-xs">
                          <div>
                            <div className="font-bold text-white flex items-center gap-2">
                              <span>{enq.fullName}</span>
                              <span className="font-mono text-[10px] text-yellow-400 font-semibold bg-neutral-950 px-1.5 py-0.5 rounded border border-neutral-800">
                                {enq.enquiryNumber}
                              </span>
                            </div>
                            <div className="text-neutral-400 mt-0.5">
                              {enq.planName} · {settings.currency} {enq.planPrice} · Phone: {enq.phoneNumber}
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span
                              className={`px-2 py-0.5 rounded font-bold uppercase text-[10px] ${
                                enq.status === 'New'
                                  ? 'bg-yellow-400/20 text-yellow-400 border border-yellow-400/40'
                                  : enq.status === 'Enrolled'
                                  ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                                  : 'bg-neutral-800 text-neutral-300'
                              }`}
                            >
                              {enq.status}
                            </span>
                            <a
                              href={`https://wa.me/${enq.phoneNumber.replace(/\D/g, '')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-1.5 rounded bg-emerald-600/30 text-emerald-400 hover:bg-emerald-600 hover:text-white"
                              title="Chat on WhatsApp"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                            </a>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: ENQUIRIES */}
              {activeTab === 'enquiries' && (
                <div className="space-y-6">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <h3 className="text-xl font-black uppercase text-white mb-1">
                        Membership Enquiries ({enquiries.length})
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Clients who selected a plan and initiated registration
                      </p>
                    </div>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden shadow-xl">
                    <div className="overflow-x-auto">
                      <table className="w-full text-left text-xs">
                        <thead className="bg-neutral-950 text-neutral-400 uppercase font-bold border-b border-neutral-800">
                          <tr>
                            <th className="p-3.5">ID / Client</th>
                            <th className="p-3.5">Contact</th>
                            <th className="p-3.5">Plan Selected</th>
                            <th className="p-3.5">Age / Date</th>
                            <th className="p-3.5">Status</th>
                            <th className="p-3.5 text-right">Actions</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-800 text-neutral-300">
                          {enquiries.map((enq) => (
                            <tr key={enq.id} className="hover:bg-neutral-800/40 transition-colors">
                              <td className="p-3.5">
                                <div className="font-bold text-white">{enq.fullName}</div>
                                <div className="font-mono text-[10px] text-yellow-400 font-semibold">
                                  {enq.enquiryNumber}
                                </div>
                                {enq.notes && (
                                  <div className="text-[11px] text-neutral-400 italic mt-0.5 line-clamp-1">
                                    &ldquo;{enq.notes}&rdquo;
                                  </div>
                                )}
                              </td>
                              <td className="p-3.5">
                                <div className="font-semibold text-white">{enq.phoneNumber}</div>
                                <div className="text-[10px] text-neutral-500">{enq.createdAt}</div>
                              </td>
                              <td className="p-3.5">
                                <div className="font-bold text-yellow-400">{enq.planName}</div>
                                <div className="text-[11px] text-neutral-400 tabular-nums">
                                  {settings.currency} {enq.planPrice.toLocaleString()} / mo
                                </div>
                              </td>
                              <td className="p-3.5">
                                <div>Age: {enq.age}</div>
                                <div className="text-neutral-400 text-[11px]">Join: {enq.joiningDate}</div>
                              </td>
                              <td className="p-3.5">
                                <select
                                  value={enq.status}
                                  onChange={(e) =>
                                    updateEnquiryStatus(enq.id, e.target.value as MembershipEnquiry['status'])
                                  }
                                  className="bg-neutral-950 border border-neutral-700 text-xs text-white rounded px-2 py-1 focus:outline-none"
                                >
                                  <option value="New">New</option>
                                  <option value="Contacted">Contacted</option>
                                  <option value="Enrolled">Enrolled</option>
                                  <option value="Cancelled">Cancelled</option>
                                </select>
                              </td>
                              <td className="p-3.5 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <a
                                    href={`https://wa.me/${enq.phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                                      `Hello ${enq.fullName}, this is ${settings.gymName} regarding your membership enquiry ${enq.enquiryNumber}.`
                                    )}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
                                    title="WhatsApp Message"
                                  >
                                    <MessageCircle className="w-3.5 h-3.5" />
                                  </a>
                                  <a
                                    href={`tel:${enq.phoneNumber}`}
                                    className="p-1.5 rounded bg-neutral-800 hover:bg-neutral-700 text-white"
                                    title="Call Phone"
                                  >
                                    <Phone className="w-3.5 h-3.5" />
                                  </a>
                                  <button
                                    onClick={() => deleteEnquiry(enq.id)}
                                    className="p-1.5 rounded bg-rose-900/40 hover:bg-rose-900 text-rose-300"
                                    title="Delete Enquiry"
                                  >
                                    <Trash2 className="w-3.5 h-3.5" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: MESSAGES */}
              {activeTab === 'messages' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black uppercase text-white mb-1">
                      Contact Inquiries ({messages.length})
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Messages submitted through the gym contact form
                    </p>
                  </div>

                  <div className="space-y-3">
                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-white text-sm">{msg.fullName}</span>
                            <span className="text-xs text-neutral-400">· {msg.phoneNumber}</span>
                            <span className="text-[10px] text-neutral-500">· {msg.createdAt}</span>
                          </div>
                          <p className="text-xs text-neutral-300 leading-relaxed max-w-2xl">
                            {msg.message}
                          </p>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <select
                            value={msg.status}
                            onChange={(e) =>
                              updateMessageStatus(msg.id, e.target.value as ContactMessage['status'])
                            }
                            className="bg-neutral-950 border border-neutral-700 text-xs text-white rounded px-2.5 py-1.5 focus:outline-none"
                          >
                            <option value="Unread">Unread</option>
                            <option value="Replied">Replied</option>
                          </select>

                          <a
                            href={`https://wa.me/${msg.phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(
                              `Hello ${msg.fullName}, thank you for contacting ${settings.gymName}!`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded flex items-center gap-1.5"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>Reply WhatsApp</span>
                          </a>

                          <button
                            onClick={() => deleteMessage(msg.id)}
                            className="p-1.5 text-rose-400 hover:bg-rose-950 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PLANS */}
              {activeTab === 'plans' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase text-white mb-1">
                        Membership Plans &amp; Pricing
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Edit plan prices in PKR, features list, and popular highlight badge
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingPlan(!isAddingPlan)}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Plan</span>
                    </button>
                  </div>

                  {/* Add Plan Form */}
                  {isAddingPlan && (
                    <div className="p-5 rounded-2xl bg-neutral-900 border border-yellow-400/40 space-y-4">
                      <h4 className="text-sm font-bold uppercase text-yellow-400">Add New Plan</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Plan Name (e.g. VIP QUARTERLY)"
                          value={newPlan.name}
                          onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                        <input
                          type="number"
                          placeholder="Price in PKR"
                          value={newPlan.price}
                          onChange={(e) => setNewPlan({ ...newPlan, price: Number(e.target.value) })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                        <label className="flex items-center gap-2 text-xs text-neutral-300">
                          <input
                            type="checkbox"
                            checked={newPlan.isPopular}
                            onChange={(e) => setNewPlan({ ...newPlan, isPopular: e.target.checked })}
                          />
                          <span>Highlight as Popular</span>
                        </label>
                      </div>
                      <input
                        type="text"
                        placeholder="Features (comma separated: Gym Access, Sauna, 2 Sessions)"
                        value={newPlan.features}
                        onChange={(e) => setNewPlan({ ...newPlan, features: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (!newPlan.name) return;
                            addPlan({
                              name: newPlan.name,
                              price: newPlan.price,
                              period: newPlan.period,
                              isPopular: newPlan.isPopular,
                              features: newPlan.features.split(',').map((f) => f.trim()),
                            });
                            setIsAddingPlan(false);
                            setNewPlan({ name: '', price: 1200, period: 'Month', isPopular: false, features: '' });
                          }}
                          className="px-4 py-2 bg-yellow-400 text-black font-bold text-xs rounded uppercase"
                        >
                          Save Plan
                        </button>
                        <button
                          onClick={() => setIsAddingPlan(false)}
                          className="px-3 py-2 bg-neutral-800 text-neutral-300 text-xs rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  {/* Plan Cards Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {plans.map((p) => (
                      <div key={p.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-5 relative">
                        {editingPlan?.id === p.id ? (
                          <div className="space-y-3">
                            <input
                              type="text"
                              value={editingPlan.name}
                              onChange={(e) => setEditingPlan({ ...editingPlan, name: e.target.value })}
                              className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs font-bold uppercase"
                            />
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-neutral-400">PKR:</span>
                              <input
                                type="number"
                                value={editingPlan.price}
                                onChange={(e) =>
                                  setEditingPlan({ ...editingPlan, price: Number(e.target.value) })
                                }
                                className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs font-bold"
                              />
                            </div>
                            <label className="flex items-center gap-2 text-xs text-neutral-300">
                              <input
                                type="checkbox"
                                checked={editingPlan.isPopular}
                                onChange={(e) =>
                                  setEditingPlan({ ...editingPlan, isPopular: e.target.checked })
                                }
                              />
                              <span>Is Popular Tier</span>
                            </label>
                            <textarea
                              rows={3}
                              value={editingPlan.features.join(', ')}
                              onChange={(e) =>
                                setEditingPlan({
                                  ...editingPlan,
                                  features: e.target.value.split(',').map((f) => f.trim()),
                                })
                              }
                              className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                            />
                            <div className="flex gap-2">
                              <button
                                onClick={() => {
                                  updatePlan(editingPlan);
                                  setEditingPlan(null);
                                }}
                                className="px-3 py-1.5 bg-yellow-400 text-black text-xs font-bold rounded uppercase"
                              >
                                Save
                              </button>
                              <button
                                onClick={() => setEditingPlan(null)}
                                className="px-3 py-1.5 bg-neutral-800 text-neutral-400 text-xs rounded"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div>
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-black uppercase text-white text-base">{p.name}</h4>
                              {p.isPopular && (
                                <span className="text-[9px] bg-yellow-400 text-black px-1.5 py-0.5 rounded font-black uppercase">
                                  Popular
                                </span>
                              )}
                            </div>
                            <div className="text-xl font-black text-yellow-400 mb-3 tabular-nums">
                              {settings.currency} {p.price.toLocaleString()} / {p.period}
                            </div>
                            <ul className="text-xs text-neutral-300 space-y-1 mb-4">
                              {p.features.map((f, i) => (
                                <li key={i}>• {f}</li>
                              ))}
                            </ul>
                            <div className="flex items-center gap-2 pt-3 border-t border-neutral-800">
                              <button
                                onClick={() => setEditingPlan(p)}
                                className="px-3 py-1 bg-neutral-800 hover:bg-neutral-700 text-white text-xs rounded flex items-center gap-1"
                              >
                                <Edit2 className="w-3 h-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => deletePlan(p.id)}
                                className="px-3 py-1 bg-rose-950 text-rose-400 hover:bg-rose-900 text-xs rounded"
                              >
                                Delete
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: PROGRAMS */}
              {activeTab === 'programs' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase text-white mb-1">
                        Workout Programs ({programs.length})
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Manage training categories, descriptions, and coach assignments
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingProgram(!isAddingProgram)}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Program</span>
                    </button>
                  </div>

                  {isAddingProgram && (
                    <div className="p-5 rounded-2xl bg-neutral-900 border border-yellow-400/40 space-y-3">
                      <h4 className="text-xs font-bold uppercase text-yellow-400">Add New Workout Program</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                          type="text"
                          placeholder="Program Name"
                          value={newProgram.name}
                          onChange={(e) => setNewProgram({ ...newProgram, name: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Short Tagline"
                          value={newProgram.tagline}
                          onChange={(e) => setNewProgram({ ...newProgram, tagline: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Lead Trainer Name"
                          value={newProgram.trainerName}
                          onChange={(e) => setNewProgram({ ...newProgram, trainerName: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Duration (e.g. 10 Weeks)"
                          value={newProgram.duration}
                          onChange={(e) => setNewProgram({ ...newProgram, duration: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Description"
                        value={newProgram.description}
                        onChange={(e) => setNewProgram({ ...newProgram, description: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (!newProgram.name) return;
                            addProgram({
                              name: newProgram.name,
                              tagline: newProgram.tagline,
                              description: newProgram.description,
                              image: newProgram.image,
                              duration: newProgram.duration,
                              level: newProgram.level,
                              trainerName: newProgram.trainerName,
                              features: newProgram.features.split(',').map((f) => f.trim()),
                            });
                            setIsAddingProgram(false);
                          }}
                          className="px-4 py-2 bg-yellow-400 text-black font-bold text-xs rounded uppercase"
                        >
                          Save Program
                        </button>
                        <button
                          onClick={() => setIsAddingProgram(false)}
                          className="px-3 py-2 bg-neutral-800 text-neutral-300 text-xs rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {programs.map((prog) => (
                      <div key={prog.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <div className="flex items-center justify-between mb-1">
                            <h4 className="font-bold text-white uppercase text-base">{prog.name}</h4>
                            <span className="text-[10px] text-yellow-400 font-bold px-2 py-0.5 rounded bg-neutral-950">
                              {prog.duration}
                            </span>
                          </div>
                          <p className="text-xs text-yellow-400/80 mb-2">{prog.tagline}</p>
                          <p className="text-xs text-neutral-400 line-clamp-2 mb-3">{prog.description}</p>
                          <div className="text-[11px] text-neutral-300">
                            Coach: <strong>{prog.trainerName}</strong>
                          </div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-neutral-800">
                          <button
                            onClick={() => deleteProgram(prog.id)}
                            className="px-2.5 py-1 bg-rose-950 text-rose-400 hover:bg-rose-900 text-xs rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: TRAINERS */}
              {activeTab === 'trainers' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase text-white mb-1">
                        Trainers &amp; Coaches ({trainers.length})
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Manage trainer profiles, specialities, and contact links
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingTrainer(!isAddingTrainer)}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Trainer</span>
                    </button>
                  </div>

                  {isAddingTrainer && (
                    <div className="p-5 rounded-2xl bg-neutral-900 border border-yellow-400/40 space-y-3">
                      <h4 className="text-xs font-bold uppercase text-yellow-400">Add New Trainer</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Trainer Name"
                          value={newTrainer.name}
                          onChange={(e) => setNewTrainer({ ...newTrainer, name: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Speciality"
                          value={newTrainer.speciality}
                          onChange={(e) => setNewTrainer({ ...newTrainer, speciality: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                        <input
                          type="text"
                          placeholder="Experience (e.g. 6+ Years)"
                          value={newTrainer.experience}
                          onChange={(e) => setNewTrainer({ ...newTrainer, experience: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                      </div>
                      <textarea
                        rows={2}
                        placeholder="Bio description"
                        value={newTrainer.bio}
                        onChange={(e) => setNewTrainer({ ...newTrainer, bio: e.target.value })}
                        className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (!newTrainer.name) return;
                            addTrainer({
                              name: newTrainer.name,
                              speciality: newTrainer.speciality,
                              experience: newTrainer.experience,
                              image: newTrainer.image,
                              bio: newTrainer.bio,
                              socials: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', whatsapp: settings.whatsappNumber },
                            });
                            setIsAddingTrainer(false);
                          }}
                          className="px-4 py-2 bg-yellow-400 text-black font-bold text-xs rounded uppercase"
                        >
                          Save Trainer
                        </button>
                        <button
                          onClick={() => setIsAddingTrainer(false)}
                          className="px-3 py-2 bg-neutral-800 text-neutral-300 text-xs rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {trainers.map((t) => (
                      <div key={t.id} className="bg-neutral-900 border border-neutral-800 rounded-xl p-4 flex flex-col justify-between">
                        <div>
                          <h4 className="font-bold text-white uppercase text-base">{t.name}</h4>
                          <div className="text-yellow-400 text-xs font-semibold mb-2">{t.speciality}</div>
                          <p className="text-xs text-neutral-400 leading-relaxed line-clamp-3 mb-2">{t.bio}</p>
                          <div className="text-[10px] text-neutral-500">{t.experience}</div>
                        </div>

                        <div className="flex items-center justify-end gap-2 pt-3 mt-3 border-t border-neutral-800">
                          <button
                            onClick={() => deleteTrainer(t.id)}
                            className="px-2.5 py-1 bg-rose-950 text-rose-400 hover:bg-rose-900 text-xs rounded"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: GALLERY */}
              {activeTab === 'gallery' && (
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-xl font-black uppercase text-white mb-1">
                        Gallery Management ({gallery.length} Images)
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Add or remove images displayed in the gym photo showcase
                      </p>
                    </div>

                    <button
                      onClick={() => setIsAddingGallery(!isAddingGallery)}
                      className="px-4 py-2 bg-yellow-400 hover:bg-yellow-300 text-black font-black text-xs uppercase tracking-wider rounded-lg flex items-center gap-1.5"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Image</span>
                    </button>
                  </div>

                  {isAddingGallery && (
                    <div className="p-5 rounded-2xl bg-neutral-900 border border-yellow-400/40 space-y-3">
                      <h4 className="text-xs font-bold uppercase text-yellow-400">Add New Photo</h4>
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        <input
                          type="text"
                          placeholder="Photo Title"
                          value={newGalleryItem.title}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, title: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                        <select
                          value={newGalleryItem.category}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, category: e.target.value as GalleryItem['category'] })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        >
                          <option value="equipment">Equipment &amp; Racks</option>
                          <option value="interior">Gym Interior</option>
                          <option value="training">Weight Training</option>
                          <option value="cardio">Cardio Suite</option>
                        </select>
                        <input
                          type="text"
                          placeholder="Image Path / URL"
                          value={newGalleryItem.image}
                          onChange={(e) => setNewGalleryItem({ ...newGalleryItem, image: e.target.value })}
                          className="bg-neutral-950 border border-neutral-700 text-white rounded p-2 text-xs"
                        />
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => {
                            if (!newGalleryItem.title) return;
                            addGalleryItem({
                              title: newGalleryItem.title,
                              category: newGalleryItem.category,
                              image: newGalleryItem.image,
                            });
                            setIsAddingGallery(false);
                          }}
                          className="px-4 py-2 bg-yellow-400 text-black font-bold text-xs rounded uppercase"
                        >
                          Add Photo
                        </button>
                        <button
                          onClick={() => setIsAddingGallery(false)}
                          className="px-3 py-2 bg-neutral-800 text-neutral-300 text-xs rounded"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                    {gallery.map((g) => (
                      <div key={g.id} className="relative rounded-xl overflow-hidden bg-neutral-900 border border-neutral-800 p-2 group">
                        <div className="h-28 w-full bg-neutral-950 rounded-lg overflow-hidden relative mb-2">
                          {/* eslint-disable-next-line @next/next/no-img-element */}
                          <img src={g.image} alt={g.title} className="w-full h-full object-cover" />
                        </div>
                        <div className="text-xs font-bold text-white truncate">{g.title}</div>
                        <div className="text-[10px] text-yellow-400 uppercase font-semibold">{g.category}</div>
                        <button
                          onClick={() => deleteGalleryItem(g.id)}
                          className="mt-2 w-full py-1 text-[10px] bg-rose-950 text-rose-300 hover:bg-rose-900 rounded"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB: SETTINGS */}
              {activeTab === 'settings' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black uppercase text-white mb-1">
                      Gym Information &amp; WhatsApp Settings
                    </h3>
                    <p className="text-xs text-neutral-400">
                      Edit the gym name, phone numbers, WhatsApp destination, address, and timings
                    </p>
                  </div>

                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl p-6 space-y-4 max-w-2xl">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                          Gym Name
                        </label>
                        <input
                          type="text"
                          value={settings.gymName}
                          onChange={(e) => updateSettings({ gymName: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2.5 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-yellow-400 mb-1">
                          WhatsApp Number *
                        </label>
                        <input
                          type="text"
                          value={settings.whatsappNumber}
                          onChange={(e) => updateSettings({ whatsappNumber: e.target.value })}
                          className="w-full bg-neutral-950 border border-yellow-400/60 text-white rounded p-2.5 text-xs font-bold"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                          Display Phone
                        </label>
                        <input
                          type="text"
                          value={settings.displayPhone}
                          onChange={(e) => updateSettings({ displayPhone: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2.5 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                          Email Address
                        </label>
                        <input
                          type="email"
                          value={settings.email}
                          onChange={(e) => updateSettings({ email: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2.5 text-xs"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                          Physical Address
                        </label>
                        <input
                          type="text"
                          value={settings.address}
                          onChange={(e) => updateSettings({ address: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2.5 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                          City, Country
                        </label>
                        <input
                          type="text"
                          value={settings.city}
                          onChange={(e) => updateSettings({ city: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2.5 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                          Currency Symbol
                        </label>
                        <input
                          type="text"
                          value={settings.currency}
                          onChange={(e) => updateSettings({ currency: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2.5 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                          Opening Hours (Mon-Sat)
                        </label>
                        <input
                          type="text"
                          value={settings.openingHoursWeekday}
                          onChange={(e) => updateSettings({ openingHoursWeekday: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2.5 text-xs"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-bold uppercase text-neutral-400 mb-1">
                          Opening Hours (Sunday)
                        </label>
                        <input
                          type="text"
                          value={settings.openingHoursSunday}
                          onChange={(e) => updateSettings({ openingHoursSunday: e.target.value })}
                          className="w-full bg-neutral-950 border border-neutral-700 text-white rounded p-2.5 text-xs"
                        />
                      </div>
                    </div>

                    <div className="pt-3">
                      <div className="inline-flex items-center gap-2 text-xs text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Settings are auto-saved in real-time</span>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* TAB: EXPORT (PHP & MySQL Source Code) */}
              {activeTab === 'export' && (
                <div className="space-y-6">
                  <div>
                    <h3 className="text-xl font-black uppercase text-white mb-1">
                      PHP &amp; MySQL Backend Source Code Hub
                    </h3>
                    <p className="text-xs text-neutral-400">
                      As requested in Section 15, 17 &amp; 19: All production-grade PHP scripts, MySQL schema (`database.sql`), and deployment guide.
                    </p>
                  </div>

                  <div className="p-4 rounded-xl bg-neutral-900 border border-neutral-800 text-xs text-neutral-300 space-y-1.5">
                    <div className="font-bold text-yellow-400 uppercase">Architecture &amp; Deployment Guide:</div>
                    <p>• <strong>Frontend (Next.js / HTML):</strong> Deploy on Vercel with zero server overhead.</p>
                    <p>• <strong>Backend (PHP):</strong> Host the `/backend/` directory on any PHP 8+ cPanel, Hostinger, Apache, or Nginx server.</p>
                    <p>• <strong>Database (MySQL):</strong> Import the `database.sql` script into phpMyAdmin or MySQL CLI.</p>
                    <p>• <strong>Security:</strong> PDO prepared statements, session auth for `/admin/`, password hashing (`PASSWORD_BCRYPT`).</p>
                  </div>

                  {/* Code Block 1: MySQL Database Schema */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800">
                      <span className="text-xs font-mono text-yellow-400">database/database.sql</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `-- GYM Fitness Database Schema
CREATE DATABASE IF NOT EXISTS gym_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gym_db;

-- 1. Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Membership Plans
CREATE TABLE IF NOT EXISTS membership_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    period VARCHAR(20) DEFAULT 'Month',
    is_popular TINYINT(1) DEFAULT 0,
    features TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Membership Enquiries
CREATE TABLE IF NOT EXISTS membership_enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enquiry_number VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    plan_price INT NOT NULL,
    age INT,
    joining_date VARCHAR(50),
    notes TEXT,
    status ENUM('New', 'Contacted', 'Enrolled', 'Cancelled') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. Contact Enquiries
CREATE TABLE IF NOT EXISTS contact_enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    message TEXT NOT NULL,
    status ENUM('Unread', 'Replied') DEFAULT 'Unread',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Sample Data Seeding
INSERT INTO admin_users (username, password_hash, full_name) VALUES
('admin', '$2y$10$wKqC9o29u.T61xN2G4BvXeO6N3gVfW6Wb1u/Xy9gXGgJd6K8fH3ey', 'Master Admin');

INSERT INTO membership_plans (name, price, period, is_popular, features) VALUES
('BASIC PLAN', 999, 'Month', 0, 'Gym Access\nBasic Equipment\nLocker Room Access'),
('STANDARD PLAN', 1499, 'Month', 1, 'Gym Access\nAll Equipment\nPersonal Trainer (2 Sessions)\nDiet Plan'),
('PREMIUM PLAN', 2499, 'Month', 0, 'Gym Access\nAll Equipment\nPersonal Trainer (4 Sessions)\nDiet Plan\nGroup Classes');`,
                            'sql'
                          )
                        }
                        className="flex items-center gap-1 text-xs text-neutral-300 hover:text-white bg-neutral-800 px-2.5 py-1 rounded"
                      >
                        {copiedCodeKey === 'sql' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy SQL</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-[11px] font-mono text-neutral-300 bg-neutral-950 overflow-x-auto max-h-56">
{`-- GYM Fitness Database Schema
CREATE DATABASE IF NOT EXISTS gym_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE gym_db;

-- 1. Admin Users
CREATE TABLE IF NOT EXISTS admin_users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL,
    full_name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 2. Membership Plans
CREATE TABLE IF NOT EXISTS membership_plans (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    price INT NOT NULL,
    period VARCHAR(20) DEFAULT 'Month',
    is_popular TINYINT(1) DEFAULT 0,
    features TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 3. Membership Enquiries
CREATE TABLE IF NOT EXISTS membership_enquiries (
    id INT AUTO_INCREMENT PRIMARY KEY,
    enquiry_number VARCHAR(30) NOT NULL UNIQUE,
    full_name VARCHAR(100) NOT NULL,
    phone_number VARCHAR(30) NOT NULL,
    plan_name VARCHAR(100) NOT NULL,
    plan_price INT NOT NULL,
    age INT,
    joining_date VARCHAR(50),
    notes TEXT,
    status ENUM('New', 'Contacted', 'Enrolled', 'Cancelled') DEFAULT 'New',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);`}
                    </pre>
                  </div>

                  {/* Code Block 2: PHP Database Config */}
                  <div className="bg-neutral-900 border border-neutral-800 rounded-2xl overflow-hidden">
                    <div className="flex items-center justify-between px-4 py-3 bg-neutral-950 border-b border-neutral-800">
                      <span className="text-xs font-mono text-yellow-400">backend/config/db.php</span>
                      <button
                        onClick={() =>
                          copyToClipboard(
                            `<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'gym_db';
$db_user = getenv('DB_USER') ?: 'root';
$db_pass = getenv('DB_PASS') ?: '';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}`,
                            'php_db'
                          )
                        }
                        className="flex items-center gap-1 text-xs text-neutral-300 hover:text-white bg-neutral-800 px-2.5 py-1 rounded"
                      >
                        {copiedCodeKey === 'php_db' ? (
                          <>
                            <Check className="w-3.5 h-3.5 text-emerald-400" />
                            <span>Copied!</span>
                          </>
                        ) : (
                          <>
                            <Copy className="w-3.5 h-3.5" />
                            <span>Copy PHP</span>
                          </>
                        )}
                      </button>
                    </div>
                    <pre className="p-4 text-[11px] font-mono text-neutral-300 bg-neutral-950 overflow-x-auto max-h-56">
{`<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");

$db_host = getenv('DB_HOST') ?: 'localhost';
$db_name = getenv('DB_NAME') ?: 'gym_db';
$db_user = getenv('DB_USER') ?: 'root';
$db_pass = getenv('DB_PASS') ?: '';

try {
    $pdo = new PDO("mysql:host=$db_host;dbname=$db_name;charset=utf8mb4", $db_user, $db_pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_EMULATE_PREPARES => false
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "Database connection failed"]);
    exit();
}`}
                    </pre>
                  </div>
                </div>
              )}
            </main>
          </div>
        )}
      </div>
    </div>
  );
};
