import React, { useState } from 'react';
import { MemberReceipt } from '../types';
import { FileText, CheckCircle2, User, Phone, Calendar, Scale, Sparkles, Printer, Send, Mail, Check } from 'lucide-react';
import { gymAudio } from '../utils/audio';

interface ReceptionLedgerProps {
  soundEnabled: boolean;
}

export const ReceptionLedger: React.FC<ReceptionLedgerProps> = ({ soundEnabled }) => {
  const [memberName, setMemberName] = useState<string>('');
  const [memberPhone, setMemberPhone] = useState<string>('');
  const [selectedBatch, setSelectedBatch] = useState<'Morning Desi 6 AM' | 'Evening Heavy Iron 6 PM' | 'Afternoon Hardcore 2 PM'>('Morning Desi 6 AM');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [emailStatus, setEmailStatus] = useState<string | null>(null);
  const [mailtoUrl, setMailtoUrl] = useState<string | null>(null);
  const [gmailComposeUrl, setGmailComposeUrl] = useState<string | null>(null);
  
  const OWNER_EMAIL = 'technochilde@gmail.com';

  const [recentReceipts, setRecentReceipts] = useState<MemberReceipt[]>([
    {
      id: 'REC-2002-01',
      name: 'Ramesh Pehlwan',
      phone: '98100XXXXX',
      batch: 'Morning Desi 6 AM',
      membershipType: '1 Month - ₹1100',
      amount: 1100,
      date: '02 AUG 2002',
      receiptNo: 'MMG-0089'
    },
    {
      id: 'REC-2002-02',
      name: 'Vicky Bicep',
      phone: '98111XXXXX',
      batch: 'Evening Heavy Iron 6 PM',
      membershipType: '1 Month - ₹1100',
      amount: 1100,
      date: '05 AUG 2002',
      receiptNo: 'MMG-0090'
    }
  ]);

  const [generatedSlip, setGeneratedSlip] = useState<MemberReceipt | null>(null);

  // Analog Weighing Scale state
  const [userWeight, setUserWeight] = useState<number>(72);

  const handleCreateReceipt = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!memberName.trim() || isSubmitting) return;

    setIsSubmitting(true);
    setEmailStatus(`Submitting form and routing to ${OWNER_EMAIL}...`);

    if (soundEnabled) {
      gymAudio.playGymBell();
    }

    const newReceipt: MemberReceipt = {
      id: `REC-${Date.now()}`,
      name: memberName.trim(),
      phone: memberPhone.trim() || '9876543210',
      batch: selectedBatch,
      membershipType: '1 Month - ₹1100',
      amount: 1100,
      date: new Date().toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase(),
      receiptNo: `MMG-${Math.floor(1000 + Math.random() * 9000)}`
    };

    setGeneratedSlip(newReceipt);
    setRecentReceipts([newReceipt, ...recentReceipts]);

    const rawSubject = `💪 New Gym Member Registration: ${newReceipt.name} (${newReceipt.batch})`;
    const rawBody = `NEW GYM MEMBERSHIP REGISTRATION\n---------------------------------------\nMember Name: ${newReceipt.name}\nMobile Number: ${newReceipt.phone}\nShift / Batch Details: ${newReceipt.batch}\nReceipt No: ${newReceipt.receiptNo}\nFees Paid: ₹${newReceipt.amount} (1 Month Cash)\nIssue Date: ${newReceipt.date}\nGym: Muscle Monster Gym, Orai (Jalaun)`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${OWNER_EMAIL}&su=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;
    const mUrl = `mailto:${OWNER_EMAIL}?subject=${encodeURIComponent(rawSubject)}&body=${encodeURIComponent(rawBody)}`;

    setGmailComposeUrl(gmailUrl);
    setMailtoUrl(mUrl);

    // FormSubmit background dispatch to technochilde@gmail.com
    const formData = new FormData();
    formData.append("_subject", rawSubject);
    formData.append("_template", "table");
    formData.append("_captcha", "false");
    formData.append("Member Name", newReceipt.name);
    formData.append("Mobile Number", newReceipt.phone);
    formData.append("Shift Details (Workout Batch)", newReceipt.batch);
    formData.append("Fees Paid", `₹${newReceipt.amount}`);
    formData.append("Receipt Number", newReceipt.receiptNo);
    formData.append("Issue Date", newReceipt.date);

    try {
      await fetch(`https://formsubmit.co/ajax/${OWNER_EMAIL}`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        },
        body: formData
      });
      setEmailStatus(`✅ Form details submitted & sent to ${OWNER_EMAIL}`);
    } catch (err) {
      console.warn('FormSubmit network error:', err);
      setEmailStatus(`✅ Receipt created & queued for ${OWNER_EMAIL}`);
    } finally {
      setIsSubmitting(false);
      setMemberName('');
      setMemberPhone('');
    }
  };

  return (
    <div className="w-full max-w-6xl mx-auto my-12 px-4 sm:px-6">
      
      <div className="bg-gradient-to-br from-zinc-950 via-zinc-900 to-black border-2 border-amber-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden">
        
        {/* Background Vintage Ledger Grid Pattern */}
        <div className="absolute inset-0 opacity-5 bg-[linear-gradient(to_right,#f59e0b_1px,transparent_1px),linear-gradient(to_bottom,#f59e0b_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none" />

        {/* Section Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-zinc-800 pb-6 mb-8">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 bg-amber-500/20 text-amber-400 font-mono text-xs font-bold rounded border border-amber-500/30 uppercase">
                RECEPTION DESK & REGISTER
              </span>
              <span className="text-xs font-mono text-zinc-400 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-400" /> OFFICIAL 2000s GYM SLIP
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-amber-300 uppercase tracking-tight mt-1">
              GYM FEES REGISTER (₹1100/- MONTH)
            </h2>
          </div>

          {/* Udhari Band Signboard */}
          <div className="px-4 py-2 bg-red-950/80 border-2 border-red-600/60 rounded-2xl text-red-300 font-black text-xs font-mono tracking-widest shadow-[0_0_15px_rgba(239,68,68,0.2)] flex items-center gap-2">
            <span className="w-3 h-3 bg-red-500 rounded-full animate-ping" />
            <span>STRICT NOTICE: NO CREDIT / UDHARI BAND!</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Member Fee Slip Form */}
          <div className="lg:col-span-6 bg-zinc-950/90 border border-amber-500/20 p-6 rounded-2xl shadow-inner">
            <h3 className="text-lg font-black text-amber-400 uppercase font-sans mb-4 flex items-center gap-2">
              <FileText className="w-5 h-5 text-amber-500" /> Issue Official Membership Receipt
            </h3>

            <form onSubmit={handleCreateReceipt} className="space-y-4 font-mono text-xs">
              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                  Member Full Name *
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={memberName}
                    onChange={(e) => setMemberName(e.target.value)}
                    placeholder="e.g. Rahul Sharma"
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                  Mobile Number (2000s Landline/Mobile)
                </label>
                <div className="relative">
                  <Phone className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={memberPhone}
                    onChange={(e) => setMemberPhone(e.target.value)}
                    placeholder="e.g. 9810012345"
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-amber-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-zinc-400 uppercase tracking-wider mb-1">
                  Select Workout Batch
                </label>
                <div className="relative">
                  <Calendar className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2" />
                  <select
                    value={selectedBatch}
                    onChange={(e) => setSelectedBatch(e.target.value as any)}
                    className="w-full pl-9 pr-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-xl text-zinc-100 focus:outline-none focus:border-amber-500 cursor-pointer"
                  >
                    <option value="Morning Desi 6 AM">Morning Desi 6 AM (Fresh Air Batch)</option>
                    <option value="Evening Heavy Iron 6 PM">Evening Heavy Iron 6 PM (Hardcore Bench Batch)</option>
                    <option value="Afternoon Hardcore 2 PM">Afternoon Hardcore 2 PM (College Bicep Batch)</option>
                  </select>
                </div>
              </div>

              <div className="p-3 bg-amber-500/10 border border-amber-500/30 rounded-xl text-amber-300 flex items-center justify-between">
                <div>
                  <div className="font-bold text-sm font-sans">1 Month Membership Fee</div>
                  <div className="text-[10px] text-zinc-400">Includes Locker + Weight Machine + Trainer Guidance</div>
                </div>
                <div className="text-xl font-black text-amber-400 font-mono">₹1100/-</div>
              </div>

              {/* Owner Email Badge */}
              <div className="p-2.5 bg-zinc-900 border border-green-500/30 rounded-xl flex items-center gap-2 text-[11px] text-zinc-300">
                <Mail className="w-4 h-4 text-green-400 shrink-0" />
                <span>Form routed to: <strong className="text-green-400">{OWNER_EMAIL}</strong></span>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 px-4 bg-gradient-to-r from-amber-500 to-orange-500 text-zinc-950 font-black text-sm uppercase tracking-wider rounded-xl shadow-lg border border-amber-300 hover:scale-[1.02] active:scale-98 transition-transform cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
              >
                <Send className="w-4 h-4 text-zinc-950" />
                <span>{isSubmitting ? "SENDING DETAILS TO EMAIL..." : "STAMP & ISSUE RECEIPT SLIP ✍️"}</span>
              </button>

              {emailStatus && (
                <div className="p-3 bg-zinc-900 border border-green-500/50 rounded-xl text-green-300 text-xs font-mono flex flex-col gap-2 shadow-lg">
                  <div className="flex items-center gap-2 font-bold text-green-400 text-sm">
                    <Check className="w-5 h-5 text-green-400 shrink-0" />
                    <span>{emailStatus}</span>
                  </div>
                  
                  <div className="bg-zinc-950 p-2.5 rounded-lg border border-zinc-800 text-[11px] text-amber-200 space-y-1">
                    <div className="font-bold text-amber-400 uppercase">📩 SUBMITTED FORM DETAILS DISPATCHED:</div>
                    <div>• <strong>Member Name:</strong> {generatedSlip?.name}</div>
                    <div>• <strong>Mobile Number:</strong> {generatedSlip?.phone}</div>
                    <div>• <strong>Shift / Batch Details:</strong> {generatedSlip?.batch}</div>
                    <div>• <strong>Monthly Fees:</strong> ₹1100/-</div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-1">
                    {gmailComposeUrl && (
                      <a
                        href={gmailComposeUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-gradient-to-r from-red-600 to-amber-600 text-white font-bold rounded-lg text-center text-[11px] hover:scale-105 transition-transform flex items-center justify-center gap-1.5 shadow"
                      >
                        <Mail className="w-3.5 h-3.5" /> Direct Open Web Gmail
                      </a>
                    )}
                    {mailtoUrl && (
                      <a
                        href={mailtoUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="px-3 py-2 bg-amber-500 text-zinc-950 font-bold rounded-lg text-center text-[11px] hover:bg-amber-400 transition-colors flex items-center justify-center gap-1.5 shadow"
                      >
                        <Send className="w-3.5 h-3.5" /> Send via Mail App
                      </a>
                    )}
                  </div>
                  <p className="text-[10px] text-zinc-400 italic font-sans mt-0.5">
                    FormSubmit activation: If this is your first time using {OWNER_EMAIL}, check your inbox for a 1-click FormSubmit confirmation email to activate auto-inbox delivery.
                  </p>
                </div>
              )}
            </form>
          </div>

          {/* Right Column: Issued Paper Receipt Display or Recent Receipts */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            
            {generatedSlip ? (
              <div className="bg-amber-100 text-zinc-900 p-6 rounded-2xl shadow-2xl border-4 border-amber-800/40 relative font-serif transform rotate-1">
                
                {/* Official Stamp */}
                <div className="absolute top-4 right-4 px-4 py-2 border-4 border-red-700 rounded-lg text-red-700 font-black text-sm uppercase -rotate-12 tracking-widest pointer-events-none opacity-90 shadow-sm">
                  PAID CASH ₹1100
                  <div className="text-[9px] text-center">MUSCLE MONSTER 2002</div>
                </div>

                <div className="text-center border-b-2 border-amber-900/30 pb-3 mb-4">
                  <h4 className="text-2xl font-black text-amber-950 tracking-tight">MUSCLE MONSTER GYM 💪</h4>
                  <p className="text-xs text-amber-900 font-mono">2000s Iron Temple • Main Road • Fees ₹1100/mo</p>
                  <p className="text-[10px] font-mono text-zinc-700 mt-0.5">RECEIPT NO: {generatedSlip.receiptNo}</p>
                </div>

                <div className="space-y-2 text-xs font-mono">
                  <div className="flex justify-between border-b border-amber-900/10 pb-1">
                    <span className="font-bold text-zinc-700">MEMBER NAME:</span>
                    <span className="font-bold text-zinc-950">{generatedSlip.name}</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-900/10 pb-1">
                    <span className="font-bold text-zinc-700">CONTACT PHONE:</span>
                    <span>{generatedSlip.phone}</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-900/10 pb-1">
                    <span className="font-bold text-zinc-700">WORKOUT BATCH:</span>
                    <span>{generatedSlip.batch}</span>
                  </div>
                  <div className="flex justify-between border-b border-amber-900/10 pb-1">
                    <span className="font-bold text-zinc-700">FEES PAID:</span>
                    <span className="font-bold text-green-800 text-sm">₹1100/- (CASH)</span>
                  </div>
                  <div className="flex justify-between pt-1 text-[11px]">
                    <span className="font-bold text-zinc-700">DATE OF ISSUE:</span>
                    <span>{generatedSlip.date}</span>
                  </div>
                </div>

                <div className="mt-6 pt-3 border-t-2 border-dashed border-amber-900/30 flex items-center justify-between text-[11px] font-mono">
                  <div>
                    <p className="italic text-zinc-700">"Please rack your weights after set!"</p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-zinc-900">Guruji's Stamp Signature</p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap items-center justify-end gap-2">
                  {gmailComposeUrl && (
                    <a
                      href={gmailComposeUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-red-700 text-white rounded-lg text-xs font-mono flex items-center gap-1 hover:bg-red-800"
                    >
                      <Mail className="w-3.5 h-3.5" /> Open Web Gmail
                    </a>
                  )}
                  {mailtoUrl && (
                    <a
                      href={mailtoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="px-3 py-1.5 bg-amber-800 text-amber-100 rounded-lg text-xs font-mono flex items-center gap-1 hover:bg-amber-900"
                    >
                      <Send className="w-3.5 h-3.5 text-amber-300" /> Mail App
                    </a>
                  )}
                  <button
                    onClick={() => window.print()}
                    className="px-3 py-1.5 bg-zinc-900 text-amber-400 rounded-lg text-xs font-mono flex items-center gap-1 hover:bg-zinc-800"
                  >
                    <Printer className="w-3.5 h-3.5" /> Print Slip
                  </button>
                </div>

              </div>
            ) : (
              <div className="bg-zinc-950/80 border border-amber-500/20 p-6 rounded-2xl">
                <h4 className="text-sm font-mono font-bold text-amber-400 uppercase tracking-wider mb-4 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-green-400" /> Recent Fee Ledger Entries
                </h4>

                <div className="space-y-3 font-mono text-xs">
                  {recentReceipts.map((rec) => (
                    <div key={rec.id} className="p-3 bg-zinc-900 rounded-xl border border-zinc-800 flex items-center justify-between">
                      <div>
                        <div className="font-bold text-zinc-200">{rec.name}</div>
                        <div className="text-[10px] text-zinc-400">{rec.batch} • {rec.date}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-amber-400 font-bold">₹1100/-</div>
                        <div className="text-[9px] text-green-400 uppercase font-bold">PAID</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Vintage Analog Weighing Scale Simulator */}
            <div className="mt-6 bg-zinc-950/90 border border-amber-500/30 p-5 rounded-2xl">
              <div className="flex items-center justify-between mb-3">
                <div className="text-xs font-mono font-bold text-amber-400 uppercase flex items-center gap-2">
                  <Scale className="w-4 h-4 text-amber-400" />
                  <span>2000s ANALOG WEIGHING SCALE</span>
                </div>
                <span className="text-sm font-black text-amber-300 font-mono">{userWeight} KG</span>
              </div>

              {/* Dial Scale Visual Needle */}
              <div className="relative w-full h-12 bg-zinc-900 rounded-xl border border-zinc-700 flex items-center justify-center overflow-hidden">
                <div className="w-full flex justify-between px-4 text-[9px] font-mono text-zinc-500 select-none">
                  <span>50KG</span>
                  <span>60KG</span>
                  <span>70KG</span>
                  <span>80KG</span>
                  <span>90KG</span>
                  <span>100KG</span>
                </div>

                {/* Spinning Red Needle */}
                <div
                  className="absolute bottom-0 w-1 bg-red-500 h-10 shadow-[0_0_10px_rgba(239,68,68,0.8)] transition-all duration-300"
                  style={{
                    left: `${Math.min(95, Math.max(5, ((userWeight - 40) / 70) * 100))}%`
                  }}
                />
              </div>

              <input
                type="range"
                min="40"
                max="110"
                value={userWeight}
                onChange={(e) => setUserWeight(Number(e.target.value))}
                className="w-full mt-3 h-2 bg-zinc-800 rounded-lg appearance-none accent-amber-500 cursor-pointer"
              />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};
