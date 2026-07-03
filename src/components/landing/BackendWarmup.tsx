"use client";

import { useEffect } from "react";
import { wakeBackend } from "@/services/backendService";

export default function BackendWarmup() {
  useEffect(() => {
    wakeBackend();
  }, []);

  return null;
}