import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChevronRight, LogOut, Settings, Award, Clock, BookOpen, Star, Camera, Save, X, Phone, User as UserIcon, Type } from 'lucide-react';
import { db, storage } from '../firebase';
import { doc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const Profile = ({ user, setUser, onNavigate, onLogout }: any) => {
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || '',
    bio: user?.bio || '',
    mobile: user?.mobile || '',
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewURL, setPreviewURL] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || '',
        bio: user.bio || '',
        mobile: user.mobile || ''
      });
    }
  }, [user]);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setImageFile(file);
      setPreviewURL(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user?.uid) return;
    setIsSaving(true);
    try {
      let photoURL = user.photoURL;

      if (imageFile) {
        const storageRef = ref(storage, `profile_pictures/${user.uid}`);
        await uploadBytes(storageRef, imageFile);
        photoURL = await getDownloadURL(storageRef);
      }

      await updateDoc(doc(db, 'users', user.uid), {
        name: formData.name,
        bio: formData.bio,
        mobile: formData.mobile,
        ...(photoURL && { photoURL })
      });

      if (setUser) {
        setUser({ ...user, ...formData, photoURL });
      }
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to save profile");
    } finally {
      setIsSaving(false);
    }
  };

  const displayImage = previewURL || user?.photoURL || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.email || 'default'}`;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 pt-24 md:pt-32 pb-12">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex justify-between items-center mb-6 md:mb-8">
          <button onClick={() => onNavigate('home')} className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors">
            <ChevronRight className="rotate-180" size={20} /> Back to Home
          </button>
          <button onClick={onLogout} className="flex items-center gap-2 text-red-500 hover:text-red-600 font-bold transition-colors">
            <LogOut size={20} /> Logout
          </button>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-gray-900 rounded-3xl shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          <div className="h-32 md:h-40 bg-gradient-to-r from-blue-600 to-purple-600 relative">
             <button className="absolute top-4 right-4 p-2 bg-white/20 hover:bg-white/30 rounded-full text-white transition-colors backdrop-blur-sm" aria-label="Settings">
               <Settings size={20} />
             </button>
          </div>
          <div className="px-6 md:px-12 pb-8 md:pb-12 relative">
            <div className="relative w-24 h-24 md:w-32 md:h-32 -mt-12 md:-mt-16 mb-4 md:mb-6 group">
              <div className="w-full h-full bg-white dark:bg-gray-800 rounded-full border-4 md:border-8 border-white dark:border-gray-900 shadow-xl overflow-hidden flex items-center justify-center">
                 <img src={displayImage} alt="Avatar" className="w-full h-full object-cover bg-gray-100 dark:bg-gray-800" />
              </div>
              {isEditing && (
                 <button 
                  onClick={() => fileInputRef.current?.click()}
                  className="absolute inset-0 m-1 md:m-2 bg-black/50 rounded-full flex z-10 items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity"
                 >
                    <Camera size={24} />
                 </button>
              )}
              <input type="file" ref={fileInputRef} onChange={handleImageSelect} accept="image/*" className="hidden" />
            </div>
            
            <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 mb-8 md:mb-10">
              <div className="w-full md:w-auto flex-1 mr-4">
                {isEditing ? (
                  <div className="space-y-4 max-w-md w-full">
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Name</label>
                      <div className="relative mt-1">
                        <UserIcon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Bio</label>
                      <div className="relative mt-1">
                        <Type className="absolute left-3 top-3 text-gray-400" size={16} />
                        <textarea value={formData.bio} onChange={e => setFormData({...formData, bio: e.target.value})} className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]" />
                      </div>
                    </div>
                    <div>
                      <label className="text-xs font-bold text-gray-500 uppercase tracking-wide">Phone Number</label>
                      <div className="relative mt-1">
                        <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
                        <input type="tel" value={formData.mobile} onChange={e => setFormData({...formData, mobile: e.target.value})} className="w-full pl-10 pr-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg outline-none focus:ring-2 focus:ring-blue-500" />
                      </div>
                    </div>
                  </div>
                ) : (
                  <>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">{user?.name || 'Student'}</h1>
                    <p className="text-gray-500 dark:text-gray-400 text-sm md:text-base flex items-center gap-2 mb-2">
                      {user?.email || 'student@example.com'} 
                      <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full text-[10px] md:text-xs font-bold uppercase">Pro Member</span>
                    </p>
                    {user?.mobile && (
                      <p className="text-gray-600 dark:text-gray-400 text-sm flex items-center gap-2">
                        <Phone size={14}/> {user.mobile}
                      </p>
                    )}
                    {user?.bio && (
                      <p className="text-gray-700 dark:text-gray-300 mt-3 text-sm md:text-base max-w-xl leading-relaxed">
                        {user.bio}
                      </p>
                    )}
                  </>
                )}
              </div>
              <div className="flex shrink-0 gap-3">
                {isEditing ? (
                  <>
                    <button onClick={() => { setIsEditing(false); setPreviewURL(null); setImageFile(null); setFormData({ name: user?.name||'', bio: user?.bio||'', mobile: user?.mobile||''}); }} className="px-4 py-2.5 bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-xl font-bold hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors text-sm flex items-center gap-2">
                      <X size={16} /> Cancel
                    </button>
                    <button onClick={handleSave} disabled={isSaving} className="px-6 py-2.5 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-sm flex items-center gap-2 disabled:opacity-50">
                      <Save size={16} /> {isSaving ? 'Saving...' : 'Save'}
                    </button>
                  </>
                ) : (
                  <button onClick={() => setIsEditing(true)} className="px-6 py-2.5 md:px-8 md:py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/20 text-sm md:text-base">
                    Edit Profile
                  </button>
                )}
              </div>
            </div>

            {!isEditing && (
              <>
                <div className="grid sm:grid-cols-3 gap-4 md:gap-6 mb-8 md:mb-10">
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 md:p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2 md:mb-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full flex items-center justify-center">
                        <Star size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Current Streak</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">12 Days</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 md:p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2 md:mb-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400 rounded-full flex items-center justify-center">
                        <BookOpen size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Quizzes Taken</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">48</div>
                  </div>
                  <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-4 md:p-6 border border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-3 mb-2 md:mb-4">
                      <div className="w-8 h-8 md:w-10 md:h-10 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full flex items-center justify-center">
                        <Clock size={18} className="md:w-5 md:h-5" />
                      </div>
                      <div className="font-bold text-gray-900 dark:text-white text-sm md:text-base">Study Hours</div>
                    </div>
                    <div className="text-2xl md:text-3xl font-black text-gray-900 dark:text-white">124h</div>
                  </div>
                </div>

                <h3 className="text-lg md:text-xl font-bold text-gray-900 dark:text-white mb-4 md:mb-6">Recent Achievements</h3>
                <div className="space-y-3 md:space-y-4">
                  {[
                    { title: "Biology Master v1", desc: "Completed all Cell Division modules with 90%+ accuracy.", icon: Award, color: "text-amber-500", bg: "bg-amber-100 dark:bg-amber-900/20" },
                    { title: "7-Day Streak", desc: "Studied consistently for a full week. Keep it up!", icon: Star, color: "text-blue-500", bg: "bg-blue-100 dark:bg-blue-900/20" }
                  ].map((achievement, i) => (
                    <div key={i} className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                      <div className={`w-10 h-10 md:w-12 md:h-12 ${achievement.bg} ${achievement.color} rounded-full flex items-center justify-center shrink-0`}>
                        <achievement.icon size={20} className="md:w-6 md:h-6" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 dark:text-white text-sm md:text-base">{achievement.title}</h4>
                        <p className="text-xs md:text-sm text-gray-500">{achievement.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};
