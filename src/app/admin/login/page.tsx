import LoginForm from "@/components/admin/LoginForm";

export const metadata = {
  title: "Administration - Hortense de Ruidiaz",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#2C2C2C] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="bg-[#333333] rounded-2xl shadow-2xl p-8 border border-[#6B6560]/20">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-[#FAF7F2] tracking-wide">
              Administration
            </h1>
            <div className="mt-2 w-12 h-0.5 bg-[#C9A96E] mx-auto" />
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
