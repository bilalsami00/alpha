// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import { useRouter } from "next/navigation";
// import Step1 from "@/components/onboarding/Step1";
// import Step2 from "@/components/onboarding/Step2";
// import Step3 from "@/components/onboarding/Step3";
// import ProgressBar from "@/components/onboarding/ProgressBar";
// import SideAnimation from "../authComponents/SideAnimation";
// // import toast from "react-hot-toast"; // agar chahiye ho

// type FormDataShape = {
//   howFamiliarAreYou: any;
//   mostInterestPeptide: any[];
//   gender: any;
//   age: any;
//   weight: any;
// };

// export default function OnBoardClient({
//   updateProfile,
// }: {
//   updateProfile: (data: FormDataShape) => Promise<void>;
// }) {
//   const router = useRouter();
//   const [step, setStep] = useState(1);
//   const [submitting, setSubmitting] = useState(false);

//   const [formData, setFormData] = useState<FormDataShape>({
//     howFamiliarAreYou: null,
//     mostInterestPeptide: [],
//     gender: null,
//     age: null,
//     weight: null,
//   });

//   const updateForm = (key: keyof FormDataShape, value: any) => {
//     setFormData((prev) => ({ ...prev, [key]: value }));
//   };

//   const handleBack = () => {
//     if (step > 1) setStep(step - 1);
//   };

//   const handleSubmit = async () => {
//     if (submitting) return;
//     setSubmitting(true);
//     try {
//       await updateProfile(formData); // 🔒 server action uses cookie token
//       // toast.success("Profile updated");
//       document.cookie = "onboard_gate=; Path=/; Max-Age=0; SameSite=Lax"; // delete
//       router.replace("/dashboard");
//     } catch (e: any) {
//       // toast.error(e?.message || "Something went wrong");
//       alert(e?.message || "Something went wrong");
//     } finally {
//       setSubmitting(false);
//     }
//   };

//   return (
//     <div className=" min-h-[100vh] flex flex-col  md:flex-row items-stretch gap-10 xl:gap-20 2xl:gap-32 pt-10 pl-6 xl:pl-10 pr-6 xl:pr-20 pb-10 2xl:pb-20  ">
//       {/* === Left Section === */}
//       <SideAnimation />

//       {/* Right Section */}
//       <div className=" w-full md:w-[50%] flex py-10  self-center ">
//         <div className="   bg-white  mx-auto md:mx-0 ">
//           <div className="w-full max-w-[496px] h-auto transform transition-all duration-400">
//             {step > 1 && (
//               <Image
//                 src="/onboarding/onboard-back.svg"
//                 alt="back"
//                 width={40}
//                 height={40}
//                 className="mb-6 h-10 w-10 cursor-pointer"
//                 onClick={handleBack}
//               />
//             )}

//             <ProgressBar step={step} />

//             {step === 1 && (
//               <Step1
//                 value={formData.howFamiliarAreYou}
//                 onChange={(value) => updateForm("howFamiliarAreYou", value)}
//                 onContinue={() => setStep(2)}
//               />
//             )}

//             {step === 2 && (
//               <Step2
//                 value={formData.mostInterestPeptide}
//                 onChange={(value) => updateForm("mostInterestPeptide", value)}
//                 onContinue={() => setStep(3)}
//               />
//             )}

//             {step === 3 && (
//               <Step3
//                 gender={formData.gender}
//                 age={formData.age}
//                 weight={formData.weight}
//                 onChange={(key, value) =>
//                   updateForm(key as keyof FormDataShape, value)
//                 }
//                 onContinue={handleSubmit}
//                 submitting={submitting}
//               />
//             )}

//             {/* optional: show submitting loader overlay */}
//             {/* {submitting ? (
//               <div className="mt-4 text-sm text-gray-500">Saving...</div>
//             ) : null} */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
