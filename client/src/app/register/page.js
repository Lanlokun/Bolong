"use client";

import RegisterForm from "@/components/forms/RegisterForm";
import PageContainer from "@/components/layout/PageContainer";

export default function RegisterPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Register</h1>
      <RegisterForm />
    </PageContainer>
  );
}