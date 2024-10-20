"use client";

import { useState, useCallback } from "react";
import { useToast } from "@/hooks/use-toast";
import { SantetForm } from "@/components/santet-form";
import { SantetResult } from "@/components/santet-result";
import dynamic from "next/dynamic";

const ReactConfetti = dynamic(() => import("react-confetti"), { ssr: false });

export default function SantetOnline() {
  const [isLoading, setIsLoading] = useState(false);
  const [curseResult, setCurseResult] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const { toast } = useToast();

  const onSubmit = useCallback(
    async (values: any) => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/generate-curse", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        });
        const data = await response.json();
        if (response.ok) {
          setCurseResult(data.result);
          setShowConfetti(true);
          setTimeout(() => setShowConfetti(false), 5000);
          toast({
            title: "Santet Berhasil!",
            description: `${values.namaPenyihir} telah melancarkan santet ${
              values.jenisSantet
            } ${values.isPermanent ? "permanen" : "sementara"} pada ${
              values.namaTarget
            }.`,
          });
        } else {
          throw new Error(data.error || "Terjadi kesalahan");
        }
      } catch (error) {
        toast({
          title: "Error",
          description: "Terjadi kesalahan saat memproses santet.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    },
    [toast]
  );

  return (
    <>
      {showConfetti && <ReactConfetti />}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <SantetForm onSubmit={onSubmit} isLoading={isLoading} />
        <SantetResult result={curseResult} />
      </div>
    </>
  );
}
