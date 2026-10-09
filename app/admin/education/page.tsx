'use client';

import { useEffect, useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { defaultPortfolioData } from '@/lib/defaultData';
import toast from 'react-hot-toast';
import { Plus, Pencil, Trash2, X, Save, GraduationCap } from 'lucide-react';
import type { Education } from '@/types';

const empty: Omit<Education, 'id' | 'created_at'> = {
  institution: '', degree: '', field_of_study: '',
  start_year: '', end_year: '', is_current: false,
  description: '', order_index: 0,
};

export default function EducationPage() {
  const supabase = createClient();
  const [items, setItems] = useState<Education[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Education | null>(null);
  const [form, setForm] = useState(empty);
  const [saving, setSaving] = useState(false);

  async function load() {
    const { data } = await supabase.from('educations').select('*').order('order_index');
    setItems(data?.length ? data : defaultPortfolioData.educations);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  function openNew() {
    setEditing(null);
    setForm({ ...empty, order_index: items.length });
    setShowForm(true);
  }

  function openEdit(edu: Education) {
    setEditing(edu);
    setForm({
      institution: edu.institution,
      degree: edu.degree,
      field_of_study: edu.field_of_study,
      start_year: edu.start_year,
      end_year: edu.end_year ?? '',
      is_current: edu.is_current,
      description: edu.description ?? '',
      order_index: edu.order_index,
    });
    setShowForm(true);
  }

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    const payload = {
      ...form,
      description: form.description?.trim() || null,
      end_year: form.is_current ? null : (form.end_year?.trim() || null),
    };
    const { error } = editing
      ? await supabase.from('educations').update(payload).eq('id', editing.id)
      : await supabase.from('educations').insert(payload);
    if (error) toast.error('Could not save. Please try again.');
    else { toast.success(editing ? 'Education updated!' : 'Education added!'); setShowForm(false); load(); }
    setSaving(false);
  }

  async function handleDelete(id: string) {
    if (!confirm('Delete this education entry?')) return;
    const { error } = await supabase.from('educations').delete().eq('id', id);
    if (error) toast.error('Could not delete. Please try again.');
    else { toast.success('Education removed.'); load(); }
  }

  if (loading) return (
    <div className="flex items-center justify-center h-48">
      <p className="text-sm text-[#8E8E93]">Loading education…</p>
    </div>
  );

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-[#007AFF]/10 flex items-center justify-center">
            <GraduationCap className="w-4 h-4 text-[#007AFF]" />
          </div>
          <div>
            <h1 className="text-xl font-bold text-[#1C1C1E]">Education</h1>
            <p className="text-xs text-[#8E8E93]">{items.length} qualification{items.length !== 1 ? 's' : ''}</p>
          </div>
        </div>
        <button onClick={openNew} className="ios-btn-primary text-sm">
          <Plus className="w-4 h-4" /> Add Education
        </button>
      </div>

      {/* Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-[2px] z-50 flex items-center justify-center p-4">
          <div className="card w-full max-w-lg max-h-[92vh] overflow-y-auto p-6">
            <div className="flex items-center justify-between mb-5">
              <div>
                <h2 className="text-base font-bold text-[#1C1C1E]">
                  {editing ? 'Edit Education' : 'Add Education'}
                </h2>
                <p className="text-xs text-[#8E8E93] mt-0.5">
                  {editing ? 'Update this qualification.' : 'Add a degree or qualification.'}
                </p>
              </div>
              <button onClick={() => setShowForm(false)} className="text-[#8E8E93] hover:text-[#1C1C1E] p-1">
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#636366] mb-1.5">Institution *</label>
                <input
                  className="ios-input"
                  value={form.institution}
                  onChange={e => setForm({ ...form, institution: e.target.value })}
                  required
                  placeholder="e.g. AMA Computer College"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#636366] mb-1.5">Degree *</label>
                <input
                  className="ios-input"
                  value={form.degree}
                  onChange={e => setForm({ ...form, degree: e.target.value })}
                  required
                  placeholder="e.g. Bachelor of Science"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#636366] mb-1.5">Field of Study *</label>
                <input
                  className="ios-input"
                  value={form.field_of_study}
                  onChange={e => setForm({ ...form, field_of_study: e.target.value })}
                  required
                  placeholder="e.g. Information Technology"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-[#636366] mb-1.5">Start Year *</label>
                  <input
                    className="ios-input"
                    value={form.start_year}
                    onChange={e => setForm({ ...form, start_year: e.target.value })}
                    required
                    placeholder="e.g. 2014"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#636366] mb-1.5">End Year</label>
                  <input
                    className="ios-input"
                    value={form.end_year ?? ''}
                    onChange={e => setForm({ ...form, end_year: e.target.value })}
                    placeholder={form.is_current ? 'Present' : 'e.g. 2018'}
                    disabled={form.is_current}
                  />
                </div>
              </div>

              <label className="flex items-center gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.is_current}
                  onChange={e => setForm({ ...form, is_current: e.target.checked, end_year: e.target.checked ? '' : form.end_year })}
                  className="w-4 h-4 accent-[#007AFF]"
                />
                <span className="text-xs font-semibold text-[#1C1C1E]">Currently studying here</span>
              </label>

              <div>
                <label className="block text-xs font-semibold text-[#636366] mb-1.5">Description / Honors</label>
                <textarea
                  className="ios-input resize-none"
                  rows={3}
                  value={form.description ?? ''}
                  onChange={e => setForm({ ...form, description: e.target.value })}
                  placeholder="e.g. Dean's List, thesis title, academic honors…"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="submit" disabled={saving} className="ios-btn-primary disabled:opacity-60">
                  <Save className="w-4 h-4" />
                  {saving ? 'Saving…' : (editing ? 'Update' : 'Add Education')}
                </button>
                <button type="button" onClick={() => setShowForm(false)} className="ios-btn-secondary">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* List */}
      {items.length === 0 ? (
        <div className="card p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-[#F2F2F7] flex items-center justify-center mx-auto mb-4">
            <GraduationCap className="w-6 h-6 text-[#8E8E93]" />
          </div>
          <p className="font-semibold text-[#1C1C1E] mb-1">No education added yet</p>
          <p className="text-sm text-[#8E8E93] mb-4">Add your academic qualifications.</p>
          <button onClick={openNew} className="ios-btn-primary mx-auto">
            <Plus className="w-4 h-4" /> Add First Qualification
          </button>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map(edu => (
            <div key={edu.id} className="card p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[#1C1C1E]">{edu.degree}</p>
                    {edu.is_current && (
                      <span
                        className="text-[10px] font-semibold rounded-full px-2 py-0.5"
                        style={{ background: 'rgba(52,199,89,0.1)', color: '#1A7A38' }}
                      >
                        Current
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-[#007AFF] mt-0.5">{edu.field_of_study}</p>
                  <p className="text-sm text-[#636366] mt-0.5">{edu.institution}</p>
                  <p className="text-xs text-[#8E8E93] mt-0.5">
                    {edu.start_year} — {edu.is_current ? 'Present' : (edu.end_year ?? '')}
                  </p>
                  {edu.description && (
                    <p className="text-xs text-[#8E8E93] mt-1.5 line-clamp-2">{edu.description}</p>
                  )}
                </div>
                <div className="flex gap-2 flex-shrink-0">
                  <button
                    onClick={() => openEdit(edu)}
                    className="w-8 h-8 rounded-xl bg-[#F2F2F7] text-[#636366] hover:bg-[#007AFF]/10 hover:text-[#007AFF] flex items-center justify-center transition-colors"
                  >
                    <Pencil className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => handleDelete(edu.id)}
                    className="w-8 h-8 rounded-xl bg-[#F2F2F7] text-[#636366] hover:bg-red-50 hover:text-[#FF3B30] flex items-center justify-center transition-colors"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
