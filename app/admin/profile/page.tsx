'use client';

import { useEffect, useRef, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { defaultPortfolioData } from '@/lib/defaultData';
import toast from 'react-hot-toast';
import { Save, User, Info, Upload, Trash2, Loader2 } from 'lucide-react';
import type { Profile } from '@/types';

type FormData = Omit<Profile, 'id' | 'user_id' | 'created_at' | 'updated_at'>;

const FIELDS: {
  key: keyof FormData;
  label: string;
  hint: string;
  type?: string;
  multiline?: boolean;
  placeholder: string;
}[] = [
  {
    key: 'name',
    label: 'Full Name',
    hint: 'Your full name as it appears on your portfolio.',
    placeholder: 'e.g. Sherwin Christopher F. Roxas',
  },
  {
    key: 'title',
    label: 'Professional Title',
    hint: 'One line that describes what you do.',
    placeholder: 'e.g. Full Stack Developer',
  },
  {
    key: 'bio',
    label: 'Bio',
    hint: 'Write 2–4 sentences about your background and what you specialize in.',
    multiline: true,
    placeholder: 'Full Stack Developer with X years of experience…',
  },
  {
    key: 'email',
    label: 'Email Address',
    hint: 'Shown on the portfolio and used for the contact form.',
    type: 'email',
    placeholder: 'you@email.com',
  },
  {
    key: 'phone',
    label: 'Phone / Viber',
    hint: 'Include the country code — e.g. +(63) 950 909 5677.',
    placeholder: '+(63) 950 909 5677',
  },
  {
    key: 'github',
    label: 'GitHub URL',
    hint: 'Link to your GitHub profile.',
    type: 'url',
    placeholder: 'https://github.com/yourhandle',
  },
  {
    key: 'linkedin',
    label: 'LinkedIn URL',
    hint: 'Optional — leave blank if you prefer not to show it.',
    type: 'url',
    placeholder: 'https://linkedin.com/in/yourhandle',
  },
  {
    key: 'portfolio_url',
    label: 'Portfolio URL',
    hint: 'The live URL of this portfolio (your Vercel domain).',
    type: 'url',
    placeholder: 'https://yoursite.vercel.app',
  },
];

export default function ProfilePage() {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);
  const [form, setForm] = useState<FormData>({
    name: '', title: '', bio: '', phone: '', email: '',
    github: '', linkedin: '', portfolio_url: '', avatar_url: '',
  });

  // Photos live in the existing public "project-images" bucket under avatars/
  // so no extra Supabase setup is needed.
  async function handlePhotoUpload(file: File) {
    if (!file.type.startsWith('image/')) {
      toast.error('Please choose an image file (JPG, PNG, WebP).');
      return;
    }
    setUploading(true);
    const ext = file.name.split('.').pop() ?? 'jpg';
    const path = `avatars/${Date.now()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from('project-images')
      .upload(path, file, { contentType: file.type });

    if (uploadError) {
      toast.error('Upload failed. Please try again.');
      setUploading(false);
      return;
    }

    // Remove the previous photo if it was one of our uploads
    const oldPath = form.avatar_url?.split('/project-images/')[1];
    if (oldPath?.startsWith('avatars/')) {
      await supabase.storage.from('project-images').remove([oldPath]);
    }

    const { data: { publicUrl } } = supabase.storage
      .from('project-images')
      .getPublicUrl(path);

    setForm(f => ({ ...f, avatar_url: publicUrl }));
    setUploading(false);
    toast.success('Photo uploaded! Click Save Profile to apply it.');
    if (fileRef.current) fileRef.current.value = '';
  }

  async function handlePhotoRemove() {
    const oldPath = form.avatar_url?.split('/project-images/')[1];
    if (oldPath?.startsWith('avatars/')) {
      await supabase.storage.from('project-images').remove([oldPath]);
    }
    setForm(f => ({ ...f, avatar_url: '' }));
    toast.success('Photo removed. Click Save Profile to apply.');
  }

  useEffect(() => {
    async function load() {
      const { data, error } = await supabase.from('profiles').select('*').single();
      if (data) {
        setForm({
          name: data.name ?? '',
          title: data.title ?? '',
          bio: data.bio ?? '',
          phone: data.phone ?? '',
          email: data.email ?? '',
          github: data.github ?? '',
          linkedin: data.linkedin ?? '',
          portfolio_url: data.portfolio_url ?? '',
          avatar_url: data.avatar_url ?? '',
        });
      } else if (error?.code === 'PGRST116') {
        const d = defaultPortfolioData.profile!;
        setForm({
          name: d.name, title: d.title, bio: d.bio,
          phone: d.phone, email: d.email, github: d.github,
          linkedin: d.linkedin ?? '', portfolio_url: d.portfolio_url ?? '', avatar_url: '',
        });
      }
      setLoading(false);
    }
    load();
  }, []);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) { toast.error('Not signed in.'); setSaving(false); return; }

    const { data: existing } = await supabase.from('profiles').select('id').single();
    const payload = { ...form, updated_at: new Date().toISOString() };
    const { error } = existing
      ? await supabase.from('profiles').update(payload).eq('id', existing.id)
      : await supabase.from('profiles').insert({ ...form, user_id: user.id });

    if (error) toast.error('Could not save. Please try again.');
    else toast.success('Profile saved successfully!');
    setSaving(false);
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-48">
        <p className="text-sm text-[#8E8E93]">Loading your profile…</p>
      </div>
    );
  }

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-2">
        <div className="w-9 h-9 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
          <User className="w-4 h-4 text-[#007AFF]" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-[#1C1C1E]">Profile</h1>
          <p className="text-xs text-[#8E8E93]">Your personal details shown on the portfolio</p>
        </div>
      </div>

      {/* Tip banner */}
      <div className="flex items-start gap-2.5 p-3.5 rounded-xl mb-6 mt-4"
        style={{ background: 'rgba(0,122,255,0.06)', border: '1px solid rgba(0,122,255,0.12)' }}>
        <Info className="w-4 h-4 text-[#007AFF] flex-shrink-0 mt-0.5" />
        <p className="text-xs text-[#005EC4] leading-relaxed">
          Fill in as many fields as you'd like. Everything here is public and shown on your live portfolio — except the avatar URL, which is optional.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSave} className="card p-6 space-y-5">
        {/* Profile photo */}
        <div>
          <label className="block text-sm font-semibold text-[#1C1C1E] mb-1">Profile Photo</label>
          <p className="text-xs text-[#8E8E93] mb-3">
            Shown on your portfolio landing page and PDF resume. If no photo is set, your initials are used instead.
          </p>
          <div className="flex items-center gap-4">
            {form.avatar_url ? (
              <img
                src={form.avatar_url}
                alt="Profile"
                className="w-20 h-20 rounded-[24px] object-cover flex-shrink-0"
                style={{ border: '1px solid var(--border)' }}
              />
            ) : (
              <div
                className="w-20 h-20 rounded-[24px] flex items-center justify-center text-white text-2xl font-bold flex-shrink-0"
                style={{ background: 'linear-gradient(180deg, #3395FF 0%, #007AFF 100%)' }}
              >
                {(form.name || 'SR').split(' ').map(n => n[0]).slice(0, 2).join('')}
              </div>
            )}
            <div className="flex flex-col gap-2">
              <button
                type="button"
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="ios-btn-secondary text-xs disabled:opacity-50"
              >
                {uploading
                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  : <Upload className="w-3.5 h-3.5" />}
                {uploading ? 'Uploading…' : (form.avatar_url ? 'Change Photo' : 'Upload Photo')}
              </button>
              {form.avatar_url && (
                <button
                  type="button"
                  onClick={handlePhotoRemove}
                  className="flex items-center gap-1.5 text-xs text-[#FF3B30] hover:opacity-70 transition-opacity"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Remove photo
                </button>
              )}
            </div>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={e => {
                const f = e.target.files?.[0];
                if (f) handlePhotoUpload(f);
              }}
            />
          </div>
        </div>

        <div className="border-t" style={{ borderColor: 'var(--border)' }} />

        {FIELDS.map(({ key, label, hint, type, multiline, placeholder }) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-[#1C1C1E] mb-1">
              {label}
            </label>
            <p className="text-xs text-[#8E8E93] mb-2">{hint}</p>
            {multiline ? (
              <textarea
                value={form[key] ?? ''}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                rows={4}
                className="ios-input resize-none"
              />
            ) : (
              <input
                type={type ?? 'text'}
                value={form[key] ?? ''}
                onChange={e => setForm({ ...form, [key]: e.target.value })}
                placeholder={placeholder}
                className="ios-input"
              />
            )}
          </div>
        ))}

        <div className="pt-2 flex items-center gap-3">
          <button
            type="submit"
            disabled={saving}
            className="ios-btn-primary disabled:opacity-60"
          >
            <Save className="w-4 h-4" />
            {saving ? 'Saving…' : 'Save Profile'}
          </button>
          <p className="text-xs text-[#8E8E93]">Changes go live immediately.</p>
        </div>
      </form>
    </div>
  );
}
