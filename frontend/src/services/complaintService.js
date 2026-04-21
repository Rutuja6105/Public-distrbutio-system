import { COLLECTIONS } from '../database/collections';

export const complaintService = {
  getComplaints: async () => {
    try {
      const stored = localStorage.getItem(COLLECTIONS.COMPLAINTS);
      return stored ? JSON.parse(stored) : [];
    } catch (error) {
      console.error('Error fetching complaints:', error);
      return [];
    }
  },

  submitComplaint: async (complaintData) => {
    try {
      const stored = localStorage.getItem(COLLECTIONS.COMPLAINTS);
      const complaints = stored ? JSON.parse(stored) : [];
      
      const newComplaint = {
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        status: 'open',
        ...complaintData
      };
      
      const updatedComplaints = [newComplaint, ...complaints];
      localStorage.setItem(COLLECTIONS.COMPLAINTS, JSON.stringify(updatedComplaints));
      
      return newComplaint;
    } catch (error) {
      console.error('Error submitting complaint:', error);
      throw error;
    }
  },

  updateComplaintStatus: async (id, status) => {
    try {
      const stored = localStorage.getItem(COLLECTIONS.COMPLAINTS);
      if (!stored) return;
      
      const complaints = JSON.parse(stored);
      const updated = complaints.map(c => 
        c.id === id ? { ...c, status } : c
      );
      
      localStorage.setItem(COLLECTIONS.COMPLAINTS, JSON.stringify(updated));
    } catch (error) {
      console.error('Error updating complaint status:', error);
      throw error;
    }
  }
};
