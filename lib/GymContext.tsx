'use client';

import React, { createContext, useContext, useState } from 'react';
import {
  MembershipPlan,
  WorkoutProgram,
  Trainer,
  GalleryItem,
  MembershipEnquiry,
  ContactMessage,
  GymSettings,
} from './types';
import {
  initialSettings,
  initialPlans,
  initialPrograms,
  initialTrainers,
  initialGallery,
  initialEnquiries,
  initialMessages,
} from './initialData';

interface GymContextType {
  settings: GymSettings;
  plans: MembershipPlan[];
  programs: WorkoutProgram[];
  trainers: Trainer[];
  gallery: GalleryItem[];
  enquiries: MembershipEnquiry[];
  messages: ContactMessage[];
  // Modals & Active selections
  selectedPlan: MembershipPlan | null;
  setSelectedPlan: (plan: MembershipPlan | null) => void;
  isMembershipModalOpen: boolean;
  setIsMembershipModalOpen: (open: boolean) => void;
  selectedProgram: WorkoutProgram | null;
  setSelectedProgram: (program: WorkoutProgram | null) => void;
  isVideoModalOpen: boolean;
  setIsVideoModalOpen: (open: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
  // Actions
  addEnquiry: (data: Omit<MembershipEnquiry, 'id' | 'enquiryNumber' | 'createdAt' | 'status'>) => MembershipEnquiry;
  updateEnquiryStatus: (id: string, status: MembershipEnquiry['status']) => void;
  deleteEnquiry: (id: string) => void;
  addMessage: (data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => ContactMessage;
  updateMessageStatus: (id: string, status: ContactMessage['status']) => void;
  deleteMessage: (id: string) => void;
  updatePlan: (plan: MembershipPlan) => void;
  addPlan: (plan: Omit<MembershipPlan, 'id'>) => void;
  deletePlan: (id: string) => void;
  updateProgram: (program: WorkoutProgram) => void;
  addProgram: (program: Omit<WorkoutProgram, 'id'>) => void;
  deleteProgram: (id: string) => void;
  updateTrainer: (trainer: Trainer) => void;
  addTrainer: (trainer: Omit<Trainer, 'id'>) => void;
  deleteTrainer: (id: string) => void;
  addGalleryItem: (item: Omit<GalleryItem, 'id'>) => void;
  deleteGalleryItem: (id: string) => void;
  updateSettings: (newSettings: Partial<GymSettings>) => void;
  resetToDefaults: () => void;
  getWhatsAppUrl: (customText?: string) => string;
}

const GymContext = createContext<GymContextType | null>(null);

const STORAGE_KEYS = {
  SETTINGS: 'gym_app_settings_v1',
  PLANS: 'gym_app_plans_v1',
  PROGRAMS: 'gym_app_programs_v1',
  TRAINERS: 'gym_app_trainers_v1',
  GALLERY: 'gym_app_gallery_v1',
  ENQUIRIES: 'gym_app_enquiries_v1',
  MESSAGES: 'gym_app_messages_v1',
};

function getStoredOrDefault<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? (JSON.parse(item) as T) : defaultValue;
  } catch {
    return defaultValue;
  }
}

export const GymProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<GymSettings>(() =>
    getStoredOrDefault(STORAGE_KEYS.SETTINGS, initialSettings)
  );
  const [plans, setPlans] = useState<MembershipPlan[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.PLANS, initialPlans)
  );
  const [programs, setPrograms] = useState<WorkoutProgram[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.PROGRAMS, initialPrograms)
  );
  const [trainers, setTrainers] = useState<Trainer[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.TRAINERS, initialTrainers)
  );
  const [gallery, setGallery] = useState<GalleryItem[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.GALLERY, initialGallery)
  );
  const [enquiries, setEnquiries] = useState<MembershipEnquiry[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.ENQUIRIES, initialEnquiries)
  );
  const [messages, setMessages] = useState<ContactMessage[]>(() =>
    getStoredOrDefault(STORAGE_KEYS.MESSAGES, initialMessages)
  );

  // Modal states
  const [selectedPlan, setSelectedPlan] = useState<MembershipPlan | null>(null);
  const [isMembershipModalOpen, setIsMembershipModalOpen] = useState(false);
  const [selectedProgram, setSelectedProgram] = useState<WorkoutProgram | null>(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);

  const saveItem = (key: string, value: unknown) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // ignore
    }
  };

  const getCleanWhatsAppNumber = (numStr: string) => {
    let clean = numStr.replace(/\D/g, '');
    if (clean.startsWith('0')) {
      clean = '92' + clean.slice(1);
    } else if (!clean.startsWith('92')) {
      clean = '92' + clean;
    }
    return clean;
  };

  const getWhatsAppUrl = (customText?: string) => {
    const cleanNum = getCleanWhatsAppNumber(settings.whatsappNumber);
    const text = customText || `Hello ${settings.gymName}, I want to learn more about joining your gym!`;
    return `https://wa.me/${cleanNum}?text=${encodeURIComponent(text)}`;
  };

  const addEnquiry = (data: Omit<MembershipEnquiry, 'id' | 'enquiryNumber' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const randomDigits = Math.floor(1000 + Math.random() * 9000);
    const enquiryNumber = `GYM-PK-${randomDigits}`;

    const newEnquiry: MembershipEnquiry = {
      ...data,
      id: `enq-${Date.now()}`,
      enquiryNumber,
      status: 'New',
      createdAt: formattedDate,
    };

    const updated = [newEnquiry, ...enquiries];
    setEnquiries(updated);
    saveItem(STORAGE_KEYS.ENQUIRIES, updated);
    return newEnquiry;
  };

  const updateEnquiryStatus = (id: string, status: MembershipEnquiry['status']) => {
    const updated = enquiries.map((item) => (item.id === id ? { ...item, status } : item));
    setEnquiries(updated);
    saveItem(STORAGE_KEYS.ENQUIRIES, updated);
  };

  const deleteEnquiry = (id: string) => {
    const updated = enquiries.filter((item) => item.id !== id);
    setEnquiries(updated);
    saveItem(STORAGE_KEYS.ENQUIRIES, updated);
  };

  const addMessage = (data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>) => {
    const now = new Date();
    const formattedDate = `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, '0')}-${String(now.getDate()).padStart(2, '0')} ${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
    const newMsg: ContactMessage = {
      ...data,
      id: `msg-${Date.now()}`,
      status: 'Unread',
      createdAt: formattedDate,
    };
    const updated = [newMsg, ...messages];
    setMessages(updated);
    saveItem(STORAGE_KEYS.MESSAGES, updated);
    return newMsg;
  };

  const updateMessageStatus = (id: string, status: ContactMessage['status']) => {
    const updated = messages.map((m) => (m.id === id ? { ...m, status } : m));
    setMessages(updated);
    saveItem(STORAGE_KEYS.MESSAGES, updated);
  };

  const deleteMessage = (id: string) => {
    const updated = messages.filter((m) => m.id !== id);
    setMessages(updated);
    saveItem(STORAGE_KEYS.MESSAGES, updated);
  };

  const updatePlan = (updatedPlan: MembershipPlan) => {
    const updated = plans.map((p) => (p.id === updatedPlan.id ? updatedPlan : p));
    setPlans(updated);
    saveItem(STORAGE_KEYS.PLANS, updated);
  };

  const addPlan = (newPlanData: Omit<MembershipPlan, 'id'>) => {
    const newPlan: MembershipPlan = {
      ...newPlanData,
      id: `plan-${Date.now()}`,
    };
    const updated = [...plans, newPlan];
    setPlans(updated);
    saveItem(STORAGE_KEYS.PLANS, updated);
  };

  const deletePlan = (id: string) => {
    const updated = plans.filter((p) => p.id !== id);
    setPlans(updated);
    saveItem(STORAGE_KEYS.PLANS, updated);
  };

  const updateProgram = (prog: WorkoutProgram) => {
    const updated = programs.map((p) => (p.id === prog.id ? prog : p));
    setPrograms(updated);
    saveItem(STORAGE_KEYS.PROGRAMS, updated);
  };

  const addProgram = (data: Omit<WorkoutProgram, 'id'>) => {
    const newProg: WorkoutProgram = {
      ...data,
      id: `prog-${Date.now()}`,
    };
    const updated = [...programs, newProg];
    setPrograms(updated);
    saveItem(STORAGE_KEYS.PROGRAMS, updated);
  };

  const deleteProgram = (id: string) => {
    const updated = programs.filter((p) => p.id !== id);
    setPrograms(updated);
    saveItem(STORAGE_KEYS.PROGRAMS, updated);
  };

  const updateTrainer = (trainer: Trainer) => {
    const updated = trainers.map((t) => (t.id === trainer.id ? trainer : t));
    setTrainers(updated);
    saveItem(STORAGE_KEYS.TRAINERS, updated);
  };

  const addTrainer = (data: Omit<Trainer, 'id'>) => {
    const newTrainer: Trainer = {
      ...data,
      id: `trainer-${Date.now()}`,
    };
    const updated = [...trainers, newTrainer];
    setTrainers(updated);
    saveItem(STORAGE_KEYS.TRAINERS, updated);
  };

  const deleteTrainer = (id: string) => {
    const updated = trainers.filter((t) => t.id !== id);
    setTrainers(updated);
    saveItem(STORAGE_KEYS.TRAINERS, updated);
  };

  const addGalleryItem = (data: Omit<GalleryItem, 'id'>) => {
    const newItem: GalleryItem = {
      ...data,
      id: `gal-${Date.now()}`,
    };
    const updated = [newItem, ...gallery];
    setGallery(updated);
    saveItem(STORAGE_KEYS.GALLERY, updated);
  };

  const deleteGalleryItem = (id: string) => {
    const updated = gallery.filter((g) => g.id !== id);
    setGallery(updated);
    saveItem(STORAGE_KEYS.GALLERY, updated);
  };

  const updateSettings = (newSettings: Partial<GymSettings>) => {
    const updated = { ...settings, ...newSettings };
    setSettings(updated);
    saveItem(STORAGE_KEYS.SETTINGS, updated);
  };

  const resetToDefaults = () => {
    setSettings(initialSettings);
    setPlans(initialPlans);
    setPrograms(initialPrograms);
    setTrainers(initialTrainers);
    setGallery(initialGallery);
    setEnquiries(initialEnquiries);
    setMessages(initialMessages);
    localStorage.clear();
  };

  return (
    <GymContext.Provider
      value={{
        settings,
        plans,
        programs,
        trainers,
        gallery,
        enquiries,
        messages,
        selectedPlan,
        setSelectedPlan,
        isMembershipModalOpen,
        setIsMembershipModalOpen,
        selectedProgram,
        setSelectedProgram,
        isVideoModalOpen,
        setIsVideoModalOpen,
        isAdminModalOpen,
        setIsAdminModalOpen,
        addEnquiry,
        updateEnquiryStatus,
        deleteEnquiry,
        addMessage,
        updateMessageStatus,
        deleteMessage,
        updatePlan,
        addPlan,
        deletePlan,
        updateProgram,
        addProgram,
        deleteProgram,
        updateTrainer,
        addTrainer,
        deleteTrainer,
        addGalleryItem,
        deleteGalleryItem,
        updateSettings,
        resetToDefaults,
        getWhatsAppUrl,
      }}
    >
      {children}
    </GymContext.Provider>
  );
};

export const useGym = () => {
  const context = useContext(GymContext);
  if (!context) {
    throw new Error('useGym must be used within a GymProvider');
  }
  return context;
};
