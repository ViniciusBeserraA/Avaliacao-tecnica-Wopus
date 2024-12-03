"use client";

import { useToast } from "../hooks/use-toast";
import { useEffect } from "react";
import { ToastAction } from "@/components/ui/toast";

export default function AlertDialog() {
  const { toast } = useToast();

  useEffect(() => {
    toast({
      variant: "destructive",
      title: "Uh oh! Something went wrong.",
      description: "There was a problem with your request.",
      action: <ToastAction altText="Try again">Try again</ToastAction>,
    });
  }, [toast]);

  return null;
}
