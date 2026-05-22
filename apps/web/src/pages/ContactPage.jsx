import React, { useState } from 'react';
import { Helmet } from 'react-helmet';
import pb from '@/lib/pocketbaseClient.js';
import { toast } from 'sonner';
const ContactPage = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    inquiryType: 'General Inquiry',
    message: ''
  });
  const handleChange = e => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = async e => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await pb.collection('contacts').create(formData, {
        $autoCancel: false
      });
      toast.success('Your message has been sent successfully.');
      setFormData({
        name: '',
        email: '',
        subject: '',
        inquiryType: 'General Inquiry',
        message: ''
      });
    } catch (error) {
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
  return <>
      <Helmet>
        <title>Contact | Max Carballo</title>
      </Helmet>

      <main className="pt-40 pb-32 min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          
          <div className="mb-24">
            <span className="section-label">Get in Touch</span>
            <h1 className="text-white mb-2">The Studio</h1>
            <div className="text-4xl md:text-5xl red-italic">
              Awaits
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
            
            {/* Info Side */}
            <div className="lg:col-span-5 space-y-12">
              <div>
                <h3 className="text-xs tracking-[0.2em] text-primary uppercase mb-4">Email</h3>
                <a href="mailto:studio@archiveofvisions.com" className="text-lg font-light hover:text-primary transition-colors border-b border-transparent hover:border-primary pb-1">
                  studio@maxcarballo.com
                </a>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.2em] text-primary uppercase mb-4">Commissions & Acquisitions</h3>
                <p className="text-foreground/70 font-light leading-relaxed">
                  For information regarding original artwork acquisitions, gallery exhibitions, or private commission requests, please provide detailed project scope in your inquiry.
                </p>
              </div>

              <div>
                <h3 className="text-xs tracking-[0.2em] text-primary uppercase mb-4">Press & Collaborations</h3>
                <p className="text-foreground/70 font-light leading-relaxed">
                  For press kits, interview requests, or commercial collaborations, direct your correspondence to the studio management team.
                </p>
              </div>
            </div>

            {/* Form Side */}
            <div className="lg:col-span-7">
              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest uppercase text-muted">Your Name</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs tracking-widest uppercase text-muted">Email Address</label>
                    <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-primary transition-colors" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-muted">Inquiry Type</label>
                  <select name="inquiryType" value={formData.inquiryType} onChange={handleChange} className="w-full bg-background border-b border-white/20 pb-2 text-white focus:outline-none focus:border-primary transition-colors appearance-none">
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Acquisition">Artwork Acquisition</option>
                    <option value="Commission">Private Commission</option>
                    <option value="Press">Press & Media</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-muted">Subject</label>
                  <input required type="text" name="subject" value={formData.subject} onChange={handleChange} className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-primary transition-colors" />
                </div>

                <div className="space-y-2">
                  <label className="text-xs tracking-widest uppercase text-muted">Message</label>
                  <textarea required name="message" value={formData.message} onChange={handleChange} rows="5" className="w-full bg-transparent border-b border-white/20 pb-2 text-white focus:outline-none focus:border-primary transition-colors resize-none"></textarea>
                </div>

                <button type="submit" disabled={isSubmitting} className="bg-primary text-white tracking-[0.2em] uppercase text-sm font-medium hover:bg-primary/90 transition-colors py-4 px-12 mt-4 disabled:opacity-50">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </div>

          </div>
        </div>
      </main>
    </>;
};
export default ContactPage;