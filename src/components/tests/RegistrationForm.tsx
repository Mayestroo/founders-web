'use client';

import { useState } from 'react';
import { useRouter } from 'next/router';
import { useTestContext } from '@/context/TestContext';
import { useTranslation } from '@/hooks/useTranslation';

const uzbekRegions = [
  'Andijon',
  'Bukhoro',
  'Jizzax',
  'Qashqadaryo',
  'Navoi',
  'Namangan',
  'Samarqand',
  'Sirdaryo',
  'Surxondaryo',
  'Tashkent',
  'Fergona',
  'Xorazm',
  'Karakalpakstan',
];

export default function RegistrationForm() {
  const router = useRouter();
  const { setRegistrationData } = useTestContext();
  const { t } = useTranslation();

  const [formData, setFormData] = useState({
    name: '',
    birthdate: '',
    phone: '',
    heard: '',
    problem: '',
    region: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

    const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = t('registration.name_required') || 'Full name is required';
    }

    if (!formData.birthdate) {
      newErrors.birthdate = t('registration.birthdate_required') || 'Birth date is required';
    }

    if (!formData.phone) {
      newErrors.phone = t('registration.phone_required') || 'Phone number is required';
    } else if (!/^\d{10,}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = t('registration.phone_invalid') || 'Phone number must be valid';
    }

    if (!formData.heard.trim()) {
      newErrors.heard = t('registration.heard_required') || 'Please specify where you heard about us';
    }

    if (!formData.problem.trim()) {
      newErrors.problem = t('registration.problem_required') || 'Please describe your issue with English';
    }

    if (!formData.region) {
      newErrors.region = t('registration.region_required') || 'Please select your region';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

      try {
       // Store registration data in context
       setRegistrationData({
         name: formData.name,
         birthdate: formData.birthdate,
         phone: formData.phone,
         heard: formData.heard,
         problem: formData.problem,
         region: formData.region,
       });

       // Store in localStorage as backup
       localStorage.setItem(
         'registrationData',
         JSON.stringify({
           name: formData.name,
           birthdate: formData.birthdate,
           phone: formData.phone,
           heard: formData.heard,
           problem: formData.problem,
           region: formData.region,
         })
       );

       // Navigate to results page
       router.push('/tests/results');
     } catch (error) {
       console.error('Error submitting form:', error);
       setErrors({ submit: t('registration.form_submission_error') || 'Error submitting form' });
     } finally {
       setIsSubmitting(false);
     }
  };

  return (
    <div
      className="max-w-2xl mx-auto mt-6 mb-10 px-6 pt-8 pb-6 shadow-lg rounded-2xl border border-[#EC0000] bg-white"
      style={{ boxShadow: '15px 15px 40px 0px #FF00004D' }}
    >
      <h1 className="text-2xl font-bold mb-1">{t('registration.registration_title') || 'User Registration'}</h1>
      <p className="text-sm text-red-600 mb-6">{t('registration.fill_all_fields') || 'Please fill in all fields'}</p>

      {errors.submit && <div className="mb-4 p-3 rounded bg-red-50 text-red-700 text-sm">{errors.submit}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Full Name */}
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             {t('registration.full_name') || 'Full Name'} <span className="text-red-600">*</span>
           </label>
           <input
             type="text"
             name="name"
             value={formData.name}
             onChange={handleChange}
             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
               errors.name ? 'border-red-500' : 'border-gray-300'
             }`}
             placeholder={t('registration.enter_full_name') || 'John Doe'}
           />
           {errors.name && <p className="text-red-600 text-sm mt-1">{errors.name}</p>}
         </div>

         {/* Birth Date */}
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             {t('registration.birth_date') || 'Birth Date'} <span className="text-red-600">*</span>
           </label>
           <input
             type="date"
             name="birthdate"
             value={formData.birthdate}
             onChange={handleChange}
             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
               errors.birthdate ? 'border-red-500' : 'border-gray-300'
             }`}
           />
           {errors.birthdate && <p className="text-red-600 text-sm mt-1">{errors.birthdate}</p>}
         </div>

         {/* Phone Number */}
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             {t('registration.phone_number') || 'Phone Number'} <span className="text-red-600">*</span>
           </label>
           <input
             type="tel"
             name="phone"
             value={formData.phone}
             onChange={handleChange}
             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
               errors.phone ? 'border-red-500' : 'border-gray-300'
             }`}
             placeholder={t('registration.enter_phone') || '+998 90 123 45 67'}
           />
           {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
         </div>

         {/* Where did you hear about us */}
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             {t('registration.heard_about') || 'Where did you hear about us?'} <span className="text-red-600">*</span>
           </label>
           <textarea
             name="heard"
             value={formData.heard}
             onChange={handleChange}
             rows={2}
             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none ${
               errors.heard ? 'border-red-500' : 'border-gray-300'
             }`}
             placeholder={t('registration.heard_placeholder') || 'Tell us how you found out about us...'}
           />
           {errors.heard && <p className="text-red-600 text-sm mt-1">{errors.heard}</p>}
         </div>

         {/* What is your issue with English */}
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             {t('registration.english_issue') || 'What is your main issue with English?'} <span className="text-red-600">*</span>
           </label>
           <textarea
             name="problem"
             value={formData.problem}
             onChange={handleChange}
             rows={2}
             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 resize-none ${
               errors.problem ? 'border-red-500' : 'border-gray-300'
             }`}
             placeholder={t('registration.problem_placeholder') || 'Describe what you find most challenging...'}
           />
           {errors.problem && <p className="text-red-600 text-sm mt-1">{errors.problem}</p>}
         </div>

         {/* Region */}
         <div>
           <label className="block text-sm font-medium text-gray-700 mb-1">
             {t('registration.your_region') || 'Your Region'} <span className="text-red-600">*</span>
           </label>
           <select
             name="region"
             value={formData.region}
             onChange={handleChange}
             className={`w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500 ${
               errors.region ? 'border-red-500' : 'border-gray-300'
             }`}
           >
             <option value="">{t('registration.select_region') || 'Select your region...'}</option>
             {uzbekRegions.map((region) => (
               <option key={region} value={region}>
                 {region}
               </option>
             ))}
           </select>
           {errors.region && <p className="text-red-600 text-sm mt-1">{errors.region}</p>}
         </div>

         {/* Submit Button */}
         <button
           type="submit"
           disabled={isSubmitting}
           className={`w-full h-auto bg-[#EC0000] px-6 py-3 text-white rounded-lg font-semibold transition-all ${
             isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-red-600'
           }`}
         >
            {isSubmitting ? t('results.submitting') : t('registration.submit_button') || 'Submit'}
          </button>
      </form>
    </div>
  );
}
