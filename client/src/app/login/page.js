"use client";

import LoginForm from "@/components/forms/LoginForm";
import PageContainer from "@/components/layout/PageContainer";

export default function LoginPage() {
  return (
    <PageContainer>
      <h1 className="text-3xl font-bold mb-6">Login</h1>
      <LoginForm />
    </PageContainer>
  );
}